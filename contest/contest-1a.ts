export default {
  name: "contest-1a",
  questions: [
    {
      slug: 'binary-search',
      title: 'Binary Search',
      difficulty: 'Easy',
      description: `
# Binary Search

## Description

Search in a sorted array using divide and conquer.

### Example Input
\`\`\`js
arr = [1, 2, 3, 4, 5]
target = 3
\`\`\`

### Expected Output
\`\`\`js
2
\`\`\`

### Explanation
The target \`3\` is at index \`2\`. Binary search finds it in \`O(log n)\` time.
`,
      code: {
        js: {
          boilerplate: `function binarySearch(arr, target) {
  // Write your binary search logic here
}`,
          wrapper: `
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const arr = lines[0].split(' ').map(Number);
  const target = parseInt(lines[1]);
  const result = binarySearch(arr, target);
  console.log(result);
});
`,
        },
        python: {
          boilerplate: `def binary_search(arr, target):
    # Write your binary search logic here
    pass`,
          wrapper: `
if __name__ == "__main__":
    import sys
    input_lines = [line.strip() for line in sys.stdin]
    arr = list(map(int, input_lines[0].split()))
    target = int(input_lines[1])
    result = binary_search(arr, target)
    print(result)
`,
        },
        cpp: {
          boilerplate: `#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    // Write your binary search logic here
    return -1;
}`,
          wrapper: `
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target);

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> arr;
    int num;
    while (iss >> num) arr.push_back(num);

    int target;
    cin >> target;

    int result = binarySearch(arr, target);
    cout << result << endl;
    return 0;
}
`,
        },
        java: {
          boilerplate: `import java.util.*;

public class Main {
    public static int binarySearch(int[] arr, int target) {
        // Write your binary search logic here
        return -1;
    }`,
          wrapper: `
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] tokens = sc.nextLine().split(" ");
        int[] arr = Arrays.stream(tokens).mapToInt(Integer::parseInt).toArray();
        int target = Integer.parseInt(sc.nextLine());

        int result = binarySearch(arr, target);
        System.out.println(result);
    }
}
`,
        },
      },
      testcases: [
        {
          input: "1 2 3\n2",
          expectedOutput: "1",
        },
        {
          input: "10 20 30 40 50\n40",
          expectedOutput: "3",
        },
      ],
    },

    // NEW PROBLEM BELOW
    {
      slug: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: `
# Valid Parentheses

## Description

Given a string containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\`, and \`']'\`, determine if the input string is valid.

### A string is valid if:
- Open brackets are closed by the same type of brackets.
- Open brackets are closed in the correct order.

### Example Input
\`\`\`js
s = "({[]})"
\`\`\`

### Expected Output
\`\`\`js
true
\`\`\`

### Example Input
\`\`\`js
s = "({[})"
\`\`\`

### Expected Output
\`\`\`js
false
\`\`\`
`,
      code: {
        js: {
          boilerplate: `function isValid(s) {
  // Write your logic here
}`,
          wrapper: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let input = '';
rl.on('line', (line) => input = line);
rl.on('close', () => {
  const result = isValid(input.trim());
  console.log(result);
});
`,
        },
        python: {
          boilerplate: `def is_valid(s):
    # Write your logic here
    pass`,
          wrapper: `
if __name__ == "__main__":
    import sys
    s = sys.stdin.read().strip()
    result = is_valid(s)
    print(result)
`,
        },
        cpp: {
          boilerplate: `#include <string>
using namespace std;

bool isValid(string s) {
    // Write your logic here
    return false;
}`,
          wrapper: `
#include <iostream>
#include <string>
using namespace std;

bool isValid(string s);

int main() {
    string s;
    getline(cin, s);
    bool result = isValid(s);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`,
        },
        java: {
          boilerplate: `import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        // Write your logic here
        return false;
    }`,
          wrapper: `
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        boolean result = isValid(s);
        System.out.println(result);
    }
}
`,
        },
      },
      testcases: [
        {
          input: "({[]})",
          expectedOutput: "true",
        },
        {
          input: "({[})",
          expectedOutput: "false",
        },
        {
          input: "()[]{}",
          expectedOutput: "true",
        },
        {
          input: "(((",
          expectedOutput: "false",
        },
      ],
    },
  ],
};
