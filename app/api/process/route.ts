import { NextResponse } from "next/server";
import { getMockJobs } from "@/lib/scraper";
import { extractJobData } from "@/lib/lyzr";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    console.log("Keyword:", keyword);

    const jobs = getMockJobs();
    const results = [];

    for (const job of jobs) {
      const data = await extractJobData(job.text, job.id);
      results.push(data);
    }

    return NextResponse.json({ jobs: results });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) });
  }
}