import { searchBrazilianProgrammingVideos } from "@/lib/youtube-api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const videos = await searchBrazilianProgrammingVideos();
    return NextResponse.json(videos);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
