/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import User from "./User";
import AddUser from "./AddUser";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Users = ({ users }) => {
  const [sortBy, setSortBy] = useState("default");
  const [query, setQuery] = useState("");
  const [sortedUsers, setSortedUsers] = useState(users);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(null); // State to track the user being edited

  useEffect(() => {
    const sortUsers = () => {
      if (sortBy === "name") {
        return users
          .slice()
          .sort((a, b) => a.firstName.localeCompare(b.firstName));
      } else if (sortBy === "email") {
        return users
          .slice()
          .sort((a, b) =>
            a.email.toLowerCase().localeCompare(b.email.toLowerCase())
          );
      } else {
        return users;
      }
    };
    setSortedUsers(sortUsers());
  }, [users, sortBy]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase())
      );
      setSortedUsers(filteredUsers);
    }, 500);
    return () => clearTimeout(timeoutID);
  }, [users, query]);

  // Function to handle adding or updating users
  const saveUserHandler = (userData) => {
    if (editUser) {
      // Update user
      const updatedUsers = sortedUsers.map((user) =>
        user.id === editUser.id ? { ...editUser, ...userData } : user
      );
      setSortedUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      // Add new user
      const newUser = { id: Date.now(), ...userData };
      const updatedUsers = [...sortedUsers, newUser];
      setSortedUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setAddUser(false);
    setEditUser(null); // Reset edit state
  };

  // Function to delete a user
  const deleteUserHandler = (id) => {
    const updatedUsers = sortedUsers.filter((user) => user.id !== id);
    setSortedUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <section className="h-full w-11/12 mx-auto pt-10 grid grid-flow-row gap-1">
      <div className=" lg:w-1/3 md:w-1/2 w-full mx-auto px-2 text-sm text-slate-600 2xl:me-60 md:me-32 me-2 flex justify-between items-center gap-2 mt-5">
        <div
          className="md:w-1/3 md:text-sm text-xs flex gap-1 text-blue-500 font-bold cursor-pointer"
          onClick={() => {
            setAddUser(!addUser);
            setEditUser(null); // Reset the edit user when clicking Add User
          }}
        >
          {addUser ? (
            <XMarkIcon className="w-5" />
          ) : (
            <PlusIcon className="w-5" />
          )}
          {addUser ? "Close" : "Add User"}
        </div>
        <div className="md:w-1/2 w-1/3">
          Sort by
          <select
            className="md:w-1/2 w-1/2 rounded-full shadow-md px-2 py-1 ms-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="email">E-mail</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="shadow-xl rounded-full px-2 py-1 md:w-2/4 w-1/3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {addUser || editUser ? (
        <AddUser
          saveUserHandler={saveUserHandler}
          initialData={editUser} // Pass the data of the user being edited
        />
      ) : null}

      <table className="ps-5 bg-white">
        <thead>
          <tr className="h-20 mx-5 border-b-2">
            <th className="text-left">Name</th>
            <th className="text-left">Gender</th>
            <th className="text-left">Date Of Birth</th>
            <th className="text-left">Email</th>
            <th className="text-left">Phone</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers &&
            sortedUsers.map((user) => (
              <User
                key={user.id}
                user={user}
                onSetEditUser={setEditUser}
                onSetAddUser={setAddUser}
                onDelete={deleteUserHandler}
              />
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
