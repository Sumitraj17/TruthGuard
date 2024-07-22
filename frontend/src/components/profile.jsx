import { Link } from 'react-router-dom';
import React from 'react';

const Profile = (props) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 m-4 rounded-lg w-80 ">
      <img src={props.img} alt="Profile" className="w-1/3 h-24 rounded-full  mb-4" />
      <span className="text-xl font-semibold mb-2">{props.name}</span>
      <div className="text-center mb-4">{props.desc}</div>
      <Link to={props.link} className="text-blue-400 hover:underline">
        Know More
      </Link>
    </div>
  );
};

export default Profile;
