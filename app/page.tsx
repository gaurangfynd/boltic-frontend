'use client';

import { useEffect, useRef, useState } from "react";
import { embedded } from "@salla.sa/embedded-sdk";

export default function Page() {
  const initialized = useRef(false);

  const [form, setForm] = useState({
    storeName: "",
    userName: "",
    email: ""
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function init() {
      try {
        await embedded.init({ debug: true });
        embedded.page.setTitle("Store Registration");
        embedded.ready();
      } catch (err) {
        console.error(err);
      }
    }

    init();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("Saving...");

    try {
      const res = await fetch("/api/register-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("Saved Successfully ✅");
      embedded.ui.toast.success("Saved successfully");
    } catch (err) {
      setStatus("Error saving data");
      embedded.ui.toast.error("Save failed");
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Store Information</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        
        <div style={{ marginBottom: 16 }}>
          <label>Store Name</label>
          <input
            type="text"
            required
            value={form.storeName}
            onChange={(e) =>
              setForm({ ...form, storeName: e.target.value })
            }
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>User Name</label>
          <input
            type="text"
            required
            value={form.userName}
            onChange={(e) =>
              setForm({ ...form, userName: e.target.value })
            }
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Save
        </button>

        {status && <p style={{ marginTop: 10 }}>{status}</p>}
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer"
};