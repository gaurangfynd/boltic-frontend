'use client';

import { useEffect, useMemo, useState } from 'react';
import { initSallaEmbedded, getSallaEmbedded } from './src/lib/sallaEmbedded';

function readParams() {
  if (typeof window === 'undefined') return {};
  const sp = new URL(window.location.href).searchParams;

  return {
    mode: sp.get('mode'),
    locale: sp.get('locale'),
    token: sp.get('token'),
    app_id: sp.get('app_id'),
    dark: sp.get('dark'),
    theme: sp.get('theme'),
  };
}

export default function Home() {
  const [sdkFound, setSdkFound] = useState(false);

  const params = useMemo(() => readParams(), []);

  useEffect(() => {
    initSallaEmbedded();

    const sdk = getSallaEmbedded();
    setSdkFound(!!sdk);

    // Optional examples (only if these methods exist in your SDK build)
    try {
      sdk?.page?.setTitle?.('Boltic Embedded (Next.js)');
      sdk?.ui?.toast?.success?.('Embedded loaded');
    } catch { }
  }, []);

  return (
    <main style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Salla Embedded App (Next.js)</h1>

      <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 10 }}>
        <div>
          SDK detected: <b>{sdkFound ? 'Yes' : 'No'}</b>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
          If “No”, it still can be fine—your page can run without calling SDK methods.
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 10 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Params from Salla iframe URL</h2>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
     
        </pre>
      </div>
    </main>
  );
}