'use client';

import { useEffect, useRef } from 'react';
import { embedded } from '@salla.sa/embedded-sdk';

export default function Page() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    embedded.init();
    embedded.ready();

    initialized.current = true;
  }, []);

  return <div style={{ padding: 20 }}>Boltic Embedded Loaded</div>;
}