import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
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

  const errors = {
    firstName: !form.firstName,
    lastName: !form.lastName,
    username: !form.username,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: form.password.length < 6,
    phone: form.phone.length < 10,
    country: !form.country,
    city: !form.city,
    pan: !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan),
    aadhaar: !/^\d{12}$/.test(form.aadhaar),
  };

  const isValid = !Object.values(errors).includes(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) navigate("/details", { state: form });
  };

  const inputStyle = (err) => ({
    padding: "10px",
    border: err ? "1px solid #000" : "1px solid #ccc",
    borderRadius: "6px",
    width: "100%",
  });

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "40px auto", display: "grid", gap: 12 }}>
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>Registration Form</h2>

      <input name="firstName" placeholder="First Name" onChange={handleChange} style={inputStyle(errors.firstName)} />
      {errors.firstName && <small style={{ color: "red" }}>Required</small>}

      <input name="lastName" placeholder="Last Name" onChange={handleChange} style={inputStyle(errors.lastName)} />
      {errors.lastName && <small style={{ color: "red" }}>Required</small>}

      <input name="username" placeholder="Username" onChange={handleChange} style={inputStyle(errors.username)} />
      {errors.username && <small style={{ color: "red" }}>Required</small>}

      <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle(errors.email)} />
      {errors.email && <small style={{ color: "red" }}>Invalid Email</small>}

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle(errors.password)}
        />
        <button type="button" onClick={() => setShowPwd(!showPwd)}>
          {showPwd ? "Hide" : "Show"}
        </button>
      </div>
      {errors.password && <small style={{ color: "red" }}>Min 6 chars</small>}

      <div style={{ display: "flex", gap: 8 }}>
        <input name="countryCode" value={form.countryCode} onChange={handleChange} style={{ width: 70 }} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle(errors.phone)} />
      </div>
      {errors.phone && <small style={{ color: "red" }}>Invalid Phone</small>}

      <input name="country" placeholder="Country" onChange={handleChange} style={inputStyle(errors.country)} />
      {errors.country && <small style={{ color: "red" }}>Required</small>}

      <input name="city" placeholder="City" onChange={handleChange} style={inputStyle(errors.city)} />
      {errors.city && <small style={{ color: "red" }}>Required</small>}

      <input name="pan" placeholder="PAN" onChange={handleChange} style={inputStyle(errors.pan)} />
      {errors.pan && <small style={{ color: "red" }}>Invalid PAN</small>}

      <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} style={inputStyle(errors.aadhaar)} />
      {errors.aadhaar && <small style={{ color: "red" }}>Invalid Aadhaar</small>}

      <button disabled={!isValid} style={{ padding: 12, background: isValid ? "#2563eb" : "#999", color: "#fff" }}>
        Submit
      </button>
    </form>
  );
};

const DetailsPage = () => {
  const { state } = useLocation();
  if (!state) return <p style={{ textAlign: "center" }}>No data submitted</p>;

  const row = (label, value) => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "150px 1fr",
      padding: "8px 0",
      borderBottom: "1px solid #eee",
      columnGap: "16px"
    }}>
      <strong>{label}</strong>
      <span style={{ wordBreak: "break-word" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Submitted Details</h2>
      {row("First Name", state.firstName)}
      {row("Last Name", state.lastName)}
      {row("Username", state.username)}
      {row("Email", state.email)}
      {row("Phone", `${state.countryCode} ${state.phone}`)}
      {row("Country", state.country)}
      {row("City", state.city)}
      {row("PAN", state.pan)}
      {row("Aadhaar", state.aadhaar)}
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
