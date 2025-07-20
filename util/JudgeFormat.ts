import { Question } from "@/interface/Question";
import getLangKey from "./LanguageMap";

export interface JudgeSubmission {
  language_id: number;
  source_code: string;
  stdin: string;
  expected_output: string;
  cpu_time_limit?: string;
  memory_limit?: string;
}

const langToJudge0ID: Record<string, number> = {
  cpp: 54,      // C++ (G++ 17)
  java: 62,     // Java (OpenJDK 17)
  python: 71,   // Python 3.8.1
  js: 63        // JavaScript (Node.js 18)
};

export default function JudgeFormat(question:Question,fullCode:string,language:string){
    const langKey = getLangKey(language)
    const languageId = langToJudge0ID[langKey]; 
    const submissions: JudgeSubmission[] = question.testcases.map((tc) => ({
        language_id: languageId,
        source_code: fullCode,
        stdin: tc.input,
        expected_output: tc.expectedOutput,
        cpu_time_limit: "2", // Optional: Customize as needed
        memory_limit: "128000" // Optional: Customize as needed (in KB)
    }));

  return submissions;
}