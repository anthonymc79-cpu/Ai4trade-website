'use client';
import { useState } from 'react';

export function CheckoutButton({ plan }: { plan: 'starter' | 'pro' }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting...' : 'Subscribe'}
    </button>
  );
}