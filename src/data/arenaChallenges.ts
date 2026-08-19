import type { Challenge } from './challenges'

// ==========================================
// BASIC ARENA CHALLENGES (Fundamentals)
// ==========================================
export const basicArenaChallenges: Challenge[] = [
  {
    id: 1001,
    title: "Arena: Basic Addition",
    prompt: "Print the sum of 15 and 27.",
    starterCode: "# Print the sum\n",
    sampleInput: "",
    expectedOutput: "42",
    explanation: "Basic arithmetic using the + operator.",
    videoTitle: "Basic Math",
    difficulty: "easy",
    testCases: [{ input: "", expectedOutput: "42", isHidden: false, hint: "Just print 15 + 27" }]
  },
  {
    id: 1002,
    title: "Arena: String Repetition",
    prompt: "Read a word. Print it 3 times consecutively without spaces.",
    starterCode: "word = input()\n",
    sampleInput: "Go",
    expectedOutput: (input) => input.trim().repeat(3),
    explanation: "String multiplication.",
    videoTitle: "Strings",
    difficulty: "easy",
    testCases: [
      { input: "Go", expectedOutput: "GoGoGo", isHidden: false, hint: "Multiply the string by 3" },
      { input: "Code", expectedOutput: "CodeCodeCode", isHidden: true, hint: "Use word * 3" }
    ]
  },
  {
    id: 1003,
    title: "Arena: Type Conversion",
    prompt: "Read a decimal string (e.g. '3.14'). Convert it to a float, then to an integer, and print the integer.",
    starterCode: "val = input()\n# Convert and print",
    sampleInput: "3.14",
    expectedOutput: (input) => String(Math.trunc(Number(input.trim()))),
    explanation: "Using float() then int() to truncate decimals.",
    videoTitle: "Type Conversion",
    difficulty: "easy",
    testCases: [
      { input: "3.14", expectedOutput: "3", isHidden: false, hint: "Convert to float(), then int()!" },
      { input: "9.99", expectedOutput: "9", isHidden: true, hint: "int() truncates, it does not round up!" }
    ]
  },
  {
    id: 1004,
    title: "Arena: Floor Division",
    prompt: "Read two numbers separated by a space. Print the result of floor division (//) of the first by the second.",
    starterCode: "a, b = map(int, input().split())\n# Print floor division",
    sampleInput: "17 5",
    expectedOutput: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(Math.floor(a / b));
    },
    explanation: "Floor division rounds down to the nearest whole number.",
    videoTitle: "Advanced Operators",
    difficulty: "easy",
    testCases: [
      { input: "17 5", expectedOutput: "3", isHidden: false, hint: "Use the // operator" },
      { input: "100 9", expectedOutput: "11", isHidden: true, hint: "100 // 9 is 11" }
    ]
  },
  {
    id: 1005,
    title: "Arena: F-String Introduction",
    prompt: "Read a name and an age on two lines. Print 'Hello [name], you are [age]!' using an f-string.",
    starterCode: "name = input().strip()\nage = input().strip()\n# Use f-string",
    sampleInput: "Alice\n20",
    expectedOutput: (input) => {
      const [name, age] = input.trim().split("\n");
      return `Hello ${name}, you are ${age}!`;
    },
    explanation: "F-strings format variables directly into strings.",
    videoTitle: "String Formatting",
    difficulty: "easy",
    testCases: [
      { input: "Alice\n20", expectedOutput: "Hello Alice, you are 20!", isHidden: false, hint: "f'Hello {name}, you are {age}!'" },
      { input: "Bob\n99", expectedOutput: "Hello Bob, you are 99!", isHidden: true, hint: "Check punctuation!" }
    ]
  },
  {
    id: 1006,
    title: "Arena: List Access",
    prompt: "Read a space-separated list of colors. Print the first color and the last color separated by a space.",
    starterCode: "colors = input().split()\n# Print first and last",
    sampleInput: "red green blue yellow",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/);
      return `${arr[0]} ${arr[arr.length - 1]}`;
    },
    explanation: "Accessing elements via index 0 and -1.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "red green blue yellow", expectedOutput: "red yellow", isHidden: false, hint: "Use index 0 and -1" },
      { input: "black white", expectedOutput: "black white", isHidden: true, hint: "First and last!" }
    ]
  },
  {
    id: 1007,
    title: "Arena: Dictionary Lookup",
    prompt: "A dictionary 'scores = {\"Alice\": 90, \"Bob\": 85}'. Read a name from input and print their score. If not found, print 'N/A'.",
    starterCode: "scores = {'Alice': 90, 'Bob': 85}\nname = input().strip()\n# Print score or N/A",
    sampleInput: "Alice",
    expectedOutput: (input) => {
      const name = input.trim();
      return name === "Alice" ? "90" : name === "Bob" ? "85" : "N/A";
    },
    explanation: "Using dict.get(key, default).",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "Alice", expectedOutput: "90", isHidden: false, hint: "Use scores.get(name, 'N/A')" },
      { input: "Charlie", expectedOutput: "N/A", isHidden: true, hint: "Handle missing keys cleanly." }
    ]
  },
  {
    id: 1008,
    title: "Arena: The While Loop",
    prompt: "Read a number N. Print 'Tick' N times using a while loop, each on a new line.",
    starterCode: "n = int(input())\n# Use a while loop",
    sampleInput: "3",
    expectedOutput: (input) => "Tick\n".repeat(Number(input.trim())).trim(),
    explanation: "Basic while loop decrementing a counter.",
    videoTitle: "While Loops",
    difficulty: "easy",
    testCases: [
      { input: "3", expectedOutput: "Tick\nTick\nTick", isHidden: false, hint: "while n > 0:" },
      { input: "1", expectedOutput: "Tick", isHidden: true, hint: "Just one tick." }
    ]
  },
  {
    id: 1009,
    title: "Arena: Absolute Value",
    prompt: "Read a number. Print its absolute value without using the built-in abs() function (use if/else).",
    starterCode: "n = int(input())\n# Print absolute value",
    sampleInput: "-15",
    expectedOutput: (input) => String(Math.abs(Number(input.trim()))),
    explanation: "If n < 0, multiply by -1.",
    videoTitle: "If Statements",
    difficulty: "easy",
    testCases: [
      { input: "-15", expectedOutput: "15", isHidden: false, hint: "If it's less than 0, multiply by -1" },
      { input: "42", expectedOutput: "42", isHidden: true, hint: "Positive numbers stay positive." }
    ]
  },
  {
    id: 1010,
    title: "Arena: List Comprehension Intro",
    prompt: "Read a string of numbers. Use a list comprehension to create a list of those numbers squared. Print the list.",
    starterCode: "nums = list(map(int, input().split()))\n# Create squares list",
    sampleInput: "1 2 3",
    expectedOutput: (input) => {
      const squares = input.trim().split(/\s+/).map(Number).map(n => n * n);
      return `[${squares.join(", ")}]`;
    },
    explanation: "[x**2 for x in nums]",
    videoTitle: "List Comprehension",
    difficulty: "easy",
    testCases: [
      { input: "1 2 3", expectedOutput: "[1, 4, 9]", isHidden: false, hint: "print([x**2 for x in nums])" },
      { input: "4 5", expectedOutput: "[16, 25]", isHidden: true, hint: "Check your exponent logic." }
    ]
  },
  {
    id: 1011,
    title: "Arena: Variable Swapping",
    prompt: "Read two variables from input (each on a new line). Swap their values in Python and print them on a single line separated by a space.",
    starterCode: "a = input().strip()\nb = input().strip()\n# Swap a and b, then print",
    sampleInput: "Apple\nBanana",
    expectedOutput: (input) => {
      const [a, b] = input.trim().split('\n');
      return `${b.trim()} ${a.trim()}`;
    },
    explanation: "Python allows parallel assignment to swap variables: a, b = b, a.",
    videoTitle: "Variables and Assignment",
    difficulty: "easy",
    testCases: [
      { input: "Apple\nBanana", expectedOutput: "Banana Apple", isHidden: false, hint: "Try using: a, b = b, a" },
      { input: "10\n99", expectedOutput: "99 10", isHidden: true, hint: "Make sure they are separated by a space." }
    ]
  },
  {
    id: 1012,
    title: "Arena: The Remainder",
    prompt: "Read two numbers separated by a space. Print the remainder of the first number divided by the second.",
    starterCode: "a, b = map(int, input().split())\n# Print the remainder",
    sampleInput: "10 3",
    expectedOutput: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(a % b);
    },
    explanation: "The modulo operator (%) returns the remainder of division.",
    videoTitle: "Complex Operators",
    difficulty: "easy",
    testCases: [
      { input: "10 3", expectedOutput: "1", isHidden: false, hint: "10 divided by 3 is 9 with a remainder of 1. Use the % operator." },
      { input: "20 5", expectedOutput: "0", isHidden: true, hint: "If it divides evenly, the remainder should be 0." }
    ]
  },
  {
    id: 1013,
    title: "Arena: Shouting Text",
    prompt: "Read a string from input. Print the string entirely in UPPERCASE.",
    starterCode: "text = input()\n# Print it in uppercase",
    sampleInput: "hello world",
    expectedOutput: (input) => input.trim().toUpperCase(),
    explanation: "The .upper() string method converts all characters to uppercase.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "hello world", expectedOutput: "HELLO WORLD", isHidden: false, hint: "Use text.upper()" },
      { input: "Python 3", expectedOutput: "PYTHON 3", isHidden: true, hint: "Numbers and symbols remain unchanged." }
    ]
  },
  {
    id: 1014,
    title: "Arena: Replace the Vowel",
    prompt: "Read a string from input. Replace every lowercase 'a' with an '@' symbol and print the new string.",
    starterCode: "text = input()\n# Replace 'a' with '@'",
    sampleInput: "apple and banana",
    expectedOutput: (input) => input.trim().replace(/a/g, '@'),
    explanation: "The .replace(old, new) method substitutes parts of a string.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "apple and banana", expectedOutput: "@pple @nd b@n@n@", isHidden: false, hint: "Use text.replace('a', '@')" },
      { input: "hello", expectedOutput: "hello", isHidden: true, hint: "If there is no 'a', the string stays the same." }
    ]
  },
  {
    id: 1015,
    title: "Arena: Tuple Unpacking",
    prompt: "Read three space-separated words. Pack them into a tuple, then unpack them into variables x, y, and z. Print them in reverse order: z, y, x.",
    starterCode: "words = input().split()\nmy_tuple = (words[0], words[1], words[2])\n# Unpack and print in reverse",
    sampleInput: "ready set go",
    expectedOutput: (input) => {
      const [x, y, z] = input.trim().split(/\s+/);
      return `${z} ${y} ${x}`;
    },
    explanation: "Tuples can be unpacked into separate variables simultaneously.",
    videoTitle: "Tuples",
    difficulty: "easy",
    testCases: [
      { input: "ready set go", expectedOutput: "go set ready", isHidden: false, hint: "x, y, z = my_tuple. Then print z, y, x." },
      { input: "one two three", expectedOutput: "three two one", isHidden: true, hint: "Ensure you are printing them separated by spaces." }
    ]
  },
  {
    id: 1016,
    title: "Arena: Safe Type Conversion",
    prompt: "Read a user input. Try to convert it to an integer. If it fails due to a ValueError, print 'Invalid', otherwise print the integer.",
    starterCode: "val = input().strip()\n# Use try-except block here",
    sampleInput: "abc",
    expectedOutput: (input) => {
      const val = input.trim();
      return isNaN(Number(val)) ? "Invalid" : String(parseInt(val));
    },
    explanation: "Try/Except blocks prevent your program from crashing on bad data.",
    videoTitle: "Error Handling",
    difficulty: "easy",
    testCases: [
      { input: "abc", expectedOutput: "Invalid", isHidden: false, hint: "except ValueError:\n    print('Invalid')" },
      { input: "42", expectedOutput: "42", isHidden: true, hint: "Valid integers should just be printed." }
    ]
  },
  {
    id: 1017,
    title: "Arena: Circle Circumference",
    prompt: "Read a radius from input. Calculate the circumference (2 * pi * r) using the math module. Print it formatted to 2 decimal places.",
    starterCode: "import math\nr = float(input())\n# Print 2 * pi * r formatted to 2 decimal places",
    sampleInput: "5",
    expectedOutput: (input) => {
      const r = Number(input.trim());
      return (2 * Math.PI * r).toFixed(2);
    },
    explanation: "Use math.pi for precision, and f-strings formatting like {value:.2f} for decimals.",
    videoTitle: "Math Module & Formatting",
    difficulty: "easy",
    testCases: [
      { input: "5", expectedOutput: "31.42", isHidden: false, hint: "print(f'{circumference:.2f}')" },
      { input: "10", expectedOutput: "62.83", isHidden: true, hint: "Check your math module import!" }
    ]
  },
  {
    id: 1018,
    title: "Arena: Grade Calculator",
    prompt: "Read a score (0-100). Print 'A' for >= 90, 'B' for >= 80, 'C' for >= 70, and 'F' for anything lower.",
    starterCode: "score = int(input())\n# Use if/elif/else",
    sampleInput: "85",
    expectedOutput: (input) => {
      const s = Number(input.trim());
      if (s >= 90) return "A";
      if (s >= 80) return "B";
      if (s >= 70) return "C";
      return "F";
    },
    explanation: "Elif chains allow you to check multiple conditions sequentially.",
    videoTitle: "If Statements",
    difficulty: "easy",
    testCases: [
      { input: "85", expectedOutput: "B", isHidden: false, hint: "85 is >= 80, so it's a B." },
      { input: "92", expectedOutput: "A", isHidden: true, hint: "Make sure >= 90 comes first!" },
      { input: "65", expectedOutput: "F", isHidden: true, hint: "Anything under 70 is an F." }
    ]
  },
  {
    id: 1019,
    title: "Arena: Contains Letter",
    prompt: "Line 1: A word. Line 2: A letter. Print 'Yes' if the letter is inside the word, else print 'No'.",
    starterCode: "word = input().strip()\nletter = input().strip()\n# Check if letter is in word",
    sampleInput: "python\nt",
    expectedOutput: (input) => {
      const [word, letter] = input.trim().split("\n");
      return word.includes(letter) ? "Yes" : "No";
    },
    explanation: "The 'in' keyword checks for membership within strings or lists.",
    videoTitle: "Control Flow & Strings",
    difficulty: "easy",
    testCases: [
      { input: "python\nt", expectedOutput: "Yes", isHidden: false, hint: "if letter in word:" },
      { input: "java\nz", expectedOutput: "No", isHidden: true, hint: "If it's not found, print No." }
    ]
  },
  {
    id: 1020,
    title: "Arena: Boolean AND / OR",
    prompt: "Line 1: Age. Line 2: Ticket ('VIP' or 'Standard'). Print 'Enter' if age is >= 18 AND ticket is 'VIP'. Otherwise print 'Wait'.",
    starterCode: "age = int(input())\nticket = input().strip()\n# Check logic",
    sampleInput: "20\nVIP",
    expectedOutput: (input) => {
      const [ageStr, ticket] = input.trim().split("\n");
      const age = Number(ageStr);
      return (age >= 18 && ticket === "VIP") ? "Enter" : "Wait";
    },
    explanation: "Combine boolean expressions using the 'and' keyword.",
    videoTitle: "If Statements",
    difficulty: "easy",
    testCases: [
      { input: "20\nVIP", expectedOutput: "Enter", isHidden: false, hint: "if age >= 18 and ticket == 'VIP':" },
      { input: "16\nVIP", expectedOutput: "Wait", isHidden: true, hint: "Under 18 must wait, even if VIP." },
      { input: "25\nStandard", expectedOutput: "Wait", isHidden: true, hint: "Standard tickets must wait." }
    ]
  },
  {
    id: 1021,
    title: "Arena: Joining Strings",
    prompt: "Read a space-separated list of words. Join them together using a hyphen '-' and print the result.",
    starterCode: "words = input().split()\n# Join and print",
    sampleInput: "one two three",
    expectedOutput: (input) => input.trim().split(/\s+/).join('-'),
    explanation: "The .join() method attaches a list of strings together using a separator.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "one two three", expectedOutput: "one-two-three", isHidden: false, hint: "print('-'.join(words))" },
      { input: "apple banana", expectedOutput: "apple-banana", isHidden: true, hint: "Ensure you use the hyphen as the separator." }
    ]
  },
  {
    id: 1022,
    title: "Arena: Skip the Threes",
    prompt: "Read a number N. Loop from 1 to N. Print the number, but if it is a multiple of 3, use 'continue' to skip printing it.",
    starterCode: "n = int(input())\nfor i in range(1, n + 1):\n    # Add continue logic here\n    print(i)",
    sampleInput: "5",
    expectedOutput: (input) => {
      const n = Number(input.trim());
      let res = [];
      for(let i=1; i<=n; i++) {
        if(i % 3 !== 0) res.push(i);
      }
      return res.join('\n');
    },
    explanation: "The 'continue' keyword skips the rest of the current loop iteration.",
    videoTitle: "For Loops",
    difficulty: "easy",
    testCases: [
      { input: "5", expectedOutput: "1\n2\n4\n5", isHidden: false, hint: "if i % 3 == 0: continue" },
      { input: "3", expectedOutput: "1\n2", isHidden: true, hint: "It should skip printing 3 completely." }
    ]
  },
  {
    id: 1023,
    title: "Arena: Break the Loop",
    prompt: "Read a list of space-separated numbers. Loop through them and add them to a total. If you encounter a negative number, use 'break' to stop the loop immediately. Print the total.",
    starterCode: "nums = list(map(int, input().split()))\ntotal = 0\n# Loop, break, and print total",
    sampleInput: "5 10 -1 4",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      let total = 0;
      for(let num of nums) {
        if(num < 0) break;
        total += num;
      }
      return String(total);
    },
    explanation: "The 'break' keyword immediately terminates the closest enclosing loop.",
    videoTitle: "While Loops",
    difficulty: "easy",
    testCases: [
      { input: "5 10 -1 4", expectedOutput: "15", isHidden: false, hint: "if num < 0: break" },
      { input: "2 2 2", expectedOutput: "6", isHidden: true, hint: "If no negatives, it should sum them all." }
    ]
  },
  {
    id: 1024,
    title: "Arena: Count Occurrences",
    prompt: "Line 1: A string. Line 2: A character. Print how many times that character appears in the string using the .count() method.",
    starterCode: "text = input().strip()\nchar = input().strip()\n# Print the count",
    sampleInput: "banana\na",
    expectedOutput: (input) => {
      const [text, char] = input.trim().split('\n');
      return String(text.split(char).length - 1);
    },
    explanation: "The .count() string method returns the number of non-overlapping occurrences of a substring.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "banana\na", expectedOutput: "3", isHidden: false, hint: "Use text.count(char)" },
      { input: "hello\nz", expectedOutput: "0", isHidden: true, hint: "If not found, count is 0." }
    ]
  },
  {
    id: 1025,
    title: "Arena: Add to Dictionary",
    prompt: "A dictionary is {'a': 1, 'b': 2}. Read a string key and an integer value from input. Add them to the dictionary, then print the dictionary's keys as a list.",
    starterCode: "my_dict = {'a': 1, 'b': 2}\nnew_key = input().strip()\nnew_val = int(input())\n# Add to dict, print keys",
    sampleInput: "c\n3",
    expectedOutput: (input) => {
      const [k, v] = input.trim().split('\n');
      return `['a', 'b', '${k.trim()}']`;
    },
    explanation: "Add to a dictionary using dict[key] = value, and get keys using list(dict.keys()).",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "c\n3", expectedOutput: "['a', 'b', 'c']", isHidden: false, hint: "my_dict[new_key] = new_val\nprint(list(my_dict.keys()))" },
      { input: "z\n99", expectedOutput: "['a', 'b', 'z']", isHidden: true, hint: "Ensure keys are printed as a list of strings." }
    ]
  },
  {
    id: 1026,
    title: "Arena: Slicing the Middle",
    prompt: "Read a string. Slice it to get the first 3 characters and the last 3 characters. Print them combined together.",
    starterCode: "text = input().strip()\n# Slice and print",
    sampleInput: "programming",
    expectedOutput: (input) => {
      const text = input.trim();
      return text.slice(0, 3) + text.slice(-3);
    },
    explanation: "Use list/string slicing: text[:3] gets the first three, text[-3:] gets the last three.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "programming", expectedOutput: "proing", isHidden: false, hint: "print(text[:3] + text[-3:])" },
      { input: "abcdef", expectedOutput: "abcdef", isHidden: true, hint: "If length is 6, it just prints the whole thing." }
    ]
  },
  {
    id: 1027,
    title: "Arena: Minimum Built-in",
    prompt: "Read a space-separated list of numbers. Print the smallest number using the built-in min() function.",
    starterCode: "nums = list(map(int, input().split()))\n# Print the minimum",
    sampleInput: "5 2 9 1 8",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      return String(Math.min(...nums));
    },
    explanation: "Python provides built-in functions like min() and max() for iterables.",
    videoTitle: "Functions",
    difficulty: "easy",
    testCases: [
      { input: "5 2 9 1 8", expectedOutput: "1", isHidden: false, hint: "print(min(nums))" },
      { input: "-10 0 5", expectedOutput: "-10", isHidden: true, hint: "Works with negatives too!" }
    ]
  },
  {
    id: 1028,
    title: "Arena: Defining a Function",
    prompt: "Define a function named 'multiply' that takes two parameters (a, b) and returns their product. The starter code will read two numbers and print the result of your function.",
    starterCode: "def multiply(a, b):\n    # Your code here\n    pass\n\nx, y = map(int, input().split())\nprint(multiply(x, y))",
    sampleInput: "4 5",
    expectedOutput: (input) => {
      const [x, y] = input.trim().split(/\s+/).map(Number);
      return String(x * y);
    },
    explanation: "Functions encapsulate logic using 'def' and send data back using 'return'.",
    videoTitle: "Functions",
    difficulty: "easy",
    testCases: [
      { input: "4 5", expectedOutput: "20", isHidden: false, hint: "Replace 'pass' with 'return a * b'" },
      { input: "10 -2", expectedOutput: "-20", isHidden: true, hint: "Must return the product." }
    ]
  },
  {
    id: 1029,
    title: "Arena: Truthy and Falsy",
    prompt: "Read a string input. Use the bool() function to convert it to a boolean. Print the boolean result.",
    starterCode: "text = input()\n# Convert to bool and print",
    sampleInput: "hello",
    expectedOutput: (input) => input.replace(/\r\n/g, "\n") === "" ? "False" : "True",
    explanation: "Empty strings are evaluated as False, any string with content is True.",
    videoTitle: "Conversion Quirks",
    difficulty: "easy",
    testCases: [
      { input: "hello", expectedOutput: "True", isHidden: false, hint: "print(bool(text))" },
      { input: "", expectedOutput: "False", isHidden: true, hint: "An empty input evaluates to False." }
    ]
  },
  {
    id: 1030,
    title: "Arena: List Appending",
    prompt: "Create an empty list. Read three words from input on separate lines. Use the .append() method to add each word to the list, then print the list.",
    starterCode: "my_list = []\nw1 = input().strip()\nw2 = input().strip()\nw3 = input().strip()\n# Append and print",
    sampleInput: "apple\nbanana\ncherry",
    expectedOutput: (input) => {
      const words = input.trim().split('\n').map(w => w.trim());
      return `['${words[0]}', '${words[1]}', '${words[2]}']`;
    },
    explanation: "The .append() method adds elements to the end of a list in-place.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "apple\nbanana\ncherry", expectedOutput: "['apple', 'banana', 'cherry']", isHidden: false, hint: "my_list.append(w1)\n# Do this for all 3, then print(my_list)" },
      { input: "one\ntwo\nthree", expectedOutput: "['one', 'two', 'three']", isHidden: true, hint: "Must be a proper list format." }
    ]
  },
  {
    id: 1031,
    title: "Arena: Lowercase Strings",
    prompt: "Read a string from input. Convert it entirely to lowercase using the .lower() method and print the result.",
    starterCode: "text = input()\n# Print it in lowercase",
    sampleInput: "HELLO World",
    expectedOutput: (input) => input.trim().toLowerCase(),
    explanation: "The .lower() string method converts all characters to lowercase.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "HELLO World", expectedOutput: "hello world", isHidden: false, hint: "Use text.lower()" },
      { input: "PyThOn", expectedOutput: "python", isHidden: true, hint: "Make sure every letter becomes lowercase." }
    ]
  },
  {
    id: 1032,
    title: "Arena: Strip Whitespace",
    prompt: "Read a string from input that might have extra spaces at the beginning or end. Use the .strip() method to clean it up, then print the clean string surrounded by quotes.",
    starterCode: "text = input()\n# Strip and print with quotes",
    sampleInput: "   hello   ",
    expectedOutput: (input) => `"${input.trim()}"`,
    explanation: "The .strip() method removes whitespace from both ends of a string.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "   hello   ", expectedOutput: '"hello"', isHidden: false, hint: "print(f'\"{text.strip()}\"')" },
      { input: "no spaces", expectedOutput: '"no spaces"', isHidden: true, hint: "Make sure you surround it with quotes!" }
    ]
  },
  {
    id: 1033,
    title: "Arena: Split by Comma",
    prompt: "Read a comma-separated string of fruits. Use the .split() method with a comma as the delimiter to turn it into a list. Print the list.",
    starterCode: "text = input()\n# Split by comma and print",
    sampleInput: "apple,banana,cherry",
    expectedOutput: (input) => {
      const fruits = input.trim().split(',').map(f => `'${f}'`);
      return `[${fruits.join(', ')}]`;
    },
    explanation: "The .split(',') method breaks a string into a list wherever it finds a comma.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "apple,banana,cherry", expectedOutput: "['apple', 'banana', 'cherry']", isHidden: false, hint: "Use text.split(',')" },
      { input: "one,two", expectedOutput: "['one', 'two']", isHidden: true, hint: "Check that your output is a formatted list." }
    ]
  },
  {
    id: 1034,
    title: "Arena: String Concatenation",
    prompt: "Read two words on separate lines. Combine them into a single string with a space in the middle using the '+' operator. Print the result.",
    starterCode: "word1 = input().strip()\nword2 = input().strip()\n# Concatenate and print",
    sampleInput: "Fire\nTruck",
    expectedOutput: (input) => {
      const [w1, w2] = input.trim().split('\n');
      return `${w1.trim()} ${w2.trim()}`;
    },
    explanation: "You can glue strings together using the + operator (e.g., a + ' ' + b).",
    videoTitle: "Basic Operators",
    difficulty: "easy",
    testCases: [
      { input: "Fire\nTruck", expectedOutput: "Fire Truck", isHidden: false, hint: "print(word1 + ' ' + word2)" },
      { input: "Hello\nWorld", expectedOutput: "Hello World", isHidden: true, hint: "Don't forget the space in the middle!" }
    ]
  },
  {
    id: 1035,
    title: "Arena: Prefix Check",
    prompt: "Read a name from input. Print 'True' if the name starts with 'Mr. ' (using the .startswith() method), otherwise print 'False'.",
    starterCode: "name = input().strip()\n# Check prefix",
    sampleInput: "Mr. Smith",
    expectedOutput: (input) => input.trim().startsWith("Mr. ") ? "True" : "False",
    explanation: "The .startswith() method checks if a string begins with a specific substring.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "Mr. Smith", expectedOutput: "True", isHidden: false, hint: "print(name.startswith('Mr. '))" },
      { input: "Mrs. Jones", expectedOutput: "False", isHidden: true, hint: "It should exactly match 'Mr. '." }
    ]
  },
  {
    id: 1036,
    title: "Arena: Pop the List",
    prompt: "A list is provided in the starter code. Use the .pop() method to remove the LAST element, then print the updated list.",
    starterCode: "items = ['apple', 'banana', 'cherry']\n# Pop the last item and print the list",
    sampleInput: "",
    expectedOutput: "['apple', 'banana']",
    explanation: "The .pop() method removes and returns the last item in a list if no index is specified.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "", expectedOutput: "['apple', 'banana']", isHidden: false, hint: "Just call items.pop() before printing!" }
    ]
  },
  {
    id: 1037,
    title: "Arena: Modify List Element",
    prompt: "A list of numbers is provided. Change the MIDDLE number (index 1) to 99. Then print the list.",
    starterCode: "nums = [10, 20, 30]\n# Change the middle number to 99\n",
    sampleInput: "",
    expectedOutput: "[10, 99, 30]",
    explanation: "Lists are mutable, meaning you can change elements directly using their index.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "", expectedOutput: "[10, 99, 30]", isHidden: false, hint: "Set nums[1] = 99" }
    ]
  },
  {
    id: 1038,
    title: "Arena: Sum of a List",
    prompt: "Read a space-separated list of numbers. Use the built-in sum() function to add them all together and print the result.",
    starterCode: "nums = list(map(int, input().split()))\n# Print the sum",
    sampleInput: "1 2 3 4 5",
    expectedOutput: (input) => {
      const total = input.trim().split(/\s+/).map(Number).reduce((a,b) => a + b, 0);
      return String(total);
    },
    explanation: "The built-in sum() function quickly adds up all items in an iterable.",
    videoTitle: "Functions",
    difficulty: "easy",
    testCases: [
      { input: "1 2 3 4 5", expectedOutput: "15", isHidden: false, hint: "print(sum(nums))" },
      { input: "10 20", expectedOutput: "30", isHidden: true, hint: "It should sum any amount of numbers." }
    ]
  },
  {
    id: 1039,
    title: "Arena: Create a Tuple",
    prompt: "Read two numbers on separate lines. Pack them into a single tuple (using parentheses) and print the tuple.",
    starterCode: "x = int(input())\ny = int(input())\n# Create and print a tuple",
    sampleInput: "5\n10",
    expectedOutput: (input) => {
      const [x, y] = input.trim().split('\n');
      return `(${x.trim()}, ${y.trim()})`;
    },
    explanation: "Tuples are created by placing values inside parentheses separated by commas.",
    videoTitle: "Tuples",
    difficulty: "easy",
    testCases: [
      { input: "5\n10", expectedOutput: "(5, 10)", isHidden: false, hint: "my_tuple = (x, y)" },
      { input: "99\n1", expectedOutput: "(99, 1)", isHidden: true, hint: "Don't forget the parentheses!" }
    ]
  },
  {
    id: 1040,
    title: "Arena: Check Dictionary Key",
    prompt: "A dictionary is provided. Read a string from input. Check if that string exists as a KEY in the dictionary. Print 'Found' if it does, or 'Not Found' if it doesn't.",
    starterCode: "inventory = {'apple': 5, 'banana': 2}\nitem = input().strip()\n# Check if item is in inventory",
    sampleInput: "apple",
    expectedOutput: (input) => {
      const item = input.trim();
      return (item === "apple" || item === "banana") ? "Found" : "Not Found";
    },
    explanation: "You can use the 'in' keyword to check if a key exists in a dictionary.",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "apple", expectedOutput: "Found", isHidden: false, hint: "if item in inventory:" },
      { input: "orange", expectedOutput: "Not Found", isHidden: true, hint: "Print 'Not Found' if it's missing." }
    ]
  },
  {
    id: 1041,
    title: "Arena: Update Dictionary Value",
    prompt: "A dictionary holds Alice's score. Read a number from input and ADD it to her current score in the dictionary. Print her new score.",
    starterCode: "scores = {'Alice': 50}\nbonus = int(input())\n# Add bonus to Alice's score and print it",
    sampleInput: "10",
    expectedOutput: (input) => String(50 + Number(input.trim())),
    explanation: "You can update a dictionary value by accessing its key: dict[key] += value.",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "10", expectedOutput: "60", isHidden: false, hint: "scores['Alice'] += bonus" },
      { input: "5", expectedOutput: "55", isHidden: true, hint: "Make sure you update the existing value." }
    ]
  },
  {
    id: 1042,
    title: "Arena: Rounding Decimals",
    prompt: "Read a decimal number (float). Use the built-in round() function to round it to exactly 1 decimal place, then print it.",
    starterCode: "num = float(input())\n# Round and print",
    sampleInput: "3.14159",
    expectedOutput: (input) => Number(input.trim()).toFixed(1),
    explanation: "The round(number, digits) function rounds a float to the specified number of decimal places.",
    videoTitle: "Math Module",
    difficulty: "easy",
    testCases: [
      { input: "3.14159", expectedOutput: "3.1", isHidden: false, hint: "print(round(num, 1))" },
      { input: "9.87", expectedOutput: "9.9", isHidden: true, hint: "Make sure it rounds up correctly." }
    ]
  },
  {
    id: 1043,
    title: "Arena: Elif Ladder",
    prompt: "Read an integer temperature. If it's >= 80 print 'Hot', if it's >= 60 print 'Warm', otherwise print 'Cold'.",
    starterCode: "temp = int(input())\n# Use if/elif/else",
    sampleInput: "65",
    expectedOutput: (input) => {
      const temp = Number(input.trim());
      if (temp >= 80) return "Hot";
      if (temp >= 60) return "Warm";
      return "Cold";
    },
    explanation: "An elif ladder checks conditions in order and stops at the first true statement.",
    videoTitle: "If Statements",
    difficulty: "easy",
    testCases: [
      { input: "65", expectedOutput: "Warm", isHidden: false, hint: "65 is >= 60 but not >= 80, so it's 'Warm'." },
      { input: "85", expectedOutput: "Hot", isHidden: true, hint: "Check your order of conditions!" },
      { input: "30", expectedOutput: "Cold", isHidden: true, hint: "Under 60 should be 'Cold'." }
    ]
  },
  {
    id: 1044,
    title: "Arena: Loop Over a String",
    prompt: "Read a string from input. Use a for loop to iterate over the string and print each character on a new line.",
    starterCode: "text = input().strip()\n# Loop through characters",
    sampleInput: "cat",
    expectedOutput: (input) => input.trim().split('').join('\n'),
    explanation: "Strings are iterable, meaning you can loop through them character by character using 'for char in text:'.",
    videoTitle: "For Loops",
    difficulty: "easy",
    testCases: [
      { input: "cat", expectedOutput: "c\na\nt", isHidden: false, hint: "for char in text:\n    print(char)" },
      { input: "hi", expectedOutput: "h\ni", isHidden: true, hint: "Every letter gets its own line." }
    ]
  },
  {
    id: 1045,
    title: "Arena: Range with a Step",
    prompt: "Read an integer N. Use a for loop with a range step to print all EVEN numbers from 0 up to (but not including) N. Print each on a new line.",
    starterCode: "n = int(input())\n# Use range(start, stop, step)",
    sampleInput: "7",
    expectedOutput: (input) => {
      const n = Number(input.trim());
      let res = [];
      for (let i = 0; i < n; i += 2) res.push(i);
      return res.join('\n');
    },
    explanation: "The range function takes a third parameter: range(start, stop, step).",
    videoTitle: "For Loops",
    difficulty: "easy",
    testCases: [
      { input: "7", expectedOutput: "0\n2\n4\n6", isHidden: false, hint: "Use range(0, n, 2)" },
      { input: "4", expectedOutput: "0\n2", isHidden: true, hint: "It should stop before reaching N." }
    ]
  },
  {
    id: 1046,
    title: "Arena: Catching Zero Division",
    prompt: "Read two numbers A and B on separate lines. Try to divide A / B and print the result. Catch the ZeroDivisionError specifically and print 'Cannot divide by zero'.",
    starterCode: "a = int(input())\nb = int(input())\ntry:\n    # Divide and print\nexcept ZeroDivisionError:\n    # Handle error",
    sampleInput: "10\n0",
    expectedOutput: (input) => {
      const [a, b] = input.trim().split('\n').map(Number);
      return b === 0 ? "Cannot divide by zero" : String(a / b);
    },
    explanation: "You can specify which exact error you want to catch in an except block.",
    videoTitle: "Error Handling",
    difficulty: "easy",
    testCases: [
      { input: "10\n0", expectedOutput: "Cannot divide by zero", isHidden: false, hint: "except ZeroDivisionError:\n    print('Cannot divide by zero')" },
      { input: "10\n2", expectedOutput: "5.0", isHidden: true, hint: "Normal division should still print." }
    ]
  },
  {
    id: 1047,
    title: "Arena: Function Default Parameter",
    prompt: "Define a function 'greet' that takes a parameter 'name' which defaults to 'Guest'. It should return 'Hello, ' + name. The starter code handles the input.",
    starterCode: "def greet(name='Guest'):\n    return f'Hello, {name}'\n\nval = input().strip()\nif val:\n    print(greet(val))\nelse:\n    print(greet())",
    sampleInput: "",
    expectedOutput: (input) => {
      const val = input.trim();
      return val ? `Hello, ${val}` : "Hello, Guest";
    },
    explanation: "You can assign default values to function parameters by using an equals sign in the definition.",
    videoTitle: "Functions",
    difficulty: "easy",
    testCases: [
      { input: "", expectedOutput: "Hello, Guest", isHidden: false, hint: "Just return the string properly in your function." },
      { input: "Alice", expectedOutput: "Hello, Alice", isHidden: true, hint: "If a name is provided, it should use the name." }
    ]
  },
  {
    id: 1048,
    title: "Arena: List Comp Formatting",
    prompt: "Read a space-separated list of words. Use a list comprehension to create a new list where every word is converted to uppercase. Print the new list.",
    starterCode: "words = input().split()\n# Create uppercase list using comprehension",
    sampleInput: "hello world",
    expectedOutput: (input) => {
      const words = input.trim().split(/\s+/).map(w => `'${w.toUpperCase()}'`);
      return `[${words.join(', ')}]`;
    },
    explanation: "List comprehensions can include method calls on the items they iterate over.",
    videoTitle: "List Comprehension",
    difficulty: "easy",
    testCases: [
      { input: "hello world", expectedOutput: "['HELLO', 'WORLD']", isHidden: false, hint: "print([w.upper() for w in words])" },
      { input: "python", expectedOutput: "['PYTHON']", isHidden: true, hint: "Single words should be in a list too." }
    ]
  },
  {
    id: 1049,
    title: "Arena: The Boolean Quirk",
    prompt: "Read a string from input. Convert it to an integer FIRST, and then convert that integer to a boolean. Print the boolean.",
    starterCode: "val = input().strip()\n# Convert to int, then to bool, then print",
    sampleInput: "0",
    expectedOutput: (input) => Number(input.trim()) === 0 ? "False" : "True",
    explanation: "bool('0') is True because it's a non-empty string. But bool(int('0')) is False!",
    videoTitle: "Conversion Quirks",
    difficulty: "easy",
    testCases: [
      { input: "0", expectedOutput: "False", isHidden: false, hint: "print(bool(int(val)))" },
      { input: "1", expectedOutput: "True", isHidden: true, hint: "Any non-zero integer is True." }
    ]
  },
  {
    id: 1050,
    title: "Arena: The .format() Method",
    prompt: "Read a name and an age. Use the string .format() method (NOT an f-string) to print 'My name is {} and I am {}'.",
    starterCode: "name = input().strip()\nage = input().strip()\n# Print using .format()",
    sampleInput: "Alice\n25",
    expectedOutput: (input) => {
      const [name, age] = input.trim().split('\n');
      return `My name is ${name.trim()} and I am ${age.trim()}`;
    },
    explanation: "Before f-strings, .format() was the standard way to inject variables into strings.",
    videoTitle: "String Formatting",
    difficulty: "easy",
    testCases: [
      { input: "Alice\n25", expectedOutput: "My name is Alice and I am 25", isHidden: false, hint: "print('My name is {} and I am {}'.format(name, age))" },
      { input: "Bob\n30", expectedOutput: "My name is Bob and I am 30", isHidden: true, hint: "Ensure exact punctuation." }
    ]
  },
  {
    id: 1051,
    title: "Arena: Skipping Characters",
    prompt: "Read a string. Use slicing with a step of 2 to print every other character (starting from the first).",
    starterCode: "text = input().strip()\n# Slice with a step",
    sampleInput: "abcdef",
    expectedOutput: (input) => {
      const chars = input.trim().split('');
      return chars.filter((_, i) => i % 2 === 0).join('');
    },
    explanation: "String slicing takes a third argument for the step: text[start:stop:step].",
    videoTitle: "String Slicing",
    difficulty: "easy",
    testCases: [
      { input: "abcdef", expectedOutput: "ace", isHidden: false, hint: "Use text[::2]" },
      { input: "python", expectedOutput: "pto", isHidden: true, hint: "It should grab indexes 0, 2, 4..." }
    ]
  },
  {
    id: 1052,
    title: "Arena: Custom Separators",
    prompt: "Read three words on separate lines. Print them all on a single line separated by a hyphen '-' using the 'sep' parameter in the print() function.",
    starterCode: "w1 = input().strip()\nw2 = input().strip()\nw3 = input().strip()\n# Print with sep='-'",
    sampleInput: "apple\nbanana\ncherry",
    expectedOutput: (input) => input.trim().split('\n').map(w => w.trim()).join('-'),
    explanation: "The print function has a 'sep' parameter that defines what goes between multiple arguments.",
    videoTitle: "Print Function Tricks",
    difficulty: "easy",
    testCases: [
      { input: "apple\nbanana\ncherry", expectedOutput: "apple-banana-cherry", isHidden: false, hint: "print(w1, w2, w3, sep='-')" },
      { input: "one\ntwo\nthree", expectedOutput: "one-two-three", isHidden: true, hint: "Make sure there are no spaces around the hyphen." }
    ]
  },
  {
    id: 1053,
    title: "Arena: Sort Descending",
    prompt: "Read a space-separated list of numbers. Sort them in DESCENDING (highest to lowest) order using the .sort() method and print the list.",
    starterCode: "nums = list(map(int, input().split()))\n# Sort descending and print",
    sampleInput: "1 5 3 2",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/).map(Number).sort((a, b) => b - a);
      return `[${arr.join(', ')}]`;
    },
    explanation: "You can pass 'reverse=True' to the .sort() method to sort backwards.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "1 5 3 2", expectedOutput: "[5, 3, 2, 1]", isHidden: false, hint: "Use nums.sort(reverse=True)" },
      { input: "10 20 30", expectedOutput: "[30, 20, 10]", isHidden: true, hint: "Highest numbers must be first." }
    ]
  },
  {
    id: 1054,
    title: "Arena: Summing Dictionary Values",
    prompt: "A dictionary starts with {'apples': 10, 'bananas': 20}. Read a new integer from input and add it to the dictionary under the key 'oranges'. Print the SUM of all values in the dictionary.",
    starterCode: "fruits = {'apples': 10, 'bananas': 20}\noranges_count = int(input())\n# Add oranges, then print sum of values",
    sampleInput: "15",
    expectedOutput: (input) => String(30 + Number(input.trim())),
    explanation: "You can get all values in a dictionary using .values() and sum them with sum().",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "15", expectedOutput: "45", isHidden: false, hint: "print(sum(fruits.values()))" },
      { input: "0", expectedOutput: "30", isHidden: true, hint: "If oranges is 0, the total is 30." }
    ]
  },
  {
    id: 1055,
    title: "Arena: Is it a Digit?",
    prompt: "Read a string from input. Print 'True' if the string contains ONLY numbers, otherwise print 'False'.",
    starterCode: "text = input().strip()\n# Check if digit",
    sampleInput: "12345",
    expectedOutput: (input) => /^\d+$/.test(input.trim()) ? "True" : "False",
    explanation: "The .isdigit() method checks if all characters in a string are numbers.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "12345", expectedOutput: "True", isHidden: false, hint: "print(text.isdigit())" },
      { input: "123a", expectedOutput: "False", isHidden: true, hint: "Letters make isdigit() return False." }
    ]
  },
  {
    id: 1056,
    title: "Arena: Remove from List",
    prompt: "Read a list of words on line 1. Read a target word on line 2. Use the .remove() method to remove the target word from the list, then print the list.",
    starterCode: "words = input().split()\ntarget = input().strip()\n# Remove target and print",
    sampleInput: "apple banana cherry\nbanana",
    expectedOutput: (input) => {
      const [line1, target] = input.trim().split('\n');
      const words = line1.trim().split(/\s+/);
      const index = words.indexOf(target.trim());
      if (index !== -1) words.splice(index, 1);
      return `['${words.join("', '")}']`;
    },
    explanation: "The .remove(value) method searches for the first instance of a value and deletes it.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "apple banana cherry\nbanana", expectedOutput: "['apple', 'cherry']", isHidden: false, hint: "words.remove(target)" },
      { input: "dog cat dog\ndog", expectedOutput: "['cat', 'dog']", isHidden: true, hint: ".remove() only removes the FIRST instance it finds." }
    ]
  },
  {
    id: 1057,
    title: "Arena: Find the Index",
    prompt: "Read a string on line 1. Read a single character on line 2. Print the index (position) of the FIRST occurrence of that character in the string using .find().",
    starterCode: "text = input().strip()\nchar = input().strip()\n# Find and print index",
    sampleInput: "hello\ne",
    expectedOutput: (input) => {
      const [text, char] = input.trim().split('\n');
      return String(text.indexOf(char.trim()));
    },
    explanation: "The .find() method returns the lowest index of the substring if it is found, or -1 if not found.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "hello\ne", expectedOutput: "1", isHidden: false, hint: "print(text.find(char))" },
      { input: "banana\nz", expectedOutput: "-1", isHidden: true, hint: "If it is not found, .find() returns -1." }
    ]
  },
  {
    id: 1058,
    title: "Arena: Dictionary Default Values",
    prompt: "A dictionary of roles is provided. Read a name from input. Print their role using the .get() method. If their name is not in the dictionary, default to 'User'.",
    starterCode: "roles = {'Admin': 'System', 'Alice': 'Manager'}\nname = input().strip()\n# Get role with default",
    sampleInput: "Bob",
    expectedOutput: (input) => {
      const name = input.trim();
      return name === "Admin" ? "System" : name === "Alice" ? "Manager" : "User";
    },
    explanation: "The .get(key, default) method safely retrieves data without throwing a KeyError.",
    videoTitle: "Dictionaries",
    difficulty: "easy",
    testCases: [
      { input: "Bob", expectedOutput: "User", isHidden: false, hint: "print(roles.get(name, 'User'))" },
      { input: "Alice", expectedOutput: "Manager", isHidden: true, hint: "Existing keys should return their mapped value." }
    ]
  },
  {
    id: 1059,
    title: "Arena: Math Power",
    prompt: "Read a base and an exponent. Use math.pow() to calculate the base raised to the exponent. Note: math.pow always returns a float!",
    starterCode: "import math\nbase, exp = map(int, input().split())\n# Print the result of math.pow",
    sampleInput: "2 3",
    expectedOutput: (input) => {
      const [base, exp] = input.trim().split(/\s+/).map(Number);
      let result = Math.pow(base, exp);
      return result % 1 === 0 ? `${result}.0` : String(result);
    },
    explanation: "math.pow(x, y) acts like x**y, but specifically returns a floating-point number.",
    videoTitle: "Math Module",
    difficulty: "easy",
    testCases: [
      { input: "2 3", expectedOutput: "8.0", isHidden: false, hint: "print(math.pow(base, exp))" },
      { input: "5 2", expectedOutput: "25.0", isHidden: true, hint: "Even whole numbers return as floats (e.g., 25.0)." }
    ]
  },
  {
    id: 1060,
    title: "Arena: Title Case",
    prompt: "Read a phrase. Convert it to Title Case (where the first letter of every word is capitalized) using the .title() method, then print it.",
    starterCode: "phrase = input().strip()\n# Print in title case",
    sampleInput: "the lord of the rings",
    expectedOutput: (input) => {
      return input.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    },
    explanation: "The .title() method capitalizes the first character of each word.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "the lord of the rings", expectedOutput: "The Lord Of The Rings", isHidden: false, hint: "print(phrase.title())" },
      { input: "hello world", expectedOutput: "Hello World", isHidden: true, hint: "Both words must be capitalized." }
    ]
  },
  {
    id: 1061,
    title: "Arena: Tuple Concatenation",
    prompt: "You are given a tuple `t1 = (1, 2)`. Read an integer from input, create a new tuple containing just that integer, add the two tuples together, and print the result.",
    starterCode: "t1 = (1, 2)\nnum = int(input())\n# Add them and print",
    sampleInput: "3",
    expectedOutput: (input) => `(1, 2, ${input.trim()})`,
    explanation: "Because tuples are immutable, you can't append to them, but you CAN combine them with the + operator.",
    videoTitle: "Tuples",
    difficulty: "easy",
    testCases: [
      { input: "3", expectedOutput: "(1, 2, 3)", isHidden: false, hint: "t2 = (num,)  <-- don't forget the comma for single-item tuples!" },
      { input: "99", expectedOutput: "(1, 2, 99)", isHidden: true, hint: "Add t1 + t2." }
    ]
  },
  {
    id: 1062,
    title: "Arena: Swapcase",
    prompt: "Read a string. Swap the cases of all letters (make lowercase uppercase, and uppercase lowercase) using .swapcase().",
    starterCode: "text = input().strip()\n# Swap cases and print",
    sampleInput: "PyThOn",
    expectedOutput: (input) => {
      let swapped = "";
      for (let c of input.trim()) {
        swapped += c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      }
      return swapped;
    },
    explanation: "The .swapcase() method flips the casing of every character in a string.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      { input: "PyThOn", expectedOutput: "pYtHoN", isHidden: false, hint: "print(text.swapcase())" },
      { input: "abc DEF", expectedOutput: "ABC def", isHidden: true, hint: "Spaces are unaffected." }
    ]
  },
  {
    id: 1063,
    title: "Arena: Insert into List",
    prompt: "Read a list of strings on line 1. Read a new word on line 2. Insert that word exactly at index 1 (the second position) using the .insert() method. Print the list.",
    starterCode: "words = input().split()\nnew_word = input().strip()\n# Insert new_word at index 1 and print",
    sampleInput: "apple cherry\nbanana",
    expectedOutput: (input) => {
      const [line1, word] = input.trim().split('\n');
      const arr = line1.trim().split(/\s+/);
      arr.splice(1, 0, word.trim());
      return `['${arr.join("', '")}']`;
    },
    explanation: "The .insert(index, element) method puts an item at a specific location, shifting others to the right.",
    videoTitle: "Lists",
    difficulty: "easy",
    testCases: [
      { input: "apple cherry\nbanana", expectedOutput: "['apple', 'banana', 'cherry']", isHidden: false, hint: "words.insert(1, new_word)" },
      { input: "one two\nthree", expectedOutput: "['one', 'three', 'two']", isHidden: true, hint: "Index 1 is the second slot in the list." }
    ]
  },
  {
    id: 1064,
    title: "Arena: Check Substring",
    prompt: "Read a sentence on line 1, and a keyword on line 2. Print 'True' if the keyword is inside the sentence, otherwise 'False'.",
    starterCode: "sentence = input().strip()\nkeyword = input().strip()\n# Check if keyword is in sentence",
    sampleInput: "The quick brown fox\nbrown",
    expectedOutput: (input) => {
      const [sentence, keyword] = input.trim().split('\n');
      return sentence.includes(keyword.trim()) ? "True" : "False";
    },
    explanation: "The 'in' operator evaluates to True if a smaller string exists inside a larger string.",
    videoTitle: "Control Flow & Strings",
    difficulty: "easy",
    testCases: [
      { input: "The quick brown fox\nbrown", expectedOutput: "True", isHidden: false, hint: "print(keyword in sentence)" },
      { input: "Hello world\nplanet", expectedOutput: "False", isHidden: true, hint: "If it's not there, it prints False." }
    ]
  },
  {
    id: 1065,
    title: "Arena: Catch the Index Error",
    prompt: "A list of 3 items is provided. Read an integer representing an index. Try to print the item at that index. If the index doesn't exist, specifically catch the IndexError and print 'Out of bounds'.",
    starterCode: "items = ['a', 'b', 'c']\nidx = int(input())\ntry:\n    # Print item at idx\nexcept IndexError:\n    # Handle error",
    sampleInput: "5",
    expectedOutput: (input) => {
      const idx = Number(input.trim());
      const items = ['a', 'b', 'c'];
      return idx >= 0 && idx < 3 ? items[idx] : "Out of bounds";
    },
    explanation: "Catching IndexError prevents crashes when trying to access elements outside the length of a list.",
    videoTitle: "Error Handling",
    difficulty: "easy",
    testCases: [
      { input: "5", expectedOutput: "Out of bounds", isHidden: false, hint: "except IndexError:\n    print('Out of bounds')" },
      { input: "1", expectedOutput: "b", isHidden: true, hint: "Valid indices should print the element." }
    ]
  },
  {
    id: 1066,
    title: "Arena: Multiple Returns",
    prompt: "Define a function 'math_ops' that takes two parameters (a, b). It should return two things at once: their sum, and their difference. The starter code will unpack and print them.",
    starterCode: "def math_ops(a, b):\n    # Return sum and difference\n    pass\n\nx, y = map(int, input().split())\nres1, res2 = math_ops(x, y)\nprint(res1, res2)",
    sampleInput: "10 4",
    expectedOutput: (input) => {
      const [x, y] = input.trim().split(/\s+/).map(Number);
      return `${x + y} ${x - y}`;
    },
    explanation: "Functions in Python can return multiple values separated by commas (it automatically packs them into a tuple).",
    videoTitle: "Functions",
    difficulty: "easy",
    testCases: [
      { input: "10 4", expectedOutput: "14 6", isHidden: false, hint: "Replace 'pass' with 'return a + b, a - b'" },
      { input: "5 5", expectedOutput: "10 0", isHidden: true, hint: "Returns sum first, then difference." }
    ]
  },
  {
    id: 1067,
    title: "Arena: Length Comparison",
    prompt: "Read two words on separate lines. Print the word that has more characters. If they are equal in length, print the first one.",
    starterCode: "w1 = input().strip()\nw2 = input().strip()\n# Compare lengths and print the longest",
    sampleInput: "cat\nelephant",
    expectedOutput: (input) => {
      const [w1, w2] = input.trim().split('\n');
      return w1.trim().length >= w2.trim().length ? w1.trim() : w2.trim();
    },
    explanation: "Use len() to check string length inside an if/else conditional.",
    videoTitle: "If Statements",
    difficulty: "easy",
    testCases: [
      { input: "cat\nelephant", expectedOutput: "elephant", isHidden: false, hint: "if len(w1) >= len(w2): print(w1) else: print(w2)" },
      { input: "four\nfive", expectedOutput: "four", isHidden: true, hint: "If lengths are equal, print the first word." }
    ]
  },
  {
    id: 1068,
    title: "Arena: Filter List Comprehension",
    prompt: "Read a space-separated list of words. Use a list comprehension to create a new list containing ONLY words that have more than 3 characters. Print the list.",
    starterCode: "words = input().split()\n# Use a list comprehension with a condition",
    sampleInput: "a dog jump cat running",
    expectedOutput: (input) => {
      const words = input.trim().split(/\s+/).filter(w => w.length > 3);
      return `['${words.join("', '")}']`;
    },
    explanation: "List comprehensions can include an 'if' statement at the end to filter data.",
    videoTitle: "List Comprehension",
    difficulty: "easy",
    testCases: [
      { input: "a dog jump cat running", expectedOutput: "['jump', 'running']", isHidden: false, hint: "print([w for w in words if len(w) > 3])" },
      { input: "one two three", expectedOutput: "['three']", isHidden: true, hint: "'one' and 'two' are exactly 3, so they are filtered out." }
    ]
  },
  {
    id: 1069,
    title: "Arena: Loop Accumulator",
    prompt: "Use a while loop to continuously read integers from input using `input().strip()`. Add them to a total. Stop and break the loop when the input is '0'. Print the total.",
    starterCode: "total = 0\nwhile True:\n    val = input().strip()\n    # Break if '0', else add to total\nprint(total)",
    sampleInput: "5\n10\n-2\n0",
    expectedOutput: (input) => {
      const lines = input.trim().split('\n');
      let sum = 0;
      for (let val of lines) {
        if (val.trim() === '0') break;
        sum += Number(val.trim());
      }
      return String(sum);
    },
    explanation: "A standard pattern for stream processing: looping indefinitely until a specific termination signal (like '0') is received.",
    videoTitle: "While Loops",
    difficulty: "easy",
    testCases: [
      { input: "5\n10\n-2\n0", expectedOutput: "13", isHidden: false, hint: "if val == '0': break\nelse: total += int(val)" },
      { input: "0", expectedOutput: "0", isHidden: true, hint: "If the first number is 0, the total is 0." }
    ]
  },
  {
    id: 1070,
    title: "Arena: Multiple Variable Assignment",
    prompt: "Read a single word. Assign this word to three different variables (a, b, and c) all on one line. Print them separated by commas.",
    starterCode: "word = input().strip()\n# Assign a, b, c in one line\nprint(a, b, c, sep=', ')",
    sampleInput: "Echo",
    expectedOutput: (input) => {
      const w = input.trim();
      return `${w}, ${w}, ${w}`;
    },
    explanation: "Python allows chained assignment: a = b = c = value.",
    videoTitle: "Variables and Assignment",
    difficulty: "easy",
    testCases: [
      { input: "Echo", expectedOutput: "Echo, Echo, Echo", isHidden: false, hint: "a = b = c = word" },
      { input: "Yes", expectedOutput: "Yes, Yes, Yes", isHidden: true, hint: "Variables should hold the same exact value." }
    ]
  }
];

// ==========================================
// INTERMEDIATE ARENA CHALLENGES (Leetcode-Esque)
// ==========================================
export const intermediateArenaChallenges: Challenge[] = [
  {
    id: 2001,
    title: "Arena: Bubble Sort",
    prompt: "Read a space-separated list of integers. Sort them in ascending order using the Bubble Sort algorithm logic and print the array.",
    starterCode: "nums = list(map(int, input().split()))\n# Sort and print",
    sampleInput: "5 2 9 1 5 6",
    expectedOutput: (input) => `[${input.trim().split(/\s+/).map(Number).sort((a,b)=>a-b).join(', ')}]`,
    explanation: "Sorting algorithms rely on swapping adjacent elements.",
    videoTitle: "Sorting Algorithms",
    difficulty: "medium",
    testCases: [
      { input: "5 2 9 1 5 6", expectedOutput: "[1, 2, 5, 5, 6, 9]", isHidden: false, hint: "Sort the list ascending!" },
      { input: "10 9 8 7", expectedOutput: "[7, 8, 9, 10]", isHidden: true, hint: "Reverse ordered inputs." }
    ]
  },
  {
    id: 2002,
    title: "Arena: Two Sum (Simplified)",
    prompt: "Line 1: Target number. Line 2: Space separated numbers. Print 'True' if two distinct numbers in the list add up to the target, else 'False'.",
    starterCode: "target = int(input())\nnums = list(map(int, input().split()))\n",
    sampleInput: "10\n3 4 7 8",
    expectedOutput: (input) => {
      const lines = input.trim().split('\n');
      const target = Number(lines[0]);
      const nums = lines[1].split(/\s+/).map(Number);
      for(let i=0; i<nums.length; i++) {
        for(let j=i+1; j<nums.length; j++) {
          if (nums[i] + nums[j] === target) return "True";
        }
      }
      return "False";
    },
    explanation: "Two pointer or nested loop logic to find a sum pair.",
    videoTitle: "Two Sum Pattern",
    difficulty: "medium",
    testCases: [
      { input: "10\n3 4 7 8", expectedOutput: "True", isHidden: false, hint: "3 + 7 = 10" },
      { input: "10\n3 4 5 8", expectedOutput: "False", isHidden: true, hint: "No two numbers add to 10" }
    ]
  },
  {
    id: 2003,
    title: "Arena: Valid Palindrome",
    prompt: "Read a string. Print 'True' if it reads the same forwards and backwards (case-sensitive, ignore spaces), else 'False'.",
    starterCode: "text = input().replace(' ', '')\n# Check if palindrome",
    sampleInput: "racecar",
    expectedOutput: (input) => {
      const str = input.trim().replace(/\s+/g, '');
      const rev = str.split('').reverse().join('');
      return str === rev ? "True" : "False";
    },
    explanation: "Compare string to its reversed slice [::-1].",
    videoTitle: "String Manipulation",
    difficulty: "medium",
    testCases: [
      { input: "racecar", expectedOutput: "True", isHidden: false, hint: "text == text[::-1]" },
      { input: "hello", expectedOutput: "False", isHidden: true, hint: "hello is not olleh" },
      { input: "nurses run", expectedOutput: "True", isHidden: true, hint: "Remember to ignore spaces!" }
    ]
  },
  {
    id: 2004,
    title: "Arena: Contains Duplicate",
    prompt: "Read a space-separated list of integers. Print 'True' if any value appears at least twice, and 'False' if every element is distinct.",
    starterCode: "nums = input().split()\n# Check for duplicates",
    sampleInput: "1 2 3 1",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/);
      const set = new Set(arr);
      return arr.length !== set.size ? "True" : "False";
    },
    explanation: "Sets inherently remove duplicates. Compare lengths.",
    videoTitle: "Hash Sets",
    difficulty: "medium",
    testCases: [
      { input: "1 2 3 1", expectedOutput: "True", isHidden: false, hint: "Compare len(nums) to len(set(nums))" },
      { input: "1 2 3 4", expectedOutput: "False", isHidden: true, hint: "All distinct returns False" }
    ]
  },
  {
    id: 2005,
    title: "Arena: Insertion Sort",
    prompt: "Implement the Insertion Sort algorithm to sort an input list of numbers in ascending order. Print the sorted list.",
    starterCode: "nums = list(map(int, input().split()))\n# Sort via insertion logic",
    sampleInput: "12 11 13 5 6",
    expectedOutput: (input) => `[${input.trim().split(/\s+/).map(Number).sort((a,b)=>a-b).join(', ')}]`,
    explanation: "Builds the final sorted array one item at a time.",
    videoTitle: "Sorting Algorithms",
    difficulty: "medium",
    testCases: [
      { input: "12 11 13 5 6", expectedOutput: "[5, 6, 11, 12, 13]", isHidden: false, hint: "Print the sorted list." },
      { input: "3 1 2", expectedOutput: "[1, 2, 3]", isHidden: true, hint: "Sort ascending." }
    ]
  },
  {
    id: 2006,
    title: "Arena: Find Maximum",
    prompt: "Find the maximum number in a list WITHOUT using the built-in max() function. Print the maximum number.",
    starterCode: "nums = list(map(int, input().split()))\nbiggest = nums[0]\n# Loop and update biggest",
    sampleInput: "4 1 9 3",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/).map(Number);
      return String(Math.max(...arr));
    },
    explanation: "Iterate through the array updating a tracking variable.",
    videoTitle: "Array Iteration",
    difficulty: "medium",
    testCases: [
      { input: "4 1 9 3", expectedOutput: "9", isHidden: false, hint: "Update biggest if current number is larger." },
      { input: "-5 -1 -10", expectedOutput: "-1", isHidden: true, hint: "Careful with negative numbers!" }
    ]
  },
  {
    id: 2007,
    title: "Arena: Valid Anagram",
    prompt: "Read two lines of strings. Print 'True' if they are anagrams (contain the exact same letters in different orders), else 'False'.",
    starterCode: "s1 = input().strip()\ns2 = input().strip()\n# Check anagram",
    sampleInput: "listen\nsilent",
    expectedOutput: (input) => {
      const [s1, s2] = input.trim().split("\n");
      const sort1 = s1.split('').sort().join('');
      const sort2 = s2.split('').sort().join('');
      return sort1 === sort2 ? "True" : "False";
    },
    explanation: "Sorting both strings makes anagrams identical.",
    videoTitle: "String Algorithms",
    difficulty: "medium",
    testCases: [
      { input: "listen\nsilent", expectedOutput: "True", isHidden: false, hint: "Sorted 'listen' == sorted 'silent'" },
      { input: "rat\ncar", expectedOutput: "False", isHidden: true, hint: "Not anagrams." }
    ]
  },
  {
    id: 2008,
    title: "Arena: Fibonacci Sequence",
    prompt: "Read a number N. Print the Nth number in the Fibonacci sequence (where N=0 is 0, N=1 is 1).",
    starterCode: "n = int(input())\n# Calculate Fibonacci",
    sampleInput: "5",
    expectedOutput: (input) => {
      const n = Number(input.trim());
      if (n === 0) return "0";
      if (n === 1) return "1";
      let a = 0, b = 1;
      for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
      }
      return String(b);
    },
    explanation: "Dynamic programming base case logic.",
    videoTitle: "Dynamic Programming Basics",
    difficulty: "medium",
    testCases: [
      { input: "5", expectedOutput: "5", isHidden: false, hint: "Fib: 0, 1, 1, 2, 3, 5" },
      { input: "7", expectedOutput: "13", isHidden: true, hint: "Keep summing the previous two numbers." }
    ]
  },
  {
    id: 2009,
    title: "Arena: Missing Number",
    prompt: "You are given a space-separated array containing N distinct numbers taken from 0, 1, 2, ..., N. Find the one missing number and print it.",
    starterCode: "nums = list(map(int, input().split()))\n# Find missing",
    sampleInput: "3 0 1",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/).map(Number);
      const n = arr.length;
      const expectedSum = (n * (n + 1)) / 2;
      const actualSum = arr.reduce((a, b) => a + b, 0);
      return String(expectedSum - actualSum);
    },
    explanation: "Math logic: Expected Sum - Actual Sum = Missing Number.",
    videoTitle: "Mathematical Optimization",
    difficulty: "medium",
    testCases: [
      { input: "3 0 1", expectedOutput: "2", isHidden: false, hint: "Sum of 0..3 is 6. Array sum is 4. Missing is 2." },
      { input: "0 1 2 4 5", expectedOutput: "3", isHidden: true, hint: "Array length is 5, max num is 5." }
    ]
  },
  {
    id: 2010,
    title: "Arena: Power of Two",
    prompt: "Read a number. Print 'True' if it is a power of two, otherwise 'False'.",
    starterCode: "n = int(input())\n# Check power of two",
    sampleInput: "16",
    expectedOutput: (input) => {
      const n = Number(input.trim());
      if (n <= 0) return "False";
      return (n & (n - 1)) === 0 ? "True" : "False";
    },
    explanation: "Bitwise operations or repeated division by 2.",
    videoTitle: "Bitwise Operators",
    difficulty: "medium",
    testCases: [
      { input: "16", expectedOutput: "True", isHidden: false, hint: "16 is 2^4." },
      { input: "3", expectedOutput: "False", isHidden: true, hint: "3 is not a power of two." },
      { input: "0", expectedOutput: "False", isHidden: true, hint: "0 is not a power of two." }
    ]
  },
  {
    id: 2011,
    title: "Arena: Majority Element",
    prompt: "Given a space-separated list of numbers, find the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
    starterCode: "nums = input().split()\n# Find and print the majority element",
    sampleInput: "3 2 3",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/);
      let count = 0;
      let candidate = "";
      for (let num of arr) {
        if (count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
      }
      return candidate;
    },
    explanation: "You can solve this using a dictionary to count frequencies, or the optimal Boyer-Moore Voting Algorithm.",
    videoTitle: "Hash Maps & Frequencies",
    difficulty: "medium",
    testCases: [
      { input: "3 2 3", expectedOutput: "3", isHidden: false, hint: "3 appears twice, 2 appears once." },
      { input: "2 2 1 1 1 2 2", expectedOutput: "2", isHidden: true, hint: "2 appears 4 times, 1 appears 3 times." }
    ]
  },
  {
    id: 2012,
    title: "Arena: Move Zeroes",
    prompt: "Given an array of space-separated integers, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Print the resulting list.",
    starterCode: "nums = input().split()\n# Move zeroes to the end",
    sampleInput: "0 1 0 3 12",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/);
      const nonZeroes = nums.filter(n => n !== "0");
      const zeroes = nums.filter(n => n === "0");
      return `['${nonZeroes.concat(zeroes).join("', '")}']`;
    },
    explanation: "Use a two-pointer approach or filter out the non-zeroes and append the zeroes at the end.",
    videoTitle: "Two Pointer Technique",
    difficulty: "medium",
    testCases: [
      { input: "0 1 0 3 12", expectedOutput: "['1', '3', '12', '0', '0']", isHidden: false, hint: "Keep 1, 3, 12 in order, push zeroes back." },
      { input: "0", expectedOutput: "['0']", isHidden: true, hint: "A single zero should just return [0]." }
    ]
  },
  {
    id: 2013,
    title: "Arena: Reverse Vowels",
    prompt: "Given a string, reverse only all the vowels in the string and return it. The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases.",
    starterCode: "s = input().strip()\n# Reverse the vowels",
    sampleInput: "hello",
    expectedOutput: (input) => {
      const chars = input.trim().split("");
      const vowels = "aeiouAEIOU";
      let i = 0, j = chars.length - 1;
      while (i < j) {
        if (!vowels.includes(chars[i])) i++;
        else if (!vowels.includes(chars[j])) j--;
        else {
          [chars[i], chars[j]] = [chars[j], chars[i]];
          i++; j--;
        }
      }
      return chars.join("");
    },
    explanation: "Use two pointers—one starting from the left, one from the right—swapping when both point to vowels.",
    videoTitle: "Two Pointers on Strings",
    difficulty: "medium",
    testCases: [
      { input: "hello", expectedOutput: "holle", isHidden: false, hint: "Swap the 'e' and 'o'." },
      { input: "leetcode", expectedOutput: "leotcede", isHidden: true, hint: "Make sure it handles multiple vowels." }
    ]
  },
  {
    id: 2014,
    title: "Arena: Intersection of Arrays",
    prompt: "Read two lines of space-separated arrays. Compute their intersection. Each element in the result must be unique. Print the resulting list sorted in ascending order.",
    starterCode: "nums1 = list(map(int, input().split()))\nnums2 = list(map(int, input().split()))\n# Find unique intersection",
    sampleInput: "1 2 2 1\n2 2",
    expectedOutput: (input) => {
      const [line1, line2] = input.trim().split("\n");
      const set1 = new Set(line1.trim().split(/\s+/).map(Number));
      const set2 = new Set(line2.trim().split(/\s+/).map(Number));
      const intersection = [...set1].filter(x => set2.has(x)).sort((a,b) => a-b);
      return `[${intersection.join(", ")}]`;
    },
    explanation: "Convert both lists to Sets to remove duplicates, then find the overlapping elements.",
    videoTitle: "Sets & Intersections",
    difficulty: "medium",
    testCases: [
      { input: "1 2 2 1\n2 2", expectedOutput: "[2]", isHidden: false, hint: "Both arrays share the number 2." },
      { input: "4 9 5\n9 4 9 8 4", expectedOutput: "[4, 9]", isHidden: true, hint: "Result must be sorted!" }
    ]
  },
  {
    id: 2015,
    title: "Arena: First Unique Character",
    prompt: "Given a string, find the first non-repeating character in it and print its index. If it does not exist, print -1.",
    starterCode: "s = input().strip()\n# Find first unique character index",
    sampleInput: "leetcode",
    expectedOutput: (input) => {
      const s = input.trim();
      for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return String(i);
      }
      return "-1";
    },
    explanation: "Count character frequencies first. Then iterate through the string to find the first character with a count of 1.",
    videoTitle: "Hash Maps & Frequencies",
    difficulty: "medium",
    testCases: [
      { input: "leetcode", expectedOutput: "0", isHidden: false, hint: "'l' is the first character that only appears once (index 0)." },
      { input: "aabb", expectedOutput: "-1", isHidden: true, hint: "No unique characters exist, so return -1." }
    ]
  },
  {
    id: 2016,
    title: "Arena: Isomorphic Strings",
    prompt: "Given two strings on separate lines, determine if they are isomorphic. Two strings are isomorphic if the characters in s can be replaced to get t. Print 'True' or 'False'.",
    starterCode: "s = input().strip()\nt = input().strip()\n# Check if isomorphic",
    sampleInput: "egg\nadd",
    expectedOutput: (input) => {
      const [s, t] = input.trim().split("\n");
      if (s.length !== t.length) return "False";
      const mapS = new Map(), mapT = new Map();
      for (let i = 0; i < s.length; i++) {
        if ((mapS.has(s[i]) && mapS.get(s[i]) !== t[i]) || (mapT.has(t[i]) && mapT.get(t[i]) !== s[i])) return "False";
        mapS.set(s[i], t[i]);
        mapT.set(t[i], s[i]);
      }
      return "True";
    },
    explanation: "Use two dictionaries to map characters from s to t and from t to s simultaneously to ensure a 1-to-1 relationship.",
    videoTitle: "Dictionary Mapping",
    difficulty: "medium",
    testCases: [
      { input: "egg\nadd", expectedOutput: "True", isHidden: false, hint: "'e' maps to 'a', 'g' maps to 'd'." },
      { input: "foo\nbar", expectedOutput: "False", isHidden: true, hint: "'o' cannot map to both 'a' and 'r'." }
    ]
  },
  {
    id: 2017,
    title: "Arena: Length of Last Word",
    prompt: "Given a string consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters.",
    starterCode: "s = input().strip()\n# Print length of last word",
    sampleInput: "Hello World",
    expectedOutput: (input) => {
      const words = input.trim().split(/\s+/);
      return String(words[words.length - 1].length);
    },
    explanation: "Strip the trailing spaces, split the string by spaces, and take the length of the final element.",
    videoTitle: "String Parsing",
    difficulty: "medium",
    testCases: [
      { input: "Hello World", expectedOutput: "5", isHidden: false, hint: "The last word is 'World', length 5." },
      { input: "   fly me   to   the moon  ", expectedOutput: "4", isHidden: true, hint: "Strip the string before splitting!" }
    ]
  },
  {
    id: 2018,
    title: "Arena: Plus One",
    prompt: "You are given a space-separated array representing a large integer. Increment the large integer by one and return the resulting array.",
    starterCode: "digits = list(map(int, input().split()))\n# Add 1 and print array",
    sampleInput: "1 2 3",
    expectedOutput: (input) => {
      const numStr = input.trim().split(/\s+/).join('');
      const plusOne = (BigInt(numStr) + 1n).toString().split('');
      return `[${plusOne.join(", ")}]`;
    },
    explanation: "Traverse the array from right to left. Handle the 'carry' if a digit is 9 turning into 10.",
    videoTitle: "Array Mathematics",
    difficulty: "medium",
    testCases: [
      { input: "1 2 3", expectedOutput: "[1, 2, 4]", isHidden: false, hint: "123 + 1 = 124" },
      { input: "9 9 9", expectedOutput: "[1, 0, 0, 0]", isHidden: true, hint: "Handle carrying the 1 to a new array length!" }
    ]
  },
  {
    id: 2019,
    title: "Arena: Single Number",
    prompt: "Given a non-empty list of integers, every element appears twice except for one. Find that single one and print it.",
    starterCode: "nums = input().split()\n# Find the single number",
    sampleInput: "4 1 2 1 2",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/);
      let res = 0;
      for (let n of nums) res ^= Number(n);
      return String(res);
    },
    explanation: "You can use a Hash Set, or use the bitwise XOR operator (^) where identical numbers cancel each other out to 0.",
    videoTitle: "Bitwise XOR & Hash Sets",
    difficulty: "medium",
    testCases: [
      { input: "4 1 2 1 2", expectedOutput: "4", isHidden: false, hint: "4 is the only number without a pair." },
      { input: "2 2 1", expectedOutput: "1", isHidden: true, hint: "Find the single element." }
    ]
  },
  {
    id: 2020,
    title: "Arena: Valid Parentheses",
    prompt: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid (brackets closed in correct order). Print 'True' or 'False'.",
    starterCode: "s = input().strip()\n# Check validity",
    sampleInput: "()[]{}",
    expectedOutput: (input) => {
      const s = input.trim();
      const stack = [];
      const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
      for (let char of s) {
        if (Object.values(map).includes(char)) stack.push(char);
        else if (stack.pop() !== map[char]) return "False";
      }
      return stack.length === 0 ? "True" : "False";
    },
    explanation: "Use a Stack (a Python list). Push opening brackets. When seeing a closing bracket, pop the stack and check if it matches.",
    videoTitle: "Stack Data Structure",
    difficulty: "medium",
    testCases: [
      { input: "()[]{}", expectedOutput: "True", isHidden: false, hint: "Use a list as a stack. Push on '(', pop on ')'." },
      { input: "(]", expectedOutput: "False", isHidden: true, hint: "Mismatched brackets!" },
      { input: "([)]", expectedOutput: "False", isHidden: true, hint: "Wrong closing order." }
    ]
  },
  {
    id: 2021,
    title: "Arena: Search Insert Position",
    prompt: "Line 1: A sorted space-separated array. Line 2: A target value. Print the index if the target is found. If not, print the index where it would be if it were inserted in order.",
    starterCode: "nums = list(map(int, input().split()))\ntarget = int(input())\n# Find insert position",
    sampleInput: "1 3 5 6\n5",
    expectedOutput: (input) => {
      const [arrLine, targetLine] = input.trim().split("\n");
      const nums = arrLine.trim().split(/\s+/).map(Number);
      const target = Number(targetLine);
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) return String(i);
      }
      return String(nums.length);
    },
    explanation: "Binary Search is optimal (O(log n)), but a linear scan (O(n)) returning the first index where num >= target also works.",
    videoTitle: "Binary Search Basics",
    difficulty: "medium",
    testCases: [
      { input: "1 3 5 6\n5", expectedOutput: "2", isHidden: false, hint: "5 is found at index 2." },
      { input: "1 3 5 6\n2", expectedOutput: "1", isHidden: true, hint: "2 would be inserted between 1 and 3 (index 1)." }
    ]
  },
  {
    id: 2022,
    title: "Arena: Best Time to Buy Stock",
    prompt: "You are given an array of prices where prices[i] is the price of a given stock on the ith day. Maximize profit by choosing a single day to buy and a different day in the future to sell. Print the max profit.",
    starterCode: "prices = list(map(int, input().split()))\n# Calculate max profit",
    sampleInput: "7 1 5 3 6 4",
    expectedOutput: (input) => {
      const prices = input.trim().split(/\s+/).map(Number);
      let minPrice = Infinity;
      let maxProfit = 0;
      for (let p of prices) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
      }
      return String(maxProfit);
    },
    explanation: "Iterate once. Keep track of the minimum price seen so far, and the maximum profit you could get by selling at the current price.",
    videoTitle: "Sliding Window / Trackers",
    difficulty: "medium",
    testCases: [
      { input: "7 1 5 3 6 4", expectedOutput: "5", isHidden: false, hint: "Buy on day 2 (price 1) and sell on day 5 (price 6)." },
      { input: "7 6 4 3 1", expectedOutput: "0", isHidden: true, hint: "If no profit can be made, return 0." }
    ]
  },
  {
    id: 2023,
    title: "Arena: Climbing Stairs",
    prompt: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. Read n, and print how many distinct ways you can climb to the top.",
    starterCode: "n = int(input())\n# Calculate distinct ways",
    sampleInput: "3",
    expectedOutput: (input) => {
      const n = Number(input.trim());
      if (n <= 2) return String(n);
      let a = 1, b = 2;
      for (let i = 3; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
      }
      return String(b);
    },
    explanation: "This is a Fibonacci sequence in disguise! To reach step N, you came from either N-1 or N-2.",
    videoTitle: "Dynamic Programming Concepts",
    difficulty: "medium",
    testCases: [
      { input: "3", expectedOutput: "3", isHidden: false, hint: "Ways: (1,1,1), (1,2), (2,1)." },
      { input: "5", expectedOutput: "8", isHidden: true, hint: "Calculate the Fibonacci sequence." }
    ]
  },
  {
    id: 2024,
    title: "Arena: Find the Difference",
    prompt: "You are given two strings s and t. String t is generated by randomizing s and adding one more letter. Find the letter that was added and print it.",
    starterCode: "s = input().strip()\nt = input().strip()\n# Find the extra character",
    sampleInput: "abcd\nabcde",
    expectedOutput: (input) => {
      const [s, t] = input.trim().split("\n");
      const map = new Map();
      for (let char of s) map.set(char, (map.get(char) || 0) + 1);
      for (let char of t) {
        if (!map.has(char) || map.get(char) === 0) return char;
        map.set(char, map.get(char) - 1);
      }
      return "";
    },
    explanation: "Count characters in s, then subtract characters in t. The one that drops below 0 is the extra letter.",
    videoTitle: "Hash Maps & Frequencies",
    difficulty: "medium",
    testCases: [
      { input: "abcd\nabcde", expectedOutput: "e", isHidden: false, hint: "Count the letters in s, subtract from t." },
      { input: "a\naa", expectedOutput: "a", isHidden: true, hint: "Handle duplicates properly!" }
    ]
  },
  {
    id: 2025,
    title: "Arena: Ransom Note",
    prompt: "Given two strings ransomNote and magazine on separate lines, print 'True' if ransomNote can be constructed by using letters from magazine, else 'False'. Each letter in magazine can only be used once.",
    starterCode: "note = input().strip()\nmag = input().strip()\n# Check if possible",
    sampleInput: "aa\naab",
    expectedOutput: (input) => {
      const [note, mag] = input.trim().split("\n");
      const map = new Map();
      for (let char of mag) map.set(char, (map.get(char) || 0) + 1);
      for (let char of note) {
        if (!map.has(char) || map.get(char) === 0) return "False";
        map.set(char, map.get(char) - 1);
      }
      return "True";
    },
    explanation: "Build a frequency dictionary of the magazine. Then iterate through the note and decrement. If you run out, return False.",
    videoTitle: "Hash Maps & Frequencies",
    difficulty: "medium",
    testCases: [
      { input: "aa\naab", expectedOutput: "True", isHidden: false, hint: "Magazine has two 'a's, which is enough." },
      { input: "aa\nab", expectedOutput: "False", isHidden: true, hint: "Magazine only has one 'a', so it fails." }
    ]
  },
  {
    id: 2026,
    title: "Arena: Third Maximum",
    prompt: "Given a space-separated integer array, print the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.",
    starterCode: "nums = list(map(int, input().split()))\n# Find third max",
    sampleInput: "3 2 1",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      const unique = Array.from(new Set(nums)).sort((a,b) => b-a);
      return unique.length >= 3 ? String(unique[2]) : String(unique[0]);
    },
    explanation: "Convert the list to a Set to remove duplicates, sort it in descending order, and pick index 2 (or index 0 if length < 3).",
    videoTitle: "Sets and Sorting",
    difficulty: "medium",
    testCases: [
      { input: "3 2 1", expectedOutput: "1", isHidden: false, hint: "Remove duplicates, sort descending, grab the third item." },
      { input: "1 2", expectedOutput: "2", isHidden: true, hint: "If there are less than 3 distinct, return the max." },
      { input: "2 2 3 1", expectedOutput: "1", isHidden: true, hint: "Both 2s count as the SAME distinct number." }
    ]
  },
  {
    id: 2027,
    title: "Arena: Add Digits",
    prompt: "Given an integer, repeatedly add all its digits until the result has only one digit, and return it.",
    starterCode: "num = int(input())\n# Sum digits until single digit",
    sampleInput: "38",
    expectedOutput: (input) => {
      let num = Number(input.trim());
      if (num === 0) return "0";
      return String(num % 9 === 0 ? 9 : num % 9);
    },
    explanation: "You can use a while loop converting the number to a string and summing, or use the O(1) digital root math trick: num % 9.",
    videoTitle: "Loops / Digital Roots",
    difficulty: "medium",
    testCases: [
      { input: "38", expectedOutput: "2", isHidden: false, hint: "3 + 8 = 11. Then 1 + 1 = 2." },
      { input: "0", expectedOutput: "0", isHidden: true, hint: "0 should just return 0." }
    ]
  },
  {
    id: 2028,
    title: "Arena: Ugly Number",
    prompt: "An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5. Read a number and print 'True' if it is ugly, else 'False'.",
    starterCode: "n = int(input())\n# Check if ugly",
    sampleInput: "6",
    expectedOutput: (input) => {
      let n = Number(input.trim());
      if (n <= 0) return "False";
      for (let p of [2, 3, 5]) {
        while (n % p === 0) n /= p;
      }
      return n === 1 ? "True" : "False";
    },
    explanation: "Keep dividing the number by 2, 3, and 5 as long as there is no remainder. If you are left with 1, it's ugly.",
    videoTitle: "Loops & Factoring",
    difficulty: "medium",
    testCases: [
      { input: "6", expectedOutput: "True", isHidden: false, hint: "6 = 2 * 3. Both are allowed factors." },
      { input: "14", expectedOutput: "False", isHidden: true, hint: "14 includes the prime factor 7, which is not allowed." }
    ]
  },
  {
    id: 2029,
    title: "Arena: Reverse Words",
    prompt: "Given a string, reverse the order of the words. A word is defined as a sequence of non-space characters. Print the reversed string with a single space between words.",
    starterCode: "s = input().strip()\n# Reverse words",
    sampleInput: "the sky is blue",
    expectedOutput: (input) => {
      const words = input.trim().split(/\s+/);
      return words.reverse().join(" ");
    },
    explanation: "Split the string into a list of words, reverse the list, and join it back together with spaces.",
    videoTitle: "String Parsing",
    difficulty: "medium",
    testCases: [
      { input: "the sky is blue", expectedOutput: "blue is sky the", isHidden: false, hint: "Use text.split(), reverse the list, then ' '.join()" },
      { input: "  hello world  ", expectedOutput: "world hello", isHidden: true, hint: "Make sure extra spaces are handled!" }
    ]
  },
  {
    id: 2030,
    title: "Arena: Longest Common Prefix",
    prompt: "Given a space-separated array of strings, find the longest common prefix string amongst them. If there is no common prefix, return an empty string (print nothing).",
    starterCode: "strs = input().split()\n# Find common prefix",
    sampleInput: "flower flow flight",
    expectedOutput: (input) => {
      const strs = input.trim().split(/\s+/);
      if (strs.length === 0) return "";
      let prefix = strs[0];
      for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
          prefix = prefix.substring(0, prefix.length - 1);
          if (prefix === "") return "";
        }
      }
      return prefix;
    },
    explanation: "Compare the first word with the second, shrinking the prefix until it matches. Then compare with the third, etc.",
    videoTitle: "String Alignment",
    difficulty: "medium",
    testCases: [
      { input: "flower flow flight", expectedOutput: "fl", isHidden: false, hint: "They all start with 'fl'." },
      { input: "dog racecar car", expectedOutput: "", isHidden: true, hint: "No common prefix, print nothing." }
    ]
  },
  {
    id: 2031,
    title: "Arena: Running Sum of 1D Array",
    prompt: "Given an array of space-separated numbers, return the running sum where runningSum[i] = sum(nums[0]…nums[i]). Print the resulting array.",
    starterCode: "nums = list(map(int, input().split()))\n# Calculate running sum",
    sampleInput: "1 2 3 4",
    expectedOutput: (input) => {
      const arr = input.trim().split(/\s+/).map(Number);
      let sum = 0;
      return `[${arr.map(n => sum += n).join(', ')}]`;
    },
    explanation: "Iterate through the array, adding the current number to a running total, and store that total.",
    videoTitle: "Prefix Sum Patterns",
    difficulty: "medium",
    testCases: [
      { input: "1 2 3 4", expectedOutput: "[1, 3, 6, 10]", isHidden: false, hint: "Keep a running total variable as you loop." },
      { input: "1 1 1 1 1", expectedOutput: "[1, 2, 3, 4, 5]", isHidden: true, hint: "Each element is the sum of all previous elements." }
    ]
  },
  {
    id: 2032,
    title: "Arena: Squares of a Sorted Array",
    prompt: "Given an integer array sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    starterCode: "nums = list(map(int, input().split()))\n# Square and sort",
    sampleInput: "-4 -1 0 3 10",
    expectedOutput: (input) => {
      const sortedSquares = input.trim().split(/\s+/).map(Number).map(n => n * n).sort((a,b) => a - b);
      return `[${sortedSquares.join(', ')}]`;
    },
    explanation: "You can square each element and sort, or use two pointers from the outside in to sort in O(N).",
    videoTitle: "Two Pointers Technique",
    difficulty: "medium",
    testCases: [
      { input: "-4 -1 0 3 10", expectedOutput: "[0, 1, 9, 16, 100]", isHidden: false, hint: "Square them all, then sort ascending." },
      { input: "-7 -3 2 3 11", expectedOutput: "[4, 9, 9, 49, 121]", isHidden: true, hint: "Negatives become large positive squares!" }
    ]
  },
  {
    id: 2033,
    title: "Arena: Valid Palindrome II",
    prompt: "Given a string, print 'True' if it can be a palindrome after deleting at most ONE character from it. Otherwise print 'False'.",
    starterCode: "s = input().strip()\n# Check if valid palindrome with 1 deletion",
    sampleInput: "abca",
    expectedOutput: (input) => {
      const s = input.trim();
      let l = 0, r = s.length - 1;
      const isPalin = (str: string, i: number, j: number) => {
        while (i < j) {
          if (str[i] !== str[j]) return false;
          i++; j--;
        }
        return true;
      };
      while (l < r) {
        if (s[l] !== s[r]) {
          return (isPalin(s, l + 1, r) || isPalin(s, l, r - 1)) ? "True" : "False";
        }
        l++; r--;
      }
      return "True";
    },
    explanation: "When a mismatch occurs using two pointers, check if skipping the left character OR the right character creates a valid palindrome.",
    videoTitle: "String Manipulation",
    difficulty: "medium",
    testCases: [
      { input: "abca", expectedOutput: "True", isHidden: false, hint: "You can delete 'c' to get 'aba'." },
      { input: "abc", expectedOutput: "False", isHidden: true, hint: "Deleting one character doesn't help here." }
    ]
  },
  {
    id: 2034,
    title: "Arena: Remove Adjacent Duplicates",
    prompt: "Given a string, repeatedly remove adjacent duplicate letters until no more duplicates can be removed. Print the final string.",
    starterCode: "s = input().strip()\n# Remove adjacent duplicates",
    sampleInput: "abbaca",
    expectedOutput: (input) => {
      const stack: string[] = [];
      for (const char of input.trim()) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      }
      return stack.join('');
    },
    explanation: "A stack is perfect for this! Push characters to a list. If the incoming character matches the top of the stack, pop it instead.",
    videoTitle: "Stack Data Structure",
    difficulty: "medium",
    testCases: [
      { input: "abbaca", expectedOutput: "ca", isHidden: false, hint: "Remove 'bb', string becomes 'aaca'. Remove 'aa', leaving 'ca'." },
      { input: "azxxzy", expectedOutput: "ay", isHidden: true, hint: "Stack helps resolve cascading duplicates." }
    ]
  },
  {
    id: 2035,
    title: "Arena: Roman to Integer",
    prompt: "Given a Roman numeral string, convert it to an integer. Example: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.",
    starterCode: "s = input().strip()\n# Convert Roman to Integer",
    sampleInput: "MCMXCIV",
    expectedOutput: (input) => {
      const roman: Record<string, number> = { 'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000 };
      let sum = 0;
      const s = input.trim();
      for(let i=0; i<s.length; i++) {
        if (i < s.length - 1 && roman[s[i]] < roman[s[i+1]]) {
          sum -= roman[s[i]];
        } else {
          sum += roman[s[i]];
        }
      }
      return String(sum);
    },
    explanation: "If a smaller numeral appears before a larger one, subtract it (e.g., IV = 5 - 1). Otherwise, add it.",
    videoTitle: "Hash Maps & Math",
    difficulty: "medium",
    testCases: [
      { input: "MCMXCIV", expectedOutput: "1994", isHidden: false, hint: "M=1000, CM=900, XC=90, IV=4." },
      { input: "LVIII", expectedOutput: "58", isHidden: true, hint: "L=50, V=5, III=3." }
    ]
  },
  {
    id: 2036,
    title: "Arena: Happy Number",
    prompt: "A happy number replaces itself with the sum of the squares of its digits until it equals 1, or loops endlessly. Print 'True' if it's happy, else 'False'.",
    starterCode: "n = int(input())\n# Check if happy",
    sampleInput: "19",
    expectedOutput: (input) => {
      let n = Number(input.trim());
      const seen = new Set();
      while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = String(n).split('').reduce((sum, digit) => sum + Math.pow(Number(digit), 2), 0);
      }
      return n === 1 ? "True" : "False";
    },
    explanation: "Use a Set to keep track of numbers you've seen to detect infinite loops.",
    videoTitle: "Hash Sets & Math",
    difficulty: "medium",
    testCases: [
      { input: "19", expectedOutput: "True", isHidden: false, hint: "1^2 + 9^2 = 82 -> 8^2 + 2^2 = 68 -> ... = 1." },
      { input: "2", expectedOutput: "False", isHidden: true, hint: "2 ends up in an endless cycle!" }
    ]
  },
  {
    id: 2037,
    title: "Arena: Is Subsequence",
    prompt: "Given two strings (s on line 1, t on line 2), print 'True' if s is a subsequence of t, or 'False' otherwise.",
    starterCode: "s = input().strip()\nt = input().strip()\n# Check subsequence",
    sampleInput: "abc\nahbgdc",
    expectedOutput: (input) => {
      const [s, t] = input.trim().split('\n');
      let i = 0, j = 0;
      while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
      }
      return i === s.length ? "True" : "False";
    },
    explanation: "Use a two-pointer approach to scan through 't' looking for characters of 's' in order.",
    videoTitle: "Two Pointer Alignment",
    difficulty: "medium",
    testCases: [
      { input: "abc\nahbgdc", expectedOutput: "True", isHidden: false, hint: "The letters 'a', 'b', and 'c' appear in 't' in that exact order." },
      { input: "axc\nahbgdc", expectedOutput: "False", isHidden: true, hint: "'x' does not exist in 't'." }
    ]
  },
  {
    id: 2038,
    title: "Arena: Find Pivot Index",
    prompt: "Given an array of integers, calculate the pivot index where the sum of numbers strictly to the left equals the sum of numbers strictly to the right. Print the index, or -1.",
    starterCode: "nums = list(map(int, input().split()))\n# Find pivot",
    sampleInput: "1 7 3 6 5 6",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      const total = nums.reduce((a, b) => a + b, 0);
      let leftSum = 0;
      for (let i = 0; i < nums.length; i++) {
        if (leftSum === total - leftSum - nums[i]) return String(i);
        leftSum += nums[i];
      }
      return "-1";
    },
    explanation: "Keep track of the total sum and a running left sum. The right sum is total - leftSum - nums[i].",
    videoTitle: "Prefix Sum",
    difficulty: "medium",
    testCases: [
      { input: "1 7 3 6 5 6", expectedOutput: "3", isHidden: false, hint: "At index 3 (value 6), left sum is 11, right sum is 11." },
      { input: "1 2 3", expectedOutput: "-1", isHidden: true, hint: "No pivot index exists." }
    ]
  },
  {
    id: 2039,
    title: "Arena: Maximum Average Subarray I",
    prompt: "Line 1: A space-separated array. Line 2: An integer k. Find a contiguous subarray of length k with the maximum average value, and print its sum divided by k.",
    starterCode: "nums = list(map(int, input().split()))\nk = int(input())\n# Find max average",
    sampleInput: "1 12 -5 -6 50 3\n4",
    expectedOutput: (input) => {
      const [line1, line2] = input.trim().split('\n');
      const nums = line1.trim().split(/\s+/).map(Number);
      const k = Number(line2);
      let sum = 0;
      for (let i = 0; i < k; i++) sum += nums[i];
      let maxSum = sum;
      for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, sum);
      }
      return (maxSum / k).toString();
    },
    explanation: "Use a sliding window. Sum the first k elements, then slide the window by adding the next element and subtracting the element left behind.",
    videoTitle: "Sliding Window",
    difficulty: "medium",
    testCases: [
      { input: "1 12 -5 -6 50 3\n4", expectedOutput: "12.75", isHidden: false, hint: "Max subarray is [12, -5, -6, 50]." },
      { input: "5\n1", expectedOutput: "5", isHidden: true, hint: "Single element array!" }
    ]
  },
  {
    id: 2040,
    title: "Arena: Peak Index in a Mountain Array",
    prompt: "An array represents a mountain (values strictly increase, then strictly decrease). Find and print the index of the peak element.",
    starterCode: "arr = list(map(int, input().split()))\n# Find peak index",
    sampleInput: "0 2 1 0",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      let l = 0, r = nums.length - 1;
      while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] < nums[mid + 1]) l = mid + 1;
        else r = mid;
      }
      return String(l);
    },
    explanation: "Binary search works perfectly here in O(log n) time by checking if the midpoint is sloping up or down.",
    videoTitle: "Binary Search",
    difficulty: "medium",
    testCases: [
      { input: "0 2 1 0", expectedOutput: "1", isHidden: false, hint: "Value 2 is at index 1." },
      { input: "0 10 5 2", expectedOutput: "1", isHidden: true, hint: "Peak is 10." }
    ]
  },
  {
    id: 2041,
    title: "Arena: Monotonic Array",
    prompt: "An array is monotonic if it is either entirely non-increasing or entirely non-decreasing. Print 'True' if it is monotonic, else 'False'.",
    starterCode: "nums = list(map(int, input().split()))\n# Check if monotonic",
    sampleInput: "1 2 2 3",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      let inc = true, dec = true;
      for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i+1]) inc = false;
        if (nums[i] < nums[i+1]) dec = false;
      }
      return (inc || dec) ? "True" : "False";
    },
    explanation: "Do one pass maintaining two boolean flags. If it breaks both increasing and decreasing rules, it's not monotonic.",
    videoTitle: "Boolean Flags",
    difficulty: "medium",
    testCases: [
      { input: "1 2 2 3", expectedOutput: "True", isHidden: false, hint: "Array never decreases, so it's non-decreasing." },
      { input: "1 3 2", expectedOutput: "False", isHidden: true, hint: "Goes up then down." }
    ]
  },
  {
    id: 2042,
    title: "Arena: Find All Numbers Disappeared",
    prompt: "Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do NOT appear.",
    starterCode: "nums = list(map(int, input().split()))\n# Find missing numbers",
    sampleInput: "4 3 2 7 8 2 3 1",
    expectedOutput: (input) => {
      const nums = input.trim().split(/\s+/).map(Number);
      const set = new Set(nums);
      const res = [];
      for (let i = 1; i <= nums.length; i++) {
        if (!set.has(i)) res.push(i);
      }
      return `[${res.join(', ')}]`;
    },
    explanation: "A simple solution uses a Set. To do it in O(1) space, you negate the value at index abs(nums[i])-1 and look for positive values left.",
    videoTitle: "Array Traversal",
    difficulty: "medium",
    testCases: [
      { input: "4 3 2 7 8 2 3 1", expectedOutput: "[5, 6]", isHidden: false, hint: "Length is 8, numbers 5 and 6 are missing." },
      { input: "1 1", expectedOutput: "[2]", isHidden: true, hint: "Length 2, expects 1 and 2." }
    ]
  },
  {
    id: 2043,
    title: "Arena: Detect Capital",
    prompt: "Print 'True' if capitalization is correct: All caps (USA), all lowercase (leetcode), or only first letter cap (Google). Else print 'False'.",
    starterCode: "word = input().strip()\n# Check capital usage",
    sampleInput: "FlaG",
    expectedOutput: (input) => {
      const word = input.trim();
      if (word === word.toUpperCase() || word === word.toLowerCase() || word === word[0].toUpperCase() + word.slice(1).toLowerCase()) {
        return "True";
      }
      return "False";
    },
    explanation: "Python string methods `.isupper()`, `.islower()`, and `.istitle()` (mostly) handle these exact conditions.",
    videoTitle: "String Edge Cases",
    difficulty: "medium",
    testCases: [
      { input: "FlaG", expectedOutput: "False", isHidden: false, hint: "Last letter is capital but first is not." },
      { input: "Google", expectedOutput: "True", isHidden: true, hint: "Title case is allowed." },
      { input: "USA", expectedOutput: "True", isHidden: true, hint: "All caps is allowed." }
    ]
  },
  {
    id: 2044,
    title: "Arena: Reverse String II",
    prompt: "Line 1: string s. Line 2: integer k. Reverse the first k characters for every 2k characters counting from the start. Print the string.",
    starterCode: "s = list(input().strip())\nk = int(input())\n# Reverse chunks and print as string",
    sampleInput: "abcdefg\n2",
    expectedOutput: (input) => {
      const [sStr, kStr] = input.trim().split('\n');
      const k = Number(kStr);
      let s = sStr.trim().split('');
      for (let i = 0; i < s.length; i += 2 * k) {
        let left = i, right = Math.min(i + k - 1, s.length - 1);
        while (left < right) {
          [s[left], s[right]] = [s[right], s[left]];
          left++; right--;
        }
      }
      return s.join('');
    },
    explanation: "Loop through the string with a step size of 2k, and apply a two-pointer reverse on the slice `s[i:i+k]`.",
    videoTitle: "String Chunks",
    difficulty: "medium",
    testCases: [
      { input: "abcdefg\n2", expectedOutput: "bacdfeg", isHidden: false, hint: "Reverse 'ab' to 'ba', skip 'cd', reverse 'ef' to 'fe'." },
      { input: "abcd\n2", expectedOutput: "bacd", isHidden: true, hint: "Reverse first two, skip next two." }
    ]
  },
  {
    id: 2045,
    title: "Arena: Valid IP Address (IPv4)",
    prompt: "Given a string, print 'True' if it is a valid IPv4 address (4 parts separated by dots, each part 0-255 with no leading zeros unless it is exactly '0').",
    starterCode: "ip = input().strip()\n# Check if valid IPv4",
    sampleInput: "192.168.1.1",
    expectedOutput: (input) => {
      const ip = input.trim();
      const parts = ip.split('.');
      if (parts.length !== 4) return "False";
      for (let p of parts) {
        if (!/^\d+$/.test(p)) return "False";
        if (p.length > 1 && p[0] === '0') return "False";
        if (Number(p) < 0 || Number(p) > 255) return "False";
      }
      return "True";
    },
    explanation: "Split the string by `.` and check three things per block: length constraints, numeric values, and leading zero rules.",
    videoTitle: "String Parsing",
    difficulty: "medium",
    testCases: [
      { input: "192.168.1.1", expectedOutput: "True", isHidden: false, hint: "All 4 parts are valid numbers between 0 and 255." },
      { input: "256.256.256.256", expectedOutput: "False", isHidden: true, hint: "Numbers over 255 are invalid." },
      { input: "192.01.1.1", expectedOutput: "False", isHidden: true, hint: "Leading zeros ('01') are invalid." }
    ]
  },
  {
    id: 2046,
    title: "Arena: Matrix Diagonal Sum",
    prompt: "Read an integer N representing an NxN matrix. Then read N lines of space-separated arrays. Print the sum of the matrix diagonals. Only sum intersecting elements once.",
    starterCode: "n = int(input())\nmat = []\nfor _ in range(n):\n    mat.append(list(map(int, input().split())))\n# Calculate sum",
    sampleInput: "3\n1 2 3\n4 5 6\n7 8 9",
    expectedOutput: (input) => {
      const lines = input.trim().split('\n');
      const n = Number(lines[0]);
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const row = lines[i+1].trim().split(/\s+/).map(Number);
        sum += row[i];
        if (i !== n - 1 - i) sum += row[n - 1 - i];
      }
      return String(sum);
    },
    explanation: "Primary diagonal is `mat[i][i]`, secondary is `mat[i][n-1-i]`. Don't double count the middle if N is odd.",
    videoTitle: "Matrix Traversal",
    difficulty: "medium",
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "25", isHidden: false, hint: "1+5+9 (primary) + 3+7 (secondary, skip middle 5)." },
      { input: "2\n1 1\n1 1", expectedOutput: "4", isHidden: true, hint: "For even matrices, add all diagonal corners." }
    ]
  },
  {
    id: 2047,
    title: "Arena: Richest Customer Wealth",
    prompt: "Given an NxM grid where each row represents a customer and elements represent their bank accounts, print the wealth of the richest customer.",
    starterCode: "n = int(input())\naccounts = []\nfor _ in range(n):\n    accounts.append(list(map(int, input().split())))\n# Print max wealth",
    sampleInput: "2\n1 2 3\n3 2 1",
    expectedOutput: (input) => {
      const lines = input.trim().split('\n');
      const n = Number(lines[0]);
      let max = 0;
      for(let i=1; i<=n; i++) {
        const sum = lines[i].trim().split(/\s+/).map(Number).reduce((a,b)=>a+b,0);
        if(sum > max) max = sum;
      }
      return String(max);
    },
    explanation: "Map over the rows, taking the sum of each row, and find the maximum overall sum.",
    videoTitle: "Array of Arrays",
    difficulty: "medium",
    testCases: [
      { input: "2\n1 2 3\n3 2 1", expectedOutput: "6", isHidden: false, hint: "Both customers have a total wealth of 6." },
      { input: "3\n1 5\n7 3\n3 5", expectedOutput: "10", isHidden: true, hint: "Customer 2 has 7+3 = 10." }
    ]
  },
  {
    id: 2048,
    title: "Arena: Number of 1 Bits",
    prompt: "Write a program that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    starterCode: "n = int(input())\n# Print the number of 1 bits",
    sampleInput: "11",
    expectedOutput: (input) => {
      let n = Number(input.trim());
      let count = 0;
      while (n !== 0) {
        n &= (n - 1);
        count++;
      }
      return String(count);
    },
    explanation: "You can convert the number to a binary string using `bin(n)` and `.count('1')`, or use the bitwise trick `n &= (n - 1)`.",
    videoTitle: "Bit Manipulation",
    difficulty: "medium",
    testCases: [
      { input: "11", expectedOutput: "3", isHidden: false, hint: "11 in binary is 1011, which has three 1s." },
      { input: "128", expectedOutput: "1", isHidden: true, hint: "128 is a power of 2, so it has one 1 bit." }
    ]
  },
  {
    id: 2049,
    title: "Arena: Excel Sheet Column Title",
    prompt: "Given an integer, return its corresponding column title as it appears in an Excel sheet (1 -> A, 2 -> B ... 26 -> Z, 27 -> AA).",
    starterCode: "n = int(input())\n# Print Excel title",
    sampleInput: "28",
    expectedOutput: (input) => {
      let n = Number(input.trim());
      let res = "";
      while (n > 0) {
        n--;
        res = String.fromCharCode((n % 26) + 65) + res;
        n = Math.floor(n / 26);
      }
      return res;
    },
    explanation: "This is a base-26 conversion problem. Subtract 1 before modulo 26 to handle the 1-index mapping nicely.",
    videoTitle: "Base Conversions",
    difficulty: "medium",
    testCases: [
      { input: "28", expectedOutput: "AB", isHidden: false, hint: "26 is Z, 27 is AA, 28 is AB." },
      { input: "701", expectedOutput: "ZY", isHidden: true, hint: "Base 26 math checks." }
    ]
  },
  {
    id: 2050,
    title: "Arena: Assign Cookies",
    prompt: "Line 1: Children's greed factors. Line 2: Cookie sizes. Maximize the number of content children (cookie size >= greed factor) and print the count.",
    starterCode: "g = list(map(int, input().split()))\ns = list(map(int, input().split()))\n# Find max content children",
    sampleInput: "1 2 3\n1 1",
    expectedOutput: (input) => {
      const [line1, line2] = input.trim().split('\n');
      const g = line1.trim().split(/\s+/).map(Number).sort((a,b)=>a-b);
      const s = line2.trim().split(/\s+/).map(Number).sort((a,b)=>a-b);
      let i = 0, j = 0;
      while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) i++;
        j++;
      }
      return String(i);
    },
    explanation: "Sort both arrays. Use a greedy two-pointer approach, trying to satisfy the least greedy children with the smallest possible cookies.",
    videoTitle: "Greedy Algorithms",
    difficulty: "medium",
    testCases: [
      { input: "1 2 3\n1 1", expectedOutput: "1", isHidden: false, hint: "Only the child with greed 1 gets a cookie." },
      { input: "1 2\n1 2 3", expectedOutput: "2", isHidden: true, hint: "Both children can be fed." }
    ]
  }
];