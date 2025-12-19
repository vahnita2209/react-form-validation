import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "pan" ? value.toUpperCase() : value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan);
  const aadhaarValid = /^\d{12}$/.test(form.aadhaar);

  const showError = (field) => touched[field] || submitted;

  const isValid =
    form.firstName &&
    form.lastName &&
    form.username &&
    emailValid &&
    form.password.length >= 6 &&
    form.phone.length >= 10 &&
    form.country &&
    form.city &&
    panValid &&
    aadhaarValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isValid) navigate("/details", { state: form });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "6px",
  };

  const error = (condition, message) =>
    condition && <small style={{ color: "red" }}>{message}</small>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 450,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        display: "grid",
        gap: 12,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Registration Form</h2>

      <input name="firstName" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("firstName") && !form.firstName, "Required")}

      <input name="lastName" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("lastName") && !form.lastName, "Required")}

      <input name="username" placeholder="Username" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("username") && !form.username, "Required")}

      <input name="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("email") && !form.email, "Required")}
      {error(showError("email") && form.email && !emailValid, "Invalid Email")}

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          style={inputStyle}
        />
        <button type="button" onClick={() => setShowPwd(!showPwd)}>
          {showPwd ? "Hide" : "Show"}
        </button>
      </div>
      {error(showError("password") && !form.password, "Required")}
      {error(showError("password") && form.password && form.password.length < 6, "Minimum 6 characters")}

      <div style={{ display: "flex", gap: 8 }}>
        <input value="+91" readOnly style={{ ...inputStyle, width: 70 }} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      </div>
      {error(showError("phone") && !form.phone, "Required")}
      {error(showError("phone") && form.phone && form.phone.length < 10, "Invalid Phone Number")}

      <input name="country" placeholder="Country" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("country") && !form.country, "Required")}

      <input name="city" placeholder="City" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("city") && !form.city, "Required")}

      <input name="pan" placeholder="PAN" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("pan") && !form.pan, "Required")}
      {error(showError("pan") && form.pan && !panValid, "Invalid PAN")}

      <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} onBlur={handleBlur} style={inputStyle} />
      {error(showError("aadhaar") && !form.aadhaar, "Required")}
      {error(showError("aadhaar") && form.aadhaar && !aadhaarValid, "Invalid Aadhaar")}

      <button
        type="submit"
        style={{
          marginTop: 10,
          padding: 12,
          width: "100%",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

const DetailsPage = () => {
  const { state } = useLocation();
  if (!state) return <p>No data submitted</p>;

  const row = (l, v) => (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "6px 0" }}>
      <strong>{l}</strong>
      <span>{v}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>Submitted Details</h2>
      {row("First Name:", state.firstName)}
      {row("Last Name:", state.lastName)}
      {row("Username:", state.username)}
      {row("Email:", state.email)}
      {row("Phone:", `${state.countryCode} ${state.phone}`)}
      {row("Country:", state.country)}
      {row("City:", state.city)}
      {row("PAN:", state.pan)}
      {row("Aadhaar:", state.aadhaar)}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
