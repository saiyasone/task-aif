// src/components/Login.tsx
import httpClient from "@/lib/httpClient";
import { createRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { rootRoute } from "./route";
import { setSession } from "@/hook/useSession";
import type { BaseResponse } from "@/types";

const Login: React.FC = () => {
  const [username, setUsername] = useState("alice");
  const [password, setPassword] = useState("1234");
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await httpClient.post<BaseResponse>(
        "/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSession(response.data.data);
      setToken(response.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getMine = async () => {
    try {
      const response = await httpClient.get<BaseResponse>("/me", {});

      console.log({ user: response.data });
    } catch (error) {}
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Usernames
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {token && (
          <div className="mt-6 text-center">
            <button
              className="p-2 cursor-pointer bg-purple-600 text-white rounded-lg w-full"
              onClick={getMine}
            >
              Get User Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: Login,
});
