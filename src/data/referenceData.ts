export type ReferenceItem = {
  id: string
  title: string
  visualType: string
  description: string
  example: string
  output?: string
  notes?: string[]
  size?: string
  gridArea?: string
}

// Organize into boxes of 6 items each with specific grid areas
export const bentoBoxes: ReferenceItem[][] = [
  // Box 1: Basic Concepts
  [
    {
      id: "print",
      title: "print()",
      visualType: "print",
      gridArea: "top-left",
      description: "Outputs text or values to the console. Used to display information to the user.",
      example: `print("Hello, World!")
print(42)
print("The answer is:", 42)`,
      output: `Hello, World!
42
The answer is: 42`,
      notes: [
        "Automatically adds a newline at the end",
        "Can print multiple values separated by commas",
        "Use sep parameter to change separator: print(a, b, sep='-')"
      ]
    },
    {
      id: "variables",
      title: "Variable Names",
      visualType: "variable",
      gridArea: "top-center-right",
      description: "Rules for naming variables in Python.",
      example: `# Valid variable names
name = "Alice"
age_2023 = 25
_private = True
totalScore = 100

# Invalid variable names
# 2age = 25        # Can't start with number
# my-var = 10      # No hyphens
# for = 5          # Can't use keywords`,
      notes: [
        "Must start with letter or underscore",
        "Can contain letters, numbers, and underscores",
        "Case-sensitive (age and Age are different)",
        "Cannot use Python keywords (if, for, while, etc.)"
      ]
    },
    {
      id: "operators",
      title: "Basic Operators",
      visualType: "operators",
      gridArea: "center-left",
      description: "Basic mathematical operators for arithmetic operations.",
      example: `a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.333...`,
      output: `13
7
30
3.3333333333333335`,
      notes: [
        "Division (/) always returns a float",
        "Use parentheses for order of operations"
      ]
    },
    {
      id: "complex-ops",
      title: "Advanced Operators",
      visualType: "complex-ops",
      gridArea: "center-right",
      description: "Floor division, modulo, and exponentiation operators.",
      example: `a = 17
b = 5

print(a // b)  # Floor division: 3
print(a % b)   # Modulo (remainder): 2
print(a ** b)  # Exponentiation: 1419857`,
      output: `3
2
1419857`,
      notes: [
        "// rounds down to nearest integer",
        "% returns the remainder after division",
        "** is power/exponentiation (a^b)"
      ]
    },
    {
      id: "math",
      title: "Math Module",
      visualType: "math",
      gridArea: "bottom-left-center",
      description: "Mathematical functions and constants from the math module.",
      example: `import math

print(math.pi)           # 3.14159...
print(math.sqrt(16))     # 4.0
print(math.floor(3.7))   # 3
print(math.ceil(3.2))    # 4
print(math.pow(2, 3))    # 8.0`,
      output: `3.141592653589793
4.0
3
4
8.0`,
      notes: [
        "Must import math module first",
        "pi and e are constants",
        "floor() rounds down, ceil() rounds up",
        "sqrt() returns square root"
      ]
    },
    {
      id: "printf",
      title: "String Formatting",
      visualType: "print",
      gridArea: "bottom-right",
      description: "Format strings with variables using f-strings, .format(), or % formatting.",
      example: `name = "Alice"
age = 25

# f-string (recommended)
print(f"My name is {name} and I am {age}")

# .format() method
print("My name is {} and I am {}".format(name, age))`,
      output: `My name is Alice and I am 25
My name is Alice and I am 25`,
      notes: [
        "f-strings are the modern, preferred method (Python 3.6+)",
        "Can format numbers: f'{pi:.2f}' for 2 decimal places"
      ]
    }
  ],
  // Box 2: Control Flow
  [
    {
      id: "if",
      title: "If Statements",
      visualType: "if",
      gridArea: "top-left",
      description: "Conditional execution based on boolean expressions.",
      example: `age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")`,
      output: `You are an adult`,
      notes: [
        "Indentation is required (4 spaces recommended)",
        "elif is short for 'else if'",
        "else is optional",
        "Comparison operators: ==, !=, <, >, <=, >="
      ]
    },
    {
      id: "for",
      title: "For Loops",
      visualType: "for",
      gridArea: "top-center-right",
      description: "Iterate over sequences like ranges, lists, and strings.",
      example: `# Loop through range
for i in range(5):
    print(i)

# Loop through list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`,
      output: `0
1
2
3
4
apple
banana
cherry`,
      notes: [
        "range(n) generates numbers from 0 to n-1",
        "range(start, stop, step) for custom ranges",
        "Can iterate over any iterable (lists, strings, etc.)"
      ]
    },
    {
      id: "while",
      title: "While Loops",
      visualType: "while",
      gridArea: "center-left",
      description: "Repeat code while a condition is true.",
      example: `count = 0

while count < 5:
    print(count)
    count += 1

print("Done!")`,
      output: `0
1
2
3
4
Done!`,
      notes: [
        "Be careful to avoid infinite loops",
        "Condition is checked before each iteration",
        "Use break to exit loop early",
        "Use continue to skip to next iteration"
      ]
    },
    {
      id: "conversion",
      title: "Type Conversion",
      visualType: "conversion",
      gridArea: "center-right",
      description: "Convert between data types (int, float, str, bool).",
      example: `# String to int
num = int("42")        # 42

# String to float
pi = float("3.14")     # 3.14

# Number to string
text = str(100)        # "100"

# To boolean
bool(1)                # True
bool(0)                # False`,
      notes: [
        "int() truncates decimals, doesn't round",
        "Conversion can raise ValueError if invalid",
        "Empty strings/collections are False, others True"
      ]
    },
    {
      id: "conversion-quirks",
      title: "Conversion Quirks",
      visualType: "error",
      gridArea: "bottom-left-center",
      description: "Common pitfalls and surprising behavior with type conversion.",
      example: `# This will ERROR
# num = int("2.5")
# ValueError: invalid literal for int()

# Must convert to float first
num = int(float("2.5"))  # 2

# Boolean quirks
print(bool("0"))         # True (non-empty string)
print(bool(""))          # False (empty string)
print(bool(0))           # False
print(bool(-1))          # True`,
      output: `True
False
False
True`,
      notes: [
        'int() cannot parse "2.5" directly - use float() first',
        'bool("0") is True because "0" is a non-empty string',
        "Only 0, 0.0, empty string, None, and empty collections are False"
      ]
    },
    {
      id: "input",
      title: "User Input",
      visualType: "variable",
      gridArea: "bottom-right",
      description: "Get input from the user.",
      example: `name = input("Enter your name: ")
print(f"Hello, {name}!")

# Convert input to number
age = int(input("Enter your age: "))
print(f"You are {age} years old")`,
      notes: [
        "input() always returns a string",
        "Convert to int/float if you need numbers",
        "Use try/except to handle invalid input"
      ]
    }
  ],
  // Box 3: Data Structures
  [
    {
      id: "lists",
      title: "Lists",
      visualType: "list",
      gridArea: "top-left",
      description: "Ordered, mutable collections of items.",
      example: `# Create list
fruits = ["apple", "banana", "cherry"]

# Access items
print(fruits[0])        # apple
print(fruits[-1])       # cherry

# Modify
fruits.append("orange")
fruits[1] = "blueberry"

# Length
print(len(fruits))      # 4`,
      output: `apple
cherry
4`,
      notes: [
        "Lists are mutable (can be changed)",
        "Index starts at 0",
        "Negative indices count from end (-1 is last)",
        "Common methods: append(), remove(), pop(), sort()"
      ]
    },
    {
      id: "dicts",
      title: "Dictionaries",
      visualType: "dict",
      gridArea: "top-center-right",
      description: "Key-value pairs for storing associated data.",
      example: `# Create dictionary
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

# Access values
print(student["name"])      # Alice
print(student.get("age"))   # 20

# Add/modify
student["email"] = "alice@email.com"
student["age"] = 21`,
      output: `Alice
20`,
      notes: [
        "Keys must be unique and immutable",
        "Use .get() to avoid KeyError",
        "Common methods: keys(), values(), items()",
        "Can check if key exists: 'name' in student"
      ]
    },
    {
      id: "tuples",
      title: "Tuples",
      visualType: "tuple",
      gridArea: "center-left",
      description: "Ordered, immutable collections of items.",
      example: `# Create tuple
coordinates = (10, 20)
rgb = (255, 128, 0)

# Access items
print(coordinates[0])   # 10
print(rgb[1])           # 128

# Unpack tuple
x, y = coordinates
print(x, y)             # 10 20`,
      output: `10
128
10 20`,
      notes: [
        "Tuples are immutable (cannot be changed)",
        "Faster than lists for fixed data",
        "Use parentheses () instead of brackets []",
        "Single item tuple needs comma: (1,)"
      ]
    },
    {
      id: "functions",
      title: "Functions",
      visualType: "function",
      gridArea: "center-right",
      description: "Reusable blocks of code with parameters and return values.",
      example: `def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

# Call functions
message = greet("Alice")
print(message)          # Hello, Alice!

result = add(5, 3)
print(result)           # 8`,
      output: `Hello, Alice!
8`,
      notes: [
        "Use def keyword to define functions",
        "Parameters go in parentheses",
        "return sends value back to caller",
        "Functions without return give None"
      ]
    },
    {
      id: "files",
      title: "File Operations",
      visualType: "file",
      gridArea: "bottom-left-center",
      description: "Read from and write to files.",
      example: `# Write to file
with open("data.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Line 2")

# Read from file
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Read line by line
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())`,
      notes: [
        "'w' mode overwrites file, 'a' appends",
        "'r' mode is for reading",
        "with statement automatically closes file",
        "Always use with to prevent file leaks"
      ]
    },
    {
      id: "strings",
      title: "String Methods",
      visualType: "print",
      gridArea: "bottom-right",
      description: "Common string manipulation methods.",
      example: `text = "Hello World"

print(text.upper())       # HELLO WORLD
print(text.lower())       # hello world
print(text.replace("H", "J"))  # Jello World
print(text.split())       # ['Hello', 'World']
print("  text  ".strip()) # text`,
      output: `HELLO WORLD
hello world
Jello World
['Hello', 'World']
text`,
      notes: [
        "Strings are immutable - methods return new strings",
        "strip() removes whitespace from both ends",
        "split() breaks string into list"
      ]
    }
  ],
  // Box 4: Error Handling & Matplotlib
  [
    {
      id: "errors",
      title: "Error Handling",
      visualType: "error",
      gridArea: "top-left",
      description: "Handle exceptions to prevent crashes.",
      example: `try:
    num = int(input("Enter number: "))
    result = 10 / num
    print(result)
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Cleanup code here")`,
      notes: [
        "try block contains code that might error",
        "except blocks handle specific errors",
        "finally block always runs (cleanup)",
        "Common errors: ValueError, TypeError, IndexError, KeyError"
      ]
    },
    {
      id: "matplotlib-basic",
      title: "Line Plot",
      visualType: "matplotlib",
      gridArea: "top-center-right",
      description: "Create basic line plots with matplotlib.",
      example: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.title("Simple Line Plot")
plt.show()`,
      notes: [
        "Import with: import matplotlib.pyplot as plt",
        "Use plt.plot() for line graphs",
        "Always call plt.show() to display",
        "Add labels and title for clarity"
      ]
    },
    {
      id: "matplotlib-scatter",
      title: "Scatter Plot",
      visualType: "matplotlib",
      gridArea: "center-left",
      description: "Create scatter plots to show data points.",
      example: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

plt.scatter(x, y, color='red', marker='o')
plt.xlabel("X values")
plt.ylabel("Y values")
plt.title("Scatter Plot")
plt.show()`,
      notes: [
        "Use plt.scatter() for scatter plots",
        "Customize with color and marker parameters",
        "Good for showing correlations",
        "marker options: 'o', 's', '^', '*', etc."
      ]
    },
    {
      id: "matplotlib-bar",
      title: "Bar Chart",
      visualType: "matplotlib",
      gridArea: "center-right",
      description: "Create bar charts for categorical data.",
      example: `import matplotlib.pyplot as plt

categories = ['A', 'B', 'C', 'D']
values = [25, 40, 30, 55]

plt.bar(categories, values, color='skyblue')
plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Bar Chart")
plt.show()`,
      notes: [
        "Use plt.bar() for vertical bars",
        "Use plt.barh() for horizontal bars",
        "Good for comparing categories",
        "Can customize colors per bar with list"
      ]
    },
    {
      id: "matplotlib-multiple",
      title: "Multiple Plots",
      visualType: "matplotlib",
      gridArea: "bottom-left-center",
      description: "Display multiple plots and customize appearance.",
      example: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y1 = [1, 4, 9, 16]
y2 = [1, 2, 3, 4]

plt.plot(x, y1, label='Squared', color='blue')
plt.plot(x, y2, label='Linear', color='red')

plt.legend()
plt.grid(True)
plt.xlabel("X")
plt.ylabel("Y")
plt.title("Multiple Lines")
plt.show()`,
      notes: [
        "Can plot multiple lines on same graph",
        "Use label parameter and plt.legend() for labels",
        "plt.grid(True) adds gridlines",
        "Customize line style: linestyle='--', linewidth=2"
      ]
    },
    {
      id: "list-comprehension",
      title: "List Comprehension",
      visualType: "list",
      gridArea: "bottom-right",
      description: "Create lists in a concise, readable way.",
      example: `# Basic comprehension
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# With condition
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Transform strings
words = ["hello", "world"]
upper = [w.upper() for w in words]
print(upper)  # ['HELLO', 'WORLD']`,
      output: `[0, 1, 4, 9, 16]
[0, 2, 4, 6, 8]
['HELLO', 'WORLD']`,
      notes: [
        "Syntax: [expression for item in iterable if condition]",
        "More concise than for loops",
        "Can replace map() and filter()"
      ]
    }
  ]
]

// Keep original flat array for backwards compatibility if needed
export const referenceData: ReferenceItem[] = bentoBoxes.flat()