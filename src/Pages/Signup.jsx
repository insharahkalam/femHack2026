import { useState } from "react";
import client from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please sab fields fill karein",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords match nahi kar rahe",
      });
      return;
    }

    setLoading(true);

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
      return;
    }

    // 🔥 AUTH SE USER MIL GAYA
    const user = data.user;

    // 🔥 AB TABLE ME DATA INSERT KARO
    const { error: tableError } = await client
      .from("profile-data")
      .insert([
        {
          user_id: user.id,
          full_name: name,
          email: email,
        },
      ]);

    setLoading(false);

    if (tableError) {
      Swal.fire({
        icon: "error",
        title: "Database Error",
        text: tableError.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Account Created 🎉",
      text: "Please login to continue",
      timer: 1600,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/"), 1600);


    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Account Created 🎉",
        text: "Please login to continue",
        timer: 1600,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/"), 1600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-semibold text-center text-blue-600">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          Signup to start building your resume
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60 text-sm"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="text-center mt-4 text-xs text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
