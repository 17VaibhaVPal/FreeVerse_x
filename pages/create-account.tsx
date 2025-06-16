"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getGraphqlClient } from "@/clients/api";
import toast from "react-hot-toast";
import { createAccountMutation } from "@/graphql/mutations/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CreateAccountFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const CreateAccountPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      const client = getGraphqlClient();
      const res = await client.request(createAccountMutation, data);
      const token = res.createAccount;

      if (token) {
        localStorage.setItem("__twitter_token", token);
        toast.success("Account created successfully!");
        router.push("/");
      } else {
        toast.error("Failed to create account.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#15202b] px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e2732] text-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full px-4 py-2 rounded bg-[#25313f] border border-gray-600 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="mt-1 w-full px-4 py-2 rounded bg-[#25313f] border border-gray-600 focus:outline-none"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="mt-1 w-full px-4 py-2 rounded bg-[#25313f] border border-gray-600 focus:outline-none"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div className="mb-6 relative">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full px-4 py-2 pr-10 rounded bg-[#25313f] border border-gray-600 focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-[52px] text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
