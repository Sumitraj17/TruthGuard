import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { Context } from "../context/context.jsx";
import { truncateText,formatDateToWordFormat,formatTimeTo12Hour } from "../helper/formatter.js";


const Dashboard = () => {
  const [User, setUser] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const resp = await axios.post("http://localhost:8080/api/v1/auth/details", {
          id: user, // Correct way to pass query parameters
        });
        console.log(resp.data.data);
        setUser(resp.data.data); // Update the state with the response data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    console.log(user);
    fetchUserDetails(); // Call the async function
  }, [user]); // Dependency array

  if (!User) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex flex-col items-center">
        <img
          src={`http://localhost:8080${User.image}`}

          className="w-32 h-32 rounded-full shadow-lg mb-4"
        />
        <h1 className="text-2xl font-semibold">{User.fname} {User.lname}</h1>
        <p className="text-sm text-gray-400">{User.email}</p>
        {/* <p className="text-sm text-gray-400">{user.phone}</p> */}
      </div>

      <div className="mt-8">
        <h2 className="text-xl text-center  font-bold mb-8">History of Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-medium font-bold">SL No.</th>
                <th className="px-4 py-3 text-left font-medium font-bold">Fact-Checked</th>
                <th className="px-4 py-3 text-left font-medium font-bold">Result</th>
                <th className="px-4 py-3 text-left font-medium font-bold">Date</th>
                <th className="px-4 py-3 text-left font-medium font-bold">Time</th>
              </tr>
            </thead>
            <tbody>
              {User.history.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-4 py-3 text-left">{index + 1}</td>
                  <td className="px-4 py-3 text-left">
                    {truncateText(item.fact, 30)} {/* Truncate the fact to 30 characters */}
                  </td>
                  <td className={`px-4 py-3 text-left ${item.result === "True" ? "text-green-500" : "text-red-500"}`}>
                    {item.result}
                  </td>
                  <td className="px-4 py-3 text-left">{formatDateToWordFormat(item.date)}</td>
                  <td className="px-4 py-3 text-left">{formatTimeTo12Hour(item.time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
