import { NextRequest } from "next/server";
import axios from "axios";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions/batch";
const RAPIDAPI_KEY = process.env.JUDGE0_KEY;
const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

const toBase64 = (str: string) => Buffer.from(str).toString("base64");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { submissions } = body;

    submissions = submissions.map((s: any) => ({
      ...s,
      source_code: toBase64(s.source_code),
      stdin: s.stdin ? toBase64(s.stdin) : null,
      expected_output: s.expected_output ? toBase64(s.expected_output) : undefined,
    }));

    const response = await axios.post(
      JUDGE0_API_URL,
      { submissions },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
        params: {
          base64_encoded: "true",
        },
      }
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("POST Error:", err.response?.data || err.message);
    return new Response(JSON.stringify({ error: "Failed to submit code to Judge0" }), {
      status: 500,
    });
  }
}
