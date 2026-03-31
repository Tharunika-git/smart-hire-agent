"use client";

import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    setLoading(true);

    const res = await fetch(`/api/process?keyword=${keyword}`);
    const data = await res.json();

    setJobs(data.jobs || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🚀 SmartHire Agent</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />

      <button onClick={runAgent} style={{ padding: "10px 20px" }}>
        Run Agent
      </button>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}

        {jobs.map((job, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{job.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}