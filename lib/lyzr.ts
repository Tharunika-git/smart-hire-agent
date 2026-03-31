export async function extractJobData(text: string, id: string) {
  return {
    PostID: id,
    Role: text.includes("Frontend") ? "Frontend Developer" : "Backend Developer",
    Company: text.includes("Google") ? "Google" : "Amazon",
    Location: "Bangalore",
    PrimarySkills: text.includes("React")
      ? ["React", "JavaScript"]
      : ["Python", "APIs"],
    SecondarySkills: ["Git", "Communication"],
    Experience: text.includes("0-1") ? "0-1 years" : "2+ years",
    Intern: text.includes("Intern") ? "Yes" : "No",
    Salary: "Not specified",
    HiringIntent: "High",
    DateProcessed: new Date().toISOString(),
  };
}