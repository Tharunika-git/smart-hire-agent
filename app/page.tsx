"use client";

import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/process?keyword=${keyword}`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🚀 SmartHire Agent</h1>

      <div style={{ marginTop: 20 }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="frontend / backend"
          style={{ padding: 10, width: 250 }}
        />

        <button
          onClick={runAgent}
          style={{ padding: "10px 20px", marginLeft: 10 }}
        >
          Run Agent
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {loading && <p>Loading...</p>}

        {jobs.map((job, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{job.title}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}