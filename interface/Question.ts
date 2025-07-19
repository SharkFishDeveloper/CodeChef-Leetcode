export interface Question {
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string; // Markdown content
  code: {
    js?: LanguageCode;
    python?: LanguageCode;
    cpp?: LanguageCode;
    java?: LanguageCode;
    [language: string]: LanguageCode | undefined;
  };
  testcases: TestCase[];
}

export interface LanguageCode {
  boilerplate: string;
  wrapper: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}
