import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [predict, setPredict] = useState("");
  const [formdata, setFormData] = useState({ text: "" }); // Correct initialization of formdata state
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formdata, [name]: value }); // Update formdata state as user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const resp = await axios.post("http://127.0.0.1:5000/api/model", {
        text: formdata.text,
      });
      setPredict(resp.data); // Assuming resp.data contains the predicted value
      setFormData({ text: "" }); // Reset input field after successful submission
    } catch (err) {
      console.error("Error occurred:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          className="flex flex-col justify-center items-center w-1/2 bg-gray-100 shadow-md rounded-xl "
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-2xl m-3">Enter the Fact</h1>
          <input
            type="text"
            name="text"
            value={formdata.text} // Bind input value to formdata.text
            onChange={handleChange} // Handle input change
            placeholder="Enter the Fact"
            className="p-2 m-5 text-black bg-gray-150 border shadow-md rounded-xl w-3/4 text-center"
          />
          <button
            type="submit"
            className="p-3 m-3 flex justify-center items-center bg-blue-200 text-black  text-md rounded-full hover:font-bold hover:bg-blue-100 w-3/4"
            disabled={submitting}
          >
            {submitting ? "Checking..." : "Check"}
          </button>
        </form>

        {predict !== "" && (
          <div className="flex justify-center mt-4">
            <div className="p-3 m-5 bg-gray-200 text-black rounded-md shadow-md">
              Predicted Result: {predict}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
