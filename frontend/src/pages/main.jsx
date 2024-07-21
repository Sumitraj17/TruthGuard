import { FaFileUpload, FaGoogleDrive } from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";

const Home = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("text", input);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/model",
        {text:input}
        
      );
      setOutput(response.data);
      setInput('')
    } catch (err) {
      console.error("Error submitting the form", err);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className="text-white flex justify-evenly items-center h-screen">
        <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
          <form className="w-full h-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <textarea
              name="input"
              className="w-full h-full p-2 text-gray-600 text-xl"
              placeholder="Enter Fact..."
              onChange={handleChange}
              value={input}
            ></textarea>
            <div className="flex justify-between bg-white w-full p-3">
              <div className="flex flex-col w-full">
                <button
                  type="button"
                  className="font-bold p-2 flex items-center"
                  disabled
                >
                  <FaGoogleDrive className="mr-2" />
                  <span>Upload from Drive</span>
                </button>
                <button
                  type="button"
                  className="font-bold p-2 flex items-center"
                  onClick={handleFileUploadClick}
                >
                  <FaFileUpload className="mr-2" />
                  <span>Upload from Computer</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white p-1 pl-4 pr-4 text-xl font-bold rounded-2xl shadow-lg"
              >
                Appraise
              </button>
            </div>
          </form>
        </div>
        <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
          <div className="w-full h-full p-2 text-gray-600 text-xl overflow-auto">
            {output ? (
              <>
                <p><strong>Prediction:</strong> {output.prediction}</p>
                <p><strong>Confidence:</strong> {output.confidence}</p>
                <p><strong>Explanation:</strong> {output.explanation}</p>
              </>
            ) : (
              <p>No output to display</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
