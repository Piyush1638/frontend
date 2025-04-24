"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggler from "@/components/ThemeToggler";
import Logo from "@/components/Logo";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(""); // State to hold error message
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const existingEmail = localStorage.getItem("email");

    if (email === existingEmail) {
      setEmailError("This email id is already in use.");
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("auth_session", "true");
    alert("Signup successful!");
    router.push("/detection");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="absolute left-6 top-6">
        <Logo />
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <ThemeToggler />
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Clear error on input change
              }}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border ${
                emailError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
                emailError ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer inset-y-0 right-2 flex items-center text-xl"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
