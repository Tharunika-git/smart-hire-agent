"use client";

import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAgent = async () => {
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const res = await fetch(`/api/process?keyword=${keyword}`);
      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!data.jobs || data.jobs.length === 0) {
        // fallback data (for demo safety)
        setJobs([
          { title: "Frontend Developer - React" },
          { title: "Backend Developer - Node.js" },
          { title: "Full Stack Engineer" },
        ]);
      } else {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");

      // fallback demo data
      setJobs([
        { title: "Demo Job 1" },
        { title: "Demo Job 2" },
      ]);
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>🚀 SmartHire Agent</h1>
      <p style={{ color: "#666" }}>
        AI-powered job intelligence system
      </p>

      {/* INPUT */}
      <div style={{ marginTop: "20px" }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="frontend / backend"
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={runAgent}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Run Agent
        </button>
      </div>

      {/* STATUS */}
      <div style={{ marginTop: "20px" }}>
        {loading && <p>⏳ Running agent...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* RESULTS */}
      <div style={{ marginTop: "30px" }}>
        <h2>📌 Job Results</h2>

        {jobs.length === 0 && !loading && (
          <p>No jobs yet. Try searching.</p>
        )}

        {jobs.map((job, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <strong>{job.title}</strong>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "50px", color: "#888" }}>
        Built with ❤️ using Lyzr
      </div>
    </main>
  );
}