'use client';

import { useEffect, useRef } from "react";
import { embedded } from "@salla.sa/embedded-sdk";

export default function Page() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function bootstrapApp() {
      try {
        // 1️⃣ Initialize SDK
        const { layout } = await embedded.init({ debug: true });

        // 2️⃣ Get token
        const token = embedded.auth.getToken();
        if (!token) throw new Error("Unauthorized");

        console.log("Embedded token:", token);

        // TODO: send token to your backend for verification

        // 3️⃣ Tell Salla we're ready
        embedded.ready();

        // 4️⃣ Set native title
        embedded.page.setTitle("My App Dashboard");

      } catch (err) {
        console.error("SDK initialization failed", err);
        embedded.destroy();
      }
    }

    bootstrapApp();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Boltic Embedded App</h1>
      <p>If you see this, your iframe is rendering correctly.</p>
    </div>
  );
}