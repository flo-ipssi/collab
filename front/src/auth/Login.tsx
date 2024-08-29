import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  flex-col items-center bg-slate-300 h-screen justify-center  bg-cover bg-center bg-no-repeat">
      <div className="mx-4 my-20 w-full max-w-md rounded-lg bg-background p-6 shadow-lg sm:mx-0">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                readOnly={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="Password"
                value={password}
                readOnly={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Email:</label>
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //   </div>
    //   <button type="submit">Login</button>
    // </form>
  );
};
export default Login;
