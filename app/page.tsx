"use client";

import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/process?keyword=${keyword}`);
      const data = await res.json();

      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* HEADER */}
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          🚀 SmartHire Agent
        </h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          AI-powered job intelligence system
        </p>

        {/* INPUT */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter job keyword (e.g. frontend)"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={runAgent}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Running..." : "Run Agent"}
          </button>
        </div>

        {/* 🔥 STATS BAR */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={cardStat}>
            📊 Total Jobs: <strong>{jobs.length}</strong>
          </div>

          <div style={cardStat}>
            🔍 Keyword: <strong>{keyword || "None"}</strong>
          </div>

          <div style={cardStat}>
            ⚡ Status: <strong>{loading ? "Running" : "Idle"}</strong>
          </div>
        </div>

        {/* 🔥 SECTION TITLE */}
        <h2 style={{ marginBottom: "15px" }}>📌 Job Results</h2>

        {/* JOB GRID */}
        {jobs.length === 0 ? (
          <p style={{ color: "#777" }}>
            🚀 No jobs yet. Try searching "frontend" or "backend"
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {jobs.map((job, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                }}
              >
                <h3>{job.Role}</h3>

                <p>🆔 Post ID: {job.PostID}</p>
                <p>🏢 Company: {job.Company}</p>
                <p>📍 Location: {job.Location}</p>
                <p>
                  🛠 Skills: {job.PrimarySkills?.join(", ") || "N/A"}
                </p>
                <p>
                  ➕ Secondary: {job.SecondarySkills?.join(", ") || "N/A"}
                </p>
                <p>📅 Experience: {job.Experience}</p>
                <p>🎓 Intern: {job.Intern}</p>
                <p>🔥 Hiring: {job.HiringIntent}</p>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 FOOTER */}
        <div style={{ marginTop: "50px", color: "#888" }}>
          Built with ❤️ using Lyzr
        </div>
      </div>
    </div>
  );
}

/* 🔥 STATS STYLE */
const cardStat = {
  background: "#fff",
  padding: "12px 18px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};