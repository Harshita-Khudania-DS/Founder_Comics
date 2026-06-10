import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ If already logged in, redirect to admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    // Empty check
    if (!password.trim()) {
      setError("Please enter admin password");
      return;
    }

    // Wrong password
    if (password !== "admin123") {
      setError("Wrong password");
      return;
    }

    // ✅ Correct password
    localStorage.setItem("isAdmin", "true");
    navigate("/admin", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          Founder Comics Admin
        </h2>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // clear error while typing
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
          }}
        />

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.opacity = "0.9")
          }
          onMouseOut={(e) =>
            (e.target.style.opacity = "1")
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
