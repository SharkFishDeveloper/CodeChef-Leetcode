export interface QuestionParams {
  name: string;
  param: string;
  difficulty:string;
  categories: string[];
}

export const questionList: QuestionParams[] = [
  {
    name: "Binary-Search",
    param: "binary-search",
    difficulty: "Easy",
    categories: ["Array", "Binary Search", "Divide and Conquer"]
  },
  {
    name: "Two-sum",
    param: "two-sum",
    difficulty: "Easy",
    categories: ["HashMap", "Array", "Brute Force"]
  },
];
