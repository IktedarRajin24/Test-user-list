/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const User = ({ user }) => {
  const { id, image, firstName, lastName, email, gender, birthDate, phone } =
    user;
  return (
    <tr className=" p-5 shadow-lg hover:shadow-2xl hover:bg-slate-50 rounded-xl transition-all duration-500 ease-in-out">
      <td className="flex items-center gap-1">
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
    </tr>
  );
};

export default User;
