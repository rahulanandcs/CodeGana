export type TestCase = {
  input: string;
  expectedOutput: string | ((input: string) => string);
  isHidden: boolean;
  hint: string; // Contextual text for the mascot
};

export type Challenge = {
  id: number
  title: string
  prompt: string
  starterCode: string
  testCases: TestCase[]
  sampleInput: string
  expectedOutput: string | ((input: string) => string)
  explanation: string
  videoId?: string
  videoTitle: string
  difficulty: string
}


export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Print Hello",
    prompt: "Write a program that prints 'Hello World'",
    starterCode: "print('Hello World')",
    sampleInput: "",
    expectedOutput: "Hello World",
    explanation: "This uses Python's print function.",
    videoTitle: "How To Print",
    difficulty: "easy",
    testCases: [
      {
        input: "",
        expectedOutput: "Hello World",
        isHidden: false,
        hint: "Make sure you printed exactly 'Hello World' with a capital H, capital W, and space between them!"
      }
    ]
  },

  {
    id: 2,
    title: "Add Two Numbers",
    prompt: "Read two numbers from input and print their sum",
    starterCode: "a = int(input())\nb = int(input())\nprint(a + b)",
    sampleInput: "3\n5",
    expectedOutput: (input: string) => {
    const [a, b] = input.trim().split(/\s+/).map(Number)
    return String(a + b)
  },
    explanation: "Use input() and int() to read numbers, then print sum.",
    videoTitle: "Basic Math (+, -, *, /, %)",
    difficulty: "easy",
    testCases: [
      {
        input: "3\n5",
        expectedOutput: (input: string) => {
          const [a, b] = input.trim().split(/\s+/).map(Number)
          return String(a + b)
        },
        isHidden: false,
        hint: "Check your math! Make sure you convert both inputs to integers using int() before adding them."
      },
      {
        input: "0\n0",
        expectedOutput: "0",
        isHidden: true,
        hint: "Your code failed when adding zeroes! Make sure 0 + 0 equals 0."
      },
      {
        input: "-4\n10",
        expectedOutput: "6",
        isHidden: true,
        hint: "Make sure your program works with negative numbers like -4 + 10 = 6!"
      }
    ]
  },

  {
    id: 3,
    title: "Loop Example",
    prompt: "Print numbers 1 to 5 using a loop",
    starterCode: "for i in range(1, 6):\n    print(i)",
    sampleInput: "",
    expectedOutput: "1\n2\n3\n4\n5",
    explanation: "Use a for loop with range() to iterate numbers.",
    videoTitle: "For Loops",
    difficulty: "easy",
    testCases: [
      {
        input: "",
        expectedOutput: "1\n2\n3\n4\n5",
        isHidden: false,
        hint: "Remember that range(start, stop) stops BEFORE the stop number! To print up to 5, use range(1, 6)."
      }
    ]
  },

  {
    id: 4,
    title: "Factorial",
    prompt: "Read a number from input and print its factorial",
    starterCode: "n = int(input())\nresult = 1\nfor i in range(1, n + 1):\n    result *= i\nprint(result)",
    sampleInput: "5",
    expectedOutput: (input: string) => {
      const n = Number(input.trim())
      let result = 1
      for (let i = 1; i <= n; i++) {
        result *= i
      }
      return String(result)
    },
    explanation: "Use a loop to multiply all numbers from 1 to n to compute the factorial.",
    videoTitle: "What are Factorials",
    difficulty: "easy",
    testCases: [
      {
        input: "5",
        expectedOutput: "120",
        isHidden: false,
        hint: "5 factorial is 5 * 4 * 3 * 2 * 1 = 120. Check your multiplication inside the loop!"
      },
      {
        input: "1",
        expectedOutput: "1",
        isHidden: true,
        hint: "Check your loop range for N = 1. The factorial of 1 should be 1."
      },
      {
        input: "0",
        expectedOutput: "1",
        isHidden: true,
        hint: "By mathematical definition, 0! (factorial of 0) is 1! Make sure your initial result is set to 1 before the loop."
      }
    ]
  },

  {
    id: 5,
    title: "Even or Odd",
    prompt: "Read a number from input and print 'Even' if it is even, otherwise print 'Odd'",
    starterCode: "n = int(input())\nif n % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
    sampleInput: "7",
    expectedOutput: (input: string) => {
      const n = Number(input.trim())
      return n % 2 === 0 ? "Even" : "Odd"
    },
    explanation: "Use the modulo operator % to check if a number is divisible by 2.",
    videoTitle: "Modulus",
    difficulty: "easy",
    testCases: [
      {
        input: "7",
        expectedOutput: "Odd",
        isHidden: false,
        hint: "7 is an odd number! Check if your modulo condition % 2 == 0 correctly separates even and odd."
      },
      {
        input: "4",
        expectedOutput: "Even",
        isHidden: true,
        hint: "4 is an even number. Make sure your program prints 'Even' with a capital E!"
      },
      {
        input: "0",
        expectedOutput: "Even",
        isHidden: true,
        hint: "0 is an even number because 0 % 2 is 0! Check your handling for 0."
      }
    ]
  },

  {
    id: 6,
    title: "String Length",
    prompt: "Read a word from input and print the number of characters in it",
    starterCode: "word = input()\nprint(len(word))",
    sampleInput: "python",
    expectedOutput: (input: string) => String(input.trim().length),
    explanation: "Use len() to find the length of a string.",
    videoTitle: "String Methods",
    difficulty: "easy",
    testCases: [
      {
        input: "python",
        expectedOutput: (input: string) => String(input.trim().length),
        isHidden: false,
        hint: "Use len(word) to count characters. 'python' has 6 letters!"
      },
      {
        input: "hello world",
        expectedOutput: (input: string) => String(input.trim().length),
        isHidden: true,
        hint: "Spaces count as characters! 'hello world' has 11 characters total."
      },
      {
        input: "\n", // <-- Fix: Sending a newline allows input() to read an empty line safely
        expectedOutput: "0",
        isHidden: true,
        hint: "An empty input line should return a length of 0."
      }
    ]
  },
  
{
    id: 7,
    title: "Square a Number",
    prompt: "Read a number from input and print its square",
    starterCode: "n = int(input())\nprint(n ** 2)",
    sampleInput: "5",
    expectedOutput: (input: string) => {
      const n = Number(input.trim());
      return String(n * n);
    },
    explanation: "Use the exponent operator ** or multiply the number by itself.",
    videoTitle: "Power!",
    difficulty: "easy",
    testCases: [
      {
        input: "5",
        expectedOutput: (input: string) => String(Number(input.trim()) ** 2),
        isHidden: false,
        hint: "Make sure you multiply the input number by itself (n * n or n ** 2)!"
      },
      {
        input: "0",
        expectedOutput: (input: string) => String(Number(input.trim()) ** 2),
        isHidden: true,
        hint: "0 squared is 0! Make sure your program prints 0 when the input is 0."
      },
      {
        input: "-3",
        expectedOutput: (input: string) => String(Number(input.trim()) ** 2),
        isHidden: true,
        hint: "Remember that negative numbers squared become positive (-3 * -3 = 9)!"
      }
    ]
  },

  {
    id: 8,
    title: "Build The Pyramids",
    prompt: "Read a number from input for the number of rows & print a left-aligned asterisk pyramid",
    starterCode: "n = int(input())\nfor i in range(1, n + 1):\n    print('*' * i)",
    sampleInput: "4",
    expectedOutput: (input: string) => {
      const n = Number(input.trim());
      let lines = [];
      for (let i = 1; i <= n; i++) {
        lines.push("*".repeat(i));
      }
      return lines.join("\n");
    },
    explanation: "Use a loop to iterate from 1 up to n, multiplying the asterisk string by the current row number.",
    videoTitle: "Nested Loops and String Multiplication",
    difficulty: "easy",
    testCases: [
      {
        input: "4",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let lines = [];
          for (let i = 1; i <= n; i++) {
            lines.push("*".repeat(i));
          }
          return lines.join("\n");
        },
        isHidden: false,
        hint: "Each row 'i' should print 'i' asterisks! Use '*' * i inside a loop running from 1 up to n."
      },
      {
        input: "1",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let lines = [];
          for (let i = 1; i <= n; i++) {
            lines.push("*".repeat(i));
          }
          return lines.join("\n");
        },
        isHidden: true,
        hint: "Check your loop upper bound! Make sure to use range(1, n + 1) so a single-row pyramid (n = 1) prints 1 star."
      }
    ]
  },

  {
    id: 9,
    title: "Reverse The String",
    prompt: "Read a string from input then reverse that string",
    starterCode: "text = input()\nprint(text[::-1])",
    sampleInput: "hello",
    expectedOutput: (input: string) => {
      return input.trim().split("").reverse().join("");
    },
    explanation: "Print out the string variable using Python's slice step syntax [::-1].",
    videoTitle: "String Slicing Tricks",
    difficulty: "easy",
    testCases: [
      {
        input: "hello",
        expectedOutput: (input: string) => input.trim().split("").reverse().join(""),
        isHidden: false,
        hint: "Use string slicing text[::-1] or a loop to reverse any input text!"
      },
      {
        input: "a",
        expectedOutput: (input: string) => input.trim().split("").reverse().join(""),
        isHidden: true,
        hint: "A single-character string should remain identical when reversed."
      },
      {
        input: "12345",
        expectedOutput: (input: string) => input.trim().split("").reverse().join(""),
        isHidden: true,
        hint: "Make sure your program reverses digits and special characters just like regular words!"
      }
    ]
  },
  
  {
    id: 10,
    title: "VIP Club Filtering",
    prompt: "Read an integer representing age from input. If the age is 21 or older, print 'Allowed', otherwise print 'Denied'.",
    starterCode: "age = int(input())\nif age >= 21:\n    print('Allowed')\nelse:\n    print('Denied')",
    sampleInput: "19",
    expectedOutput: (input: string) => {
      const age = Number(input.trim());
      return age >= 21 ? "Allowed" : "Denied";
    },
    explanation: "Use a basic if-else conditional block to test whether the age meets the club requirement.",
    videoTitle: "Advanced If Statements",
    difficulty: "easy",
    testCases: [
      {
        input: "19",
        expectedOutput: (input: string) => (Number(input.trim()) >= 21 ? "Allowed" : "Denied"),
        isHidden: false,
        hint: "Check your condition! Any age under 21 should print 'Denied' and any age 21 or older should print 'Allowed'."
      },
      {
        input: "21",
        expectedOutput: (input: string) => (Number(input.trim()) >= 21 ? "Allowed" : "Denied"),
        isHidden: true,
        hint: "Boundary error! Exactly 21 years old SHOULD be 'Allowed'. Make sure you used >= instead of >."
      },
      {
        input: "30",
        expectedOutput: (input: string) => (Number(input.trim()) >= 21 ? "Allowed" : "Denied"),
        isHidden: true,
        hint: "Make sure your program correctly outputs 'Allowed' for any age greater than or equal to 21."
      }
    ]
  },

 {
    id: 11,
    title: "Rounding with Math Module",
    prompt: "Read a decimal number from input. Print its square root rounded UP to the nearest integer using the math module.",
    starterCode: "import math\n\nn = float(input())\n# Use math functions here",
    sampleInput: "12.5",
    expectedOutput: (input: string) => {
      const n = Number(input.trim());
      return String(Math.ceil(Math.sqrt(n)));
    },
    explanation: "Import the 'math' module, use math.sqrt() to find the square root, and wrap it in math.ceil() to round up.",
    videoTitle: "Math Module Functions",
    difficulty: "easy",
    testCases: [
      {
        input: "12.5",
        expectedOutput: (input: string) => String(Math.ceil(Math.sqrt(Number(input.trim())))),
        isHidden: false,
        hint: "Calculate math.sqrt(n) first, then wrap it in math.ceil() to round up to the nearest whole integer!"
      },
      {
        input: "9.0",
        expectedOutput: (input: string) => String(Math.ceil(Math.sqrt(Number(input.trim())))),
        isHidden: true,
        hint: "When a square root results in an exact whole number, math.ceil() keeps that exact integer."
      },
      {
        input: "0.1",
        expectedOutput: (input: string) => String(Math.ceil(Math.sqrt(Number(input.trim())))),
        isHidden: true,
        hint: "math.ceil() rounds any positive decimal with a fractional part UP to the next whole integer!"
      }
    ]
  },

  {
    id: 12,
    title: "The f-string Identity Card",
    prompt: "Read two lines of input. The first line contains a person's name, and the second line contains their age. Print out exactly: 'NAME is AGE years old.' using an f-string.",
    starterCode: "name = input()\nage = int(input())\n# Print using an f-string",
    sampleInput: "Bob\n32",
    expectedOutput: (input: string) => {
      const lines = input.trim().split("\n");
      const name = lines[0].trim();
      const age = lines[1].trim();
      return `${name} is ${age} years old.`;
    },
    explanation: "Prefix your string with an 'f' and insert variables inside curly braces: f'{name} is {age} years old.'",
    videoTitle: "String Formatting with f-strings",
    difficulty: "easy",
    testCases: [
      {
        input: "Bob\n32",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const name = lines[0] ? lines[0].trim() : "";
          const age = lines[1] ? lines[1].trim() : "";
          return `${name} is ${age} years old.`;
        },
        isHidden: false,
        hint: "Check your punctuation and spacing! Make sure your format follows f'{name} is {age} years old.' with a period at the end."
      },
      {
        input: "Alice\n7",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const name = lines[0] ? lines[0].trim() : "";
          const age = lines[1] ? lines[1].trim() : "";
          return `${name} is ${age} years old.`;
        },
        isHidden: true,
        hint: "Make sure you inject both dynamic inputs into your string formatting correctly using f'{name} is {age} years old.'."
      }
    ]
  },

  {
    id: 13,
    title: "Countdown Tracker",
    prompt: "Read an integer N from input. Use a while loop to print a countdown from N down to 1, with each number on a new line.",
    starterCode: "n = int(input())\n# Implement your while loop countdown",
    sampleInput: "3",
    expectedOutput: (input: string) => {
      const n = Number(input.trim());
      let numbers: string[] = [];
      for (let i = n; i >= 1; i--) {
        numbers.push(String(i));
      }
      return numbers.join("\n");
    },
    explanation: "Set your while loop condition to (n > 0), print n, and remember to decrement n by 1 inside the loop.",
    videoTitle: "While Loops vs For Loops",
    difficulty: "easy",
    testCases: [
      {
        input: "3",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let numbers: string[] = [];
          for (let i = n; i >= 1; i--) {
            numbers.push(String(i));
          }
          return numbers.join("\n");
        },
        isHidden: false,
        hint: "Make sure your while loop prints the current number 'n' and decreases it (n -= 1) on each iteration until it reaches 1!"
      },
      {
        input: "1",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let numbers: string[] = [];
          for (let i = n; i >= 1; i--) {
            numbers.push(String(i));
          }
          return numbers.join("\n");
        },
        isHidden: true,
        hint: "Check your loop condition! Ensure it runs while n >= 1 (or n > 0) so that single-step countdowns work correctly."
      }
    ]
  },

  {
    id: 14,
    title: "List Comprehension Basics",
    prompt: "Read a space-separated string of integers from input. Use a single list comprehension to filter out all odd numbers, then print the resulting list.",
    starterCode: "nums = list(map(int, input().split()))\n# Create a list comprehension\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)",
    sampleInput: "1 2 3 4 5 6",
    expectedOutput: (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return "[]";
      const evens = trimmed.split(/\s+/).map(Number).filter(x => x % 2 === 0);
      return `[${evens.join(", ")}]`;
    },
    explanation: "List comprehensions filter elements smoothly inside a single line tracking brackets syntax.",
    videoTitle: "Introduction to List Comprehensions",
    difficulty: "easy",
    testCases: [
      {
        input: "1 2 3 4 5 6",
        expectedOutput: (input: string) => {
          const trimmed = input.trim();
          if (!trimmed) return "[]";
          const evens = trimmed.split(/\s+/).map(Number).filter(x => x % 2 === 0);
          return `[${evens.join(", ")}]`;
        },
        isHidden: false,
        hint: "Use [x for x in nums if x % 2 == 0] inside your print statement to keep only even numbers!"
      },
      {
        input: "1 3 5",
        expectedOutput: (input: string) => {
          const trimmed = input.trim();
          if (!trimmed) return "[]";
          const evens = trimmed.split(/\s+/).map(Number).filter(x => x % 2 === 0);
          return `[${evens.join(", ")}]`;
        },
        isHidden: true,
        hint: "If an input contains no even numbers, your comprehension condition should filter everything out and return an empty list []!"
      }
    ]
  },

  

  // MEDIUM CHALLENGES (15 - 21)
  {
    id: 15,
    title: "FizzBuzz Game",
    prompt: "Read a number N from input. Loop from 1 to N. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz', otherwise print the number.",
    starterCode: "n = int(input())\n# Write your loop here",
    sampleInput: "15",
    expectedOutput: (input: string) => {
      const n = Number(input.trim());
      let results = [];
      for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) results.push("FizzBuzz");
        else if (i % 3 === 0) results.push("Fizz");
        else if (i % 5 === 0) results.push("Buzz");
        else results.push(String(i));
      }
      return results.join("\n");
    },
    explanation: "Evaluate modulo conditions using if-elif-else statements inside a range loop, keeping the combined condition (3 and 5) first.",
    videoTitle: "The Famous FizzBuzz Problem",
    difficulty: "medium",
    testCases: [
      {
        input: "15",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let results = [];
          for (let i = 1; i <= n; i++) {
            if (i % 3 === 0 && i % 5 === 0) results.push("FizzBuzz");
            else if (i % 3 === 0) results.push("Fizz");
            else if (i % 5 === 0) results.push("Buzz");
            else results.push(String(i));
          }
          return results.join("\n");
        },
        isHidden: false,
        hint: "Order matters! Check for multiples of both 3 and 5 (i % 3 == 0 and i % 5 == 0) FIRST before checking 3 or 5 individually."
      },
      {
        input: "3",
        expectedOutput: (input: string) => {
          const n = Number(input.trim());
          let results = [];
          for (let i = 1; i <= n; i++) {
            if (i % 3 === 0 && i % 5 === 0) results.push("FizzBuzz");
            else if (i % 3 === 0) results.push("Fizz");
            else if (i % 5 === 0) results.push("Buzz");
            else results.push(String(i));
          }
          return results.join("\n");
        },
        isHidden: true,
        hint: "Make sure multiples of 3 output 'Fizz', multiples of 5 output 'Buzz', and all other numbers print as plain integers."
      }
    ]
  },

  {
    id: 16,
    title: "Find the Median",
    prompt: "Read a space-separated string of integers from input. Sort them and print the median value. If the count is even, print the average of the two middle values formatted to one decimal place.",
    starterCode: "nums = list(map(int, input().split()))\n# Sort and find median",
    sampleInput: "7 1 3 9",
    expectedOutput: (input: string) => {
      const nums = input.trim().split(/\s+/).map(Number).sort((a, b) => a - b);
      const len = nums.length;
      if (len % 2 !== 0) {
        return String(nums[Math.floor(len / 2)]);
      } else {
        const mid = len / 2;
        return ((nums[mid - 1] + nums[mid]) / 2).toFixed(1);
      }
    },
    explanation: "First sort the list using .sort(). Check if the list length is odd or even to compute the statistical middle.",
    videoTitle: "Sorting Arrays & Finding Medians",
    difficulty: "medium",
    testCases: [
      {
        input: "7 1 3 9",
        expectedOutput: (input: string) => {
          const nums = input.trim().split(/\s+/).map(Number).sort((a, b) => a - b);
          const len = nums.length;
          if (len % 2 !== 0) {
            return String(nums[Math.floor(len / 2)]);
          } else {
            const mid = len / 2;
            return ((nums[mid - 1] + nums[mid]) / 2).toFixed(1);
          }
        },
        isHidden: false,
        hint: "Make sure you sort the list first! For even-length lists, calculate the average of the two middle values and format to one decimal place (e.g., 5.0)."
      },
      {
        input: "5 2 8",
        expectedOutput: (input: string) => {
          const nums = input.trim().split(/\s+/).map(Number).sort((a, b) => a - b);
          const len = nums.length;
          if (len % 2 !== 0) {
            return String(nums[Math.floor(len / 2)]);
          } else {
            const mid = len / 2;
            return ((nums[mid - 1] + nums[mid]) / 2).toFixed(1);
          }
        },
        isHidden: true,
        hint: "For odd-length lists, select the single middle element after sorting—don't format it with extra decimals!"
      }
    ]
  },

  {
    id: 17,
    title: "Rock Paper Scissors Engine",
    prompt: "Read two lines of input. Line 1 is Player 1's move ('Rock', 'Paper', or 'Scissors'). Line 2 is Player 2's move. Print 'Player 1 Wins', 'Player 2 Wins', or 'Draw'.",
    starterCode: "p1 = input().strip()\np2 = input().strip()\n# Calculate result",
    sampleInput: "Rock\nScissors",
    expectedOutput: (input: string) => {
      const [p1, p2] = input.trim().split(/\s+/);
      if (p1 === p2) return "Draw";
      if (
        (p1 === "Rock" && p2 === "Scissors") ||
        (p1 === "Paper" && p2 === "Rock") ||
        (p1 === "Scissors" && p2 === "Paper")
      ) {
        return "Player 1 Wins";
      }
      return "Player 2 Wins";
    },
    explanation: "Map the game winning conditions using logical compound rules inside your conditionals.",
    videoTitle: "Building Basic Game Logic",
    difficulty: "medium",
    testCases: [
      {
        input: "Rock\nScissors",
        expectedOutput: (input: string) => {
          const [p1, p2] = input.trim().split(/\s+/);
          if (p1 === p2) return "Draw";
          if (
            (p1 === "Rock" && p2 === "Scissors") ||
            (p1 === "Paper" && p2 === "Rock") ||
            (p1 === "Scissors" && p2 === "Paper")
          ) {
            return "Player 1 Wins";
          }
          return "Player 2 Wins";
        },
        isHidden: false,
        hint: "Double check all winning combinations! Remember: Rock beats Scissors, Paper beats Rock, and Scissors beats Paper."
      },
      {
        input: "Paper\nPaper",
        expectedOutput: (input: string) => {
          const [p1, p2] = input.trim().split(/\s+/);
          if (p1 === p2) return "Draw";
          if (
            (p1 === "Rock" && p2 === "Scissors") ||
            (p1 === "Paper" && p2 === "Rock") ||
            (p1 === "Scissors" && p2 === "Paper")
          ) {
            return "Player 1 Wins";
          }
          return "Player 2 Wins";
        },
        isHidden: true,
        hint: "When both players choose the same move (p1 == p2), your program should output 'Draw'!"
      },
      {
        input: "Scissors\nRock",
        expectedOutput: (input: string) => {
          const [p1, p2] = input.trim().split(/\s+/);
          if (p1 === p2) return "Draw";
          if (
            (p1 === "Rock" && p2 === "Scissors") ||
            (p1 === "Paper" && p2 === "Rock") ||
            (p1 === "Scissors" && p2 === "Paper")
          ) {
            return "Player 1 Wins";
          }
          return "Player 2 Wins";
        },
        isHidden: true,
        hint: "Make sure your code correctly outputs 'Player 2 Wins' when Player 2's move beats Player 1's move."
      }
    ]
  },

  {
    id: 18,
    title: "Inventory Stock Checker",
    prompt: "Define an inventory dictionary containing 4 items ('apples': 50, 'bananas': 0, 'cherries': 15, 'dates': 10). Read an item name from input(). If the item exists and stock is > 0, print 'In Stock'. If stock is 0, print 'Backorder'. If the item is not in the dictionary, print 'Discontinued'.",
    starterCode: "inventory = {\n    'apples': 50,\n    'bananas': 0,\n    'cherries': 15,\n    'dates': 10\n}\n\nitem_name = input().strip()\n# Implement your lookup logic below",
    sampleInput: "bananas",
    expectedOutput: (input: string) => {
      const item = input.trim();
      const inventory: Record<string, number> = { apples: 50, bananas: 0, cherries: 15, dates: 10 };
      if (inventory[item] === undefined) return "Discontinued";
      return inventory[item] > 0 ? "In Stock" : "Backorder";
    },
    explanation: "Use dictionary key checking ('if item_name in inventory:') followed by conditional stock checks.",
    videoTitle: "Algorithmic Lookups via Dictionaries",
    difficulty: "medium",
    testCases: [
      {
        input: "bananas",
        expectedOutput: (input: string) => {
          const item = input.trim();
          const inventory: Record<string, number> = { apples: 50, bananas: 0, cherries: 15, dates: 10 };
          if (inventory[item] === undefined) return "Discontinued";
          return inventory[item] > 0 ? "In Stock" : "Backorder";
        },
        isHidden: false,
        hint: "'bananas' has a stock of 0 in the dictionary, so your code should print 'Backorder'!"
      },
      {
        input: "apples",
        expectedOutput: (input: string) => {
          const item = input.trim();
          const inventory: Record<string, number> = { apples: 50, bananas: 0, cherries: 15, dates: 10 };
          if (inventory[item] === undefined) return "Discontinued";
          return inventory[item] > 0 ? "In Stock" : "Backorder";
        },
        isHidden: true,
        hint: "When an item exists and stock is > 0 (like 'apples'), print 'In Stock'."
      },
      {
        input: "dragonfruit",
        expectedOutput: "Discontinued",
        isHidden: true,
        hint: "If an item is not in your dictionary, print 'Discontinued'."
      }
    ]
  },

  {
    id: 19,
    title: "Coordinate Distance Tracker",
    prompt: "Read two lines of input containing 2D coordinate spaces (X1 Y1 and X2 Y2). Unpack them directly into immutable coordinate tuples. Calculate the straight-line Euclidean distance between both nodes, and print 'Far' if the distance is greater than 10, otherwise print 'Near'.",
    starterCode: "p1_input = list(map(float, input().split()))\np2_input = list(map(float, input().split()))\npoint1 = (p1_input[0], p1_input[1])\npoint2 = (p2_input[0], p2_input[1])\n# Check coordinate length thresholds",
    sampleInput: "0 0\n12 5",
    expectedOutput: (input: string) => {
      const lines = input.trim().split("\n");
      const [x1, y1] = lines[0].trim().split(/\s+/).map(Number);
      const [x2, y2] = lines[1].trim().split(/\s+/).map(Number);
      const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return dist > 10 ? "Far" : "Near";
    },
    explanation: "Calculate multi-point lengths by unpacking tuple positions inside geometric algorithms.",
    videoTitle: "Geometric Calculations with Tuples",
    difficulty: "medium",
    testCases: [
      {
        input: "0 0\n12 5",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const [x1, y1] = lines[0].trim().split(/\s+/).map(Number);
          const [x2, y2] = lines[1].trim().split(/\s+/).map(Number);
          const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          return dist > 10 ? "Far" : "Near";
        },
        isHidden: false,
        hint: "Calculate distance using math.sqrt((x2-x1)**2 + (y2-y1)**2). If the result is strictly greater than 10, print 'Far', otherwise print 'Near'."
      },
      {
        input: "0 0\n3 4",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const [x1, y1] = lines[0].trim().split(/\s+/).map(Number);
          const [x2, y2] = lines[1].trim().split(/\s+/).map(Number);
          const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          return dist > 10 ? "Far" : "Near";
        },
        isHidden: true,
        hint: "Boundary check! When the calculated Euclidean distance is less than or equal to 10, your code should output 'Near'."
      }
    ]
  },

  {
    id: 20,
    title: "Bulletproof Data Parser",
    prompt: "Read a sequence of user values from input line by line until the word 'END' is typed. Use a try-except structure inside a loop to catch inputs. Parse each line into an integer and add it to a running sum. If an invalid word is typed, catch the ValueError, print 'Skipped Invalid Data', and continue running. At the end, print the final sum.",
    starterCode: "total = 0\nwhile True:\n    val = input().strip()\n    if val == 'END': break\n    # Implement validation handling blocks here\nprint(total)",
    sampleInput: "10\nabc\n5\nEND",
    expectedOutput: (input: string) => {
      const lines = input.trim().split("\n");
      let total = 0;
      let logs: string[] = [];
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (line === "END") break;
        const num = Number(line);
        if (!isNaN(Number(line)) && line !== "") {
          total += num;
        } else {
          logs.push("Skipped Invalid Data");
        }
      }
      logs.push(String(total));
      return logs.join("\n");
    },
    explanation: "Loop dynamic streaming inputs alongside targeted error handling routines keeps code platforms stable.",
    videoTitle: "Error Handling Inside Control Loops",
    difficulty: "medium",
    testCases: [
      {
        input: "10\nabc\n5\nEND",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          let total = 0;
          let logs: string[] = [];
          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (line === "END") break;
            const num = Number(line);
            if (!isNaN(Number(line)) && line !== "") {
              total += num;
            } else {
              logs.push("Skipped Invalid Data");
            }
          }
          logs.push(String(total));
          return logs.join("\n");
        },
        isHidden: false,
        hint: "Use try/except int(val) inside your loop! Catch ValueError, print 'Skipped Invalid Data', and continue adding valid integers to your running total."
      },
      {
        input: "1\n2\n3\nEND",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          let total = 0;
          let logs: string[] = [];
          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (line === "END") break;
            const num = Number(line);
            if (!isNaN(Number(line)) && line !== "") {
              total += num;
            } else {
              logs.push("Skipped Invalid Data");
            }
          }
          logs.push(String(total));
          return logs.join("\n");
        },
        isHidden: true,
        hint: "When all stream inputs are valid integers, make sure your loop terminates at 'END' and prints the total sum without extra error logs."
      }
    ]
  },

  {
    id: 21,
    title: "Matrix Scaling Engine",
    prompt: "Write a function named 'scale_matrix' that takes an array list of integer values and a scaling multiplier factor. Return a brand-new list where every value is multiplied by that factor. Read the numbers from input line 1, and the scaling factor from line 2. Print out the transformed list array.",
    starterCode: "def scale_matrix(numbers, factor):\n    # Write structural functional scaling sequence here\n\nnums = list(map(int, input().split()))\nf = int(input())\nprint(scale_matrix(nums, f))",
    sampleInput: "2 4 6\n3",
    expectedOutput: (input: string) => {
      const lines = input.trim().split("\n");
      const numbers = lines[0].trim().split(/\s+/).map(Number);
      const factor = Number(lines[1].trim());
      const scaled = numbers.map(x => x * factor);
      return `[${scaled.join(", ")}]`;
    },
    explanation: "Encapsulate sequence loops cleanly within modular arguments using Python function syntax definitions.",
    videoTitle: "Functional Programming Models",
    difficulty: "medium",
    testCases: [
      {
        input: "2 4 6\n3",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const numbers = lines[0].trim().split(/\s+/).map(Number);
          const factor = Number(lines[1].trim());
          const scaled = numbers.map(x => x * factor);
          return `[${scaled.join(", ")}]`;
        },
        isHidden: false,
        hint: "Multiply every element in your numbers list by the factor! You can use a list comprehension like [x * factor for x in numbers]."
      },
      {
        input: "1 0 -2\n5",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          const numbers = lines[0].trim().split(/\s+/).map(Number);
          const factor = Number(lines[1].trim());
          const scaled = numbers.map(x => x * factor);
          return `[${scaled.join(", ")}]`;
        },
        isHidden: true,
        hint: "Ensure zero and negative numbers are multiplied correctly by the factor when scaling the list."
      }
    ]
  },



  // HARD CHALLENGES (22 - 23)
  {
    id: 22,
    title: "Anarchist Sudoku Validator",
    prompt: "Read a 9-line string representing a Sudoku grid puzzle (9 space-separated digits per row). Validate if every row contains unique numbers from 1 to 9. Print 'Valid' or 'Invalid'.",
    starterCode: "grid = [list(map(int, input().split())) for _ in range(9)]\n# Check rows for numbers 1-9",
    sampleInput: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9",
    expectedOutput: (input: string) => {
      const lines = input.trim().split("\n");
      for (let line of lines) {
        const row = line.trim().split(/\s+/).map(Number);
        const unique = new Set(row);
        if (unique.size !== 9 || row.some(n => n < 1 || n > 9)) {
          return "Invalid";
        }
      }
      return "Valid";
    },
    explanation: "Using sets helps efficiently deduplicate data to confirm array matrix structures match specific sizes.",
    videoTitle: "Working with Matrices and Sets",
    difficulty: "hard",
    testCases: [
      {
        input: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          for (let line of lines) {
            const row = line.trim().split(/\s+/).map(Number);
            const unique = new Set(row);
            if (unique.size !== 9 || row.some(n => n < 1 || n > 9)) {
              return "Invalid";
            }
          }
          return "Valid";
        },
        isHidden: false,
        hint: "For each row in your grid, verify that len(set(row)) == 9 and all values are between 1 and 9!"
      },
      {
        input: "1 1 1 1 1 1 1 1 1\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9",
        expectedOutput: (input: string) => {
          const lines = input.trim().split("\n");
          for (let line of lines) {
            const row = line.trim().split(/\s+/).map(Number);
            const unique = new Set(row);
            if (unique.size !== 9 || row.some(n => n < 1 || n > 9)) {
              return "Invalid";
            }
          }
          return "Valid";
        },
        isHidden: true,
        hint: "If any row contains duplicate numbers or missing values, your program should print 'Invalid'."
      }
    ]
  },

  {
    id: 23,
    title: "Run-Length Data Encoder",
    prompt: "Implement a compression algorithm. Read a text string (e.g., 'AAABBC') from input and collapse sequential duplicates into a character count map string (e.g., '3A2B1C').",
    starterCode: "string_data = input().strip()\n# Implement your compression logic",
    sampleInput: "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB",
    expectedOutput: (input: string) => {
      const str = input.trim();
      if (!str) return "";
      let compressed = "";
      let count = 1;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
          count++;
        } else {
          compressed += count + str[i];
          count = 1;
        }
      }
      return compressed;
    },
    explanation: "Iterate over the items tracking structural change boundary intervals to accumulate running frequency values.",
    videoTitle: "Data Compression Algorithms: RLE",
    difficulty: "hard",
    testCases: [
      {
        input: "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB",
        expectedOutput: (input: string) => {
          const str = input.trim();
          if (!str) return "";
          let compressed = "";
          let count = 1;
          for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
              count++;
            } else {
              compressed += count + str[i];
              count = 1;
            }
          }
          return compressed;
        },
        isHidden: false,
        hint: "Count consecutive matching characters and append the count followed by the character (e.g., 'WWWW' becomes '4W')."
      },
      {
        input: "AAABBC",
        expectedOutput: (input: string) => {
          const str = input.trim();
          if (!str) return "";
          let compressed = "";
          let count = 1;
          for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
              count++;
            } else {
              compressed += count + str[i];
              count = 1;
            }
          }
          return compressed;
        },
        isHidden: true,
        hint: "Make sure you reset your consecutive run counter back to 1 every time the current character differs from the next!"
      },
      {
        input: "A",
        expectedOutput: (input: string) => {
          const str = input.trim();
          if (!str) return "";
          let compressed = "";
          let count = 1;
          for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
              count++;
            } else {
              compressed += count + str[i];
              count = 1;
            }
          }
          return compressed;
        },
        isHidden: true,
        hint: "Ensure single non-repeating characters properly output with a count prefix of 1."
      }
    ]
  }
]
