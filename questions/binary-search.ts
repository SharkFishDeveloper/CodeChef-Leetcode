export default {
  slug: 'binary-search',
  title: 'Binary Search',
  difficulty: 'Easy',
  description: `
  #  Binary Search

    ## Description

    Search in a sorted array using divide and conquer.

    ###  Example Input
\`\`\`js
arr = [1, 2, 3, 4, 5]
target = 3
\`\`\`

###  Expected Output
\`\`\`js
2
\`\`\`

### Explanation
The target \`3\` is at index \`2\`. Binary search finds it in \`O(log n)\` time.

---

###  Example Input
\`\`\`js
arr = [10, 20, 30, 40, 50]
target = 40
\`\`\`

###  Expected Output
\`\`\`js
3
\`\`\`

###  Explanation
The target \`40\` is at index \`3\`. Binary search quickly finds it by narrowing down the search range using divide and conquer.
`,
    
    code : {
  js: {
      boilerplate: `function solve(inputLines) {
    // inputLines is an array of strings from stdin
  }`,
      wrapper: `
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin });
  const lines = [];

  rl.on('line', line => lines.push(line));
  rl.on('close', () => {
    const result = solve(lines);
    if (typeof result !== "undefined") console.log(result);
  });
  `,
    },
    python: {
      boilerplate: `def solve(input_lines):
      # input_lines is a list of strings from stdin
      pass`,
      wrapper: `
  if __name__ == "__main__":
      import sys
      input_lines = [line.rstrip('\\n') for line in sys.stdin]
      result = solve(input_lines)
      if result is not None:
          print(result)
  `,
    },

    cpp: {
      boilerplate: `#include <iostream>
  #include <vector>
  #include <string>
  using namespace std;

  void solve(vector<string>& inputLines) {
      // inputLines contains each line from stdin
  }`,
      wrapper: `
  int main() {
      vector<string> inputLines;
      string line;
      while (getline(cin, line)) {
          inputLines.push_back(line);
      }
      solve(inputLines);
      return 0;
  }
  `,
    },

    java: {
      boilerplate: `import java.util.*;

  public class Main {
      public static void solve(List<String> inputLines) {
          // inputLines contains each line from stdin
      }`,
      wrapper: `
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          List<String> inputLines = new ArrayList<>();
          while (sc.hasNextLine()) {
              inputLines.add(sc.nextLine());
          }
          solve(inputLines);
      }
  }`,
    }
  },

  testcases: [
    {
      input: "1 2 3\n2", // full stdin string
      expectedOutput: "1"
    },
    {
      input: "4 5 6\n5",
      expectedOutput: "1"
    }
  ]
};
