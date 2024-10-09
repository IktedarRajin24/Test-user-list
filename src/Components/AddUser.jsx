/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddUser = ({ saveUserHandler, initialData }) => {
  const {
    register,
    handleSubmit,
    setValue, // For setting form values in edit mode
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      email: "",
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setValue("firstName", initialData.firstName);
      setValue("lastName", initialData.lastName);
      setValue("gender", initialData.gender);
      setValue("dob", initialData.dob);
      setValue("phone", initialData.phone);
      setValue("email", initialData.email);
    } else {
      reset(); // Clear the form for adding a new user
    }
  }, [initialData, setValue, reset]);

  const onSubmit = (data) => {
    saveUserHandler(data);
    reset(); // Reset form after submit
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start md:w-1/2 w-11/12 mx-auto px-5 py-8 shadow-lg hover:shadow-2xl rounded transition-all duration-500 ease-in-out my-5"
    >
      <h1 className="text-xl font-bold">
        {initialData ? "Update user" : "Add user"}
      </h1>
      <input
        {...register("firstName", {
          required: true,
          minLength: 2,
          maxLength: 50,
        })}
        placeholder="First Name"
        className=" my-3 rounded px-2 py-1 w-10/12"
      />
      {errors.firstName && <p>First name is required (2-50 characters)</p>}

      <input
        {...register("lastName", {
          required: true,
          minLength: 2,
          maxLength: 50,
        })}
        placeholder="Last Name"
        className=" my-3 rounded px-2 py-1 w-10/12"
      />
      {errors.lastName && <p>Last name is required (2-50 characters)</p>}

      <select
        {...register("gender", { required: true })}
        className=" my-3 rounded px-2 py-1 w-10/12"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>Gender is required</p>}

      <input
        type="date"
        {...register("dob", {
          required: true,
          validate: (value) => {
            const age =
              new Date().getFullYear() - new Date(value).getFullYear();
            return age >= 0 && age <= 100;
          },
        })}
        placeholder="Date of Birth"
        className=" my-3 rounded px-2 py-1 w-10/12"
      />
      {errors.dob && <p>Invalid Date of Birth (max 100 years old)</p>}

      <input
        {...register("phone", {
          required: true,
          pattern: /^[0-9]{10,15}$/,
        })}
        placeholder="Phone"
        className=" my-3 rounded px-2 py-1 w-10/12"
      />
      {errors.phone && <p>Phone must be a valid number (10-15 digits)</p>}

      <input
        {...register("email", {
          required: true,
          pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
        })}
        placeholder="Email"
        className=" my-3 rounded px-2 py-1 w-10/12"
      />
      {errors.email && <p>Invalid email address</p>}

      <button
        type="submit"
        className="w-1/2 my-3 rounded px-2 py-1 bg-green-500 hover:bg-green-700 hover:text-white"
      >
        {initialData ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default AddUser;
