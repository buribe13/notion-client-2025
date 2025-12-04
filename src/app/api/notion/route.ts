import { NextResponse } from "next/server";
import { fetchProjectsFromNotion } from "@/lib/notion";

export async function GET() {
  try {
    const projects = await fetchProjectsFromNotion();
    const source =
      process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID
        ? "notion"
        : "mock";

    return NextResponse.json({ source, projects });
  } catch (error) {
    console.error("[notion] failed to fetch projects", error);
    return NextResponse.json(
      { source: "mock", projects: [], error: "Unable to fetch Notion data" },
      { status: 500 }
    );
  }
}

