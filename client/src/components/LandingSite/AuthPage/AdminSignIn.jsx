import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

export default function AdminSignIn() {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [pass, setPass] = useState("");

  const getHostel = async () => {
    let admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) return;

    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: admin._id }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hostel", JSON.stringify(data.hostel));
      }
    } catch (err) {
      console.error("Error fetching hostel data:", err);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: pass,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(result.errors?.[0]?.msg || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setLoader(false);
        return;
      }

      localStorage.setItem("token", result.data.token);

      // Fetch Admin Details
      const adminResponse = await fetch("http://localhost:3000/api/admin/get-admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result.data.token}`,
        },
      });

      const adminResult = await adminResponse.json();

      if (!adminResult.success) {
        toast.error(adminResult.errors?.[0]?.msg || "Admin fetch failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setLoader(false);
        return;
      }

      localStorage.setItem("admin", JSON.stringify(adminResult.admin));
      await getHostel();
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error. Try again!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
    setLoader(false);
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account - Manager
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={{ name: "email", type: "email", placeholder: "abc@email.com", req: true, value: inputEmail, onChange: (e) => setInputEmail(e.target.value) }} />
          <Input field={{ name: "password", type: "password", placeholder: "••••••••", req: true, value: pass, onChange: (e) => setPass(e.target.value) }} />
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
            {loader ? <><Loader /> Verifying...</> : <span>Sign in</span>}
          </button>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          <p className="text-sm font-light text-gray-400">
            You&apos;re a student?{" "}
            <Link to="/auth/login" className="font-medium hover:underline text-blue-500">
              Sign in Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
