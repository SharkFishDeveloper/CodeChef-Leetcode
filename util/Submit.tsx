import axios from "axios";
import { JudgeSubmission } from "./JudgeFormat";
import { Question } from "@/interface/Question";
import { JudgeTestCaseResult } from "@/interface/Judge0Result";



const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Base64 decode helper
const decodeBase64 = (str: string | null | undefined) =>
  str ? Buffer.from(str, "base64").toString("utf-8").trim() : null;

const submitCode = async (finalCodeObject: JudgeSubmission[], question: Question):Promise<JudgeTestCaseResult[]> => {
  try {
    console.log("Submitting code:", finalCodeObject);

    // Step 1: Submit code
    const submitRes = await axios.post("/api/judge", {
      submissions: finalCodeObject,
    });
    //@ts-ignore
    const tokens = submitRes.data?.map((s: any) => s.token);
    if (!tokens || tokens.length === 0) {
      throw new Error("No tokens received");
    }

    // Step 2: Poll for results
    await sleep(2000);

    const resultRes = await axios.post("/api/judge/status", { tokens });
    //@ts-ignore
    const results = resultRes.data.submissions;

    console.log("Raw Judge0 Results:", results);

    // Step 3: Decode and compare
    const comparison = results.map((res: any, idx: number) => {
      const decodedOutput = decodeBase64(res.stdout);
      const expectedOutput = question.testcases[idx].expectedOutput.trim();
      const passed = decodedOutput === expectedOutput;

      return {
        test: idx + 1,
        passed,
        expected: expectedOutput,
        received: decodedOutput,
        statusId: res.status_id,
        stderr: decodeBase64(res.stderr),
      };
    });

    console.log("Comparison Results:", comparison);
    return comparison;
  } catch (error: any) {
    console.error("Error with Judge0", error.response?.data || error.message);
    return [];
  }
};

export default submitCode;
