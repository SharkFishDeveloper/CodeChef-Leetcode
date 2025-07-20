export interface JudgeTestCaseResult {
  test: number;
  passed: boolean;
  expected: string;
  received: string | null;
  statusId: number;
  stderr: string | null;
}