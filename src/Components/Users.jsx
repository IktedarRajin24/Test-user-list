/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import User from "./User";
import AddUser from "./AddUser";
import { PlusIcon, XMarkIcon, FunnelIcon } from "@heroicons/react/24/solid";

const Users = ({ users }) => {
  const [sortBy, setSortBy] = useState("default");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortedUsers, setSortedUsers] = useState(users);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set number of users per page

  useEffect(() => {
    const sortUsers = () => {
      if (sortBy === "firstName") {
        return users
          .slice()
          .sort((a, b) => a.firstName.localeCompare(b.firstName));
      } else if (sortBy === "lastName") {
        return users
          .slice()
          .sort((a, b) => a.lastName.localeCompare(b.lastName));
      } else if (sortBy === "dob") {
        return users
          .slice()
          .sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));
      } else {
        return users;
      }
    };
    setSortedUsers(sortUsers());
  }, [users, sortBy]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      const filteredUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(nameFilter.toLowerCase()) &&
          user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
      setSortedUsers(filteredUsers);
    }, 500);
    return () => clearTimeout(timeoutID);
  }, [users, nameFilter, emailFilter]);

  const saveUserHandler = (userData) => {
    if (editUser) {
      const updatedUsers = sortedUsers.map((user) =>
        user.id === editUser.id ? { ...editUser, ...userData } : user
      );
      setSortedUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      const newUser = {
        id: Date.now(),
        ...userData,
        birthDate: new Date(userData.birthDate).toISOString().split("T")[0],
      };
      const updatedUsers = [...sortedUsers, newUser];
      setSortedUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setAddUser(false);
    setEditUser(null);
  };

  const deleteUserHandler = (id) => {
    const updatedUsers = sortedUsers.filter((user) => user.id !== id);
    setSortedUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  return (
    <section className="h-screen w-11/12 mx-auto pt-10 grid grid-flow-row gap-1">
      <div className="w-full mx-auto text-sm text-slate-600 2xl:me-60 md:me-32 me-2 flex justify-between items-center gap-2 mt-5">
        <h1 className="text-2xl text-black font-bold">Users</h1>
        <div className="w-1/2 flex justify-between items-center gap-2">
          <div
            className="md:w-1/3 md:text-sm text-xs flex gap-1 text-blue-500 font-bold cursor-pointer"
            onClick={() => {
              setAddUser(!addUser);
              setEditUser(null);
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
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="dob">DOB</option>
            </select>
          </div>
          <button
            className="shadow-xl rounded-full px-2 py-1 md:w-1/4 w-1/3 flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="w-5" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-100 border rounded mb-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Filter by Name"
              className="shadow-md rounded-full px-2 py-1 w-full"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by Email"
              className="shadow-md rounded-full px-2 py-1 w-full"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      {addUser || editUser ? (
        <AddUser saveUserHandler={saveUserHandler} initialData={editUser} />
      ) : null}

      <table className="bg-white mb-10">
        <thead>
          <tr className="h-20 mx-5 border-b-2">
            <th className="text-left ps-5">Name</th>
            <th className="text-left">Gender</th>
            <th className="text-left">Date Of Birth</th>
            <th className="text-left">Email</th>
            <th className="text-left">Phone</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers &&
            currentUsers.map((user) => (
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

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Users;
