import { FaFileUpload, FaGoogleDrive } from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";
import { Comment, Hourglass } from "react-loader-spinner";

const Home = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/model", {
        text: input,
      });
      setOutput(response.data);
      setInput("");
      setLoader(false);
    } catch (err) {
      console.error("Error submitting the form", err);
    }
  };
  //"flex justify-between bg-black rounded-2xl"
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className="text-white flex justify-evenly items-center h-screen">
        <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
          <form
            className="w-full h-full flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
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

              <div
                className={
                  loader
                    ? "flex text-gray-600 disabled justify-between bg-black rounded-2xl"
                    : "flex justify-between bg-black  text-white rounded-2xl"
                }
              >
                <button
                  type="submit"
                  className=" p-1 pl-4 pr-4 text-xl font-bold rounded-2xl shadow-lg"
                >
                  Appraise
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="h-3/4 w-2/5 bg-gray-300 text-center text-black flex items-center justify-center">
          <div
            className={
              output
                ? "w-full h-full p-2 text-black bg-white text-xl overflow-auto"
                : "w-full h-full p-2 text-gray-600 text-xl overflow-auto"
            }
          >
            {output ? (
              <>
                <p>
                  <strong>Prediction:</strong> {output.prediction}
                </p>
                <p>
                  <strong>Confidence:</strong> {output.confidence}
                </p>
                <p>
                  <strong>Explanation:</strong> {output.explanation}
                </p>
                <p>
                  <strong>Source:</strong> {output.source}
                </p>
              </>
            ) : loader ? (
              <>
                <div className="flex items-center justify-center h-full">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />
                </div>
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
//<Hourglass
// visible={true}
// height="80"
// width="80"
// ariaLabel="hourglass-loading"
// wrapperStyle={{}}
// wrapperClass=""
// colors={['#306cce', '#72a1ed']}
// />
