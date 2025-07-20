// /app/api/judge/status/route.ts (for Next.js App Router)

import { NextRequest } from "next/server";
import axios from "axios";

const STATUS_API = "https://judge0-ce.p.rapidapi.com/submissions/batch";
const RAPIDAPI_KEY = process.env.JUDGE0_KEY;
const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokens } = body;
    
    const response = await axios.get(STATUS_API, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY || "",
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
      params: {
        tokens: tokens.join(","),
        base64_encoded: "true",
        fields: "stdout,stderr,status_id,token",
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Judge0 fetch error:", err.response?.data || err.message);
    return new Response(JSON.stringify({ error: "Failed to fetch results" }), {
      status: 500,
    });
  }
}
