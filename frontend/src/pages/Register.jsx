import { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.message === "User already exists") {
        alert("User already exists. Please login.");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-4 mx-auto shadow">
        <h3 className="mb-3">Register</h3>

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;