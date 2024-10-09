/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const User = ({ user, onSetAddUser, onSetEditUser, onDelete }) => {
  const { id, firstName, lastName, email, gender, birthDate, phone } = user;
  return (
    <tr className="hover:bg-slate-100 border-b-2 transition-all duration-500 ease-in-out">
      <td className="text-left font-semibold ps-5 py-3">
        {firstName + " " + lastName}
      </td>
      <td className="text-left">{gender}</td>

      <td className="text-left">{birthDate}</td>
      <td className="text-left">{email}</td>
      <td className="text-left">{phone}</td>
      <td>
        <button
          className="text-blue-500"
          onClick={() => {
            onSetEditUser(user);
            onSetAddUser(true);
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
