/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const User = ({ user, onSetAddUser, onSetEditUser, onDelete }) => {
  const { id, image, firstName, lastName, email, gender, birthDate, phone } =
    user;
  return (
    <tr className=" p-5 hover:bg-slate-100 border-b-2 transition-all duration-500 ease-in-out">
      <td className="flex items-center gap-2">
        <img className="w-10" src={image} alt={`user-${id}`} />
        <p className="text-left font-bold hover:underline hover:text-red-500 hover:cursor-pointer">
          {" "}
          {firstName + " " + lastName}
        </p>
      </td>
      <td className="text-left">{gender}</td>

      <td className="text-left">{birthDate}</td>
      <td className="text-left">{email}</td>
      <td className="text-left">{phone}</td>
      <td>
        <button
          className="text-blue-500"
          onClick={() => {
            onSetEditUser(user); // Set the user to be edited
            onSetAddUser(true); // Open the AddUser form
          }}
        >
          Edit
        </button>
        <button className="text-red-500 ml-4" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
