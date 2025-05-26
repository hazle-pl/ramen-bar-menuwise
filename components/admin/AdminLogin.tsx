import { useState } from "react";

const AdminLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("admin-session", "true");
      onSuccess();
    } else {
      setError("Nieprawidłowy PIN");
    }
  };

  return (
    <div className="admin-login">
      <h2>Podaj PIN</h2>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Wpisz PIN"
      />
      <button onClick={handleLogin}>Zaloguj</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;
