export type Challenge = {
  id: number
  title: string
  prompt: string
  starterCode: string
  sampleInput: string
  expectedOutput: string | ((input: string) => string)
  explanation: string
  videoId?: string
}


export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Print Hello",
    prompt: "Write a program that prints 'Hello World'",
    starterCode: "print('Hello World')",
    sampleInput: "",
    expectedOutput: "Hello World",
    explanation: "This uses Python's print function."
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
    explanation: "Use input() and int() to read numbers, then print sum."
  },

  {
    id: 3,
    title: "Loop Example",
    prompt: "Print numbers 1 to 5 using a loop",
    starterCode: "for i in range(1, 6):\n    print(i)",
    sampleInput: "",
    expectedOutput: "1\n2\n3\n4\n5",
    explanation: "Use a for loop with range() to iterate numbers."
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
    explanation: "Use a loop to multiply all numbers from 1 to n to compute the factorial."
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
    explanation: "Use the modulo operator % to check if a number is divisible by 2."
  },

  {
    id: 6,
    title: "String Length",
    prompt: "Read a word from input and print the number of characters in it",
    starterCode: "word = input()\nprint(len(word))",
    sampleInput: "python",
    expectedOutput: (input: string) => {
      return String(input.trim().length)
    },
    explanation: "Use len() to find the length of a string."
  },
  
  {
    id: 7,
    title: "Square a Number",
    prompt: "Read a number from input and print its square",
    starterCode: "n = int(input())\nprint(n ** 2)",
    sampleInput: "5",
    expectedOutput: (input: string) => {
      const n = Number(input.trim())
      return String(n * n)
    },
    explanation: "Use the exponent operator ** or multiply the number by itself."
  }

]
