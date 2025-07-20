const langMap: Record<string, string> = {
  'C++': 'cpp',
  'Java': 'java',
  'Python': 'python',
  'Js': 'js',
};

export default function getLangKey(language: string): string {
  return langMap[language] || language.toLowerCase();
}
