import { Question } from "./interface/Question"

export interface ContestRound{
    name:string,
    questions:Question[]
}
export interface Contest{
    contests : ContestRound[]
}

export interface SingleContestMetaData {
    name:string,
    param:string,
    questions:{
        name:string,
    }[]
}
export interface ContestMetaData{
    contests:SingleContestMetaData[]
}

const AllContests: ContestMetaData = {
  contests: [
    {
      name: "contest-1a",
      param:"contest-1a",
      questions: [
        { name: "Binary Search" },
        { name: "Valid Parentheses" },
      ],
    }
  ],
};

export default AllContests;