import { useState } from "react";
import { z, ZodError } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(4, { message: "Please enter a password with at least 4 digits" }),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      SignupSchema.parse({ email, password });

      if (!termsAccepted) {
        setValidationErrors({
          checkbox: "Please accept the Terms and Conditions",
        });
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setValidationErrors({
          confirmPassword: "Password does not match",
        });
        setLoading(false);
        return;
      }

      const response = await axios.post("http://127.0.0.1:3001/signup", {
        email,
        password,
      });
      console.log(response);

      await navigate("/posts");
      toast.success(`welcome ${email}`);

      setValidationErrors({});
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
      setLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      } else if (error.response) {
        setSignupError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        setSignupError(
          "No response received from the server. Please try again later."
        );
      } else {
        setSignupError("Something went wrong. Please try again later.");
      }

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex md:justify-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <form className="self-center bg-transparent p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-center">
          Create an account
        </h2>
        <div className="grid gap-4 md:mt-8 mt-4">
          <div className="grid grid-cols-1 items-center gap-2 md:gap-4">
            <label
              htmlFor="email"
              className="text-gray-600 text-sm md:text-lg"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`md:p-3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                validationErrors.email && "border-red-500"
              }`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="relative grid grid-cols-1 items-center gap-2 md:gap-4">
            <label
              htmlFor="password"
              className="text-gray-600 text-sm md:text-lg"
            >
              Password:
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`md:p-3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                validationErrors.password && "border-red-500"
              }`}
              required
            />
               <button
                type="button"
                className="absolute right-3 top-5 text-sm"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            {validationErrors.password && (
              <p className="text-red-500 text-xs">
                {validationErrors.password}
              </p>
            )}
          </div>
          <div className="relative grid grid-cols-1 items-center gap-2 md:gap-4">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 text-sm md:text-lg"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="md:p-3 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
               <button
                type="button"
                className="absolute right-3 top-5 text-sm"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <span className="text-sm">Accept all Terms and Conditions</span>
          </div>
          {validationErrors.checkbox && (
            <p className="text-red-500 text-xs">{validationErrors.checkbox}</p>
          )}
        </div>
        <button
          onClick={handleSignup}
          className="text-white bg-blue-400 py-3 w-full mt-6"
        >
          Create an account
        </button>
      </form>
    </div>
  );
};

export default Signup;
