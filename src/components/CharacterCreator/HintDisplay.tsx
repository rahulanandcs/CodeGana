import { useState } from 'react'
import type { Challenge } from '../../data/challenges'
import './HintDisplay.css'

import elephantLeft from '../../images/CGhint_facingLeft!.png'

interface HintDisplayProps {
  challenge: Challenge
}

export default function HintDisplay({ challenge }: HintDisplayProps) {
  const [showHint, setShowHint] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const toggleHint = () => {
    if (showHint) {
      setIsClosing(true)
      window.setTimeout(() => {
        setShowHint(false)
        setIsClosing(false)
      }, 320)
    } else {
      setShowHint(true)
      setIsClosing(false)
    }
  }

  // Generate hint text based on challenge
  const getHintText = (challenge: Challenge): string => {
    switch (challenge.id) {
      case 1:
        return "You need to use the print() function to output 'Hello World' to the screen."
      case 2:
        return "Read two numbers using input(), convert them with int(), and add them together using the + operator."
      case 3:
        return "Use a for loop with range(1, 6) to iterate through numbers 1 to 5, printing each one."
      case 4:
        return "Create a variable for the result, then loop from 1 to n, multiplying the result by each number."
      case 5:
        return "Use the modulo operator (%) to check if a number is divisible by 2. If n % 2 == 0, it's even!"
      case 6:
        return "The len() function returns the number of characters in a string. Just pass your string to it!"
      case 7:
        return "Use the ** operator (exponentiation) to square a number, or multiply n by itself."
      case 8:
        return "Loop from 1 to n, and for each iteration, print the asterisk character (*) repeated i times."
      case 9:
        return "Use Python's slice notation [::-1] to reverse a string. This reverses the order of characters."
      case 10:
        return "Compare the age to 21 using the >= operator. If it's 21 or older, print 'Allowed', otherwise 'Denied'."
      case 11:
        return "Import the math module, use math.sqrt() for square root, and math.ceil() to round up."
      case 12:
        return "Create an f-string by prefixing your string with 'f' and putting variables in curly braces: f'{name} is {age} years old.'"
      case 13:
        return "Use a while loop with condition (n > 0). Print n, then decrement it with n -= 1 inside the loop."
      case 14:
        return "A list comprehension filters elements: [x for x in nums if x % 2 == 0] gets all even numbers."
      case 15:
        return "Check multiples with modulo: if i % 3 == 0 and i % 5 == 0, print 'FizzBuzz'. Check 3 and 5 first!"
      case 16:
        return "Sort the list with .sort(), then find the middle value. For even length, average the two middle values."
      case 17:
        return "Create conditions for each winning combination: Rock beats Scissors, Paper beats Rock, Scissors beats Paper."
      case 18:
        return "Check if the item is in the inventory dictionary using 'if item in inventory'. Then check if stock > 0."
      case 19:
        return "Calculate Euclidean distance: sqrt((x2-x1)² + (y2-y1)²). If distance > 10, print 'Far', else 'Near'."
      case 20:
        return "Use a while True loop with try-except. Catch ValueError when parsing invalid integers, and break on 'END'."
      case 21:
        return "Create a function that takes a list and a factor, then returns a new list with each value multiplied by the factor."
      case 22:
        return "Check each row: convert to a set and verify it has exactly 9 unique elements (all from 1-9)."
      case 23:
        return "Loop through the string, count consecutive identical characters, then output count + character (e.g., 3A2B1C)."
      default:
        return "Look at the prompt carefully and break down what the program needs to do step by step."
    }
  }

  return (
    <>
      {/* Hint Button - Same style as tutorial button */}
      <button
        className={`hint-button ${showHint ? 'active' : ''}`}
        onClick={toggleHint}
        aria-label={showHint ? 'Hide hint' : 'Show hint'}
      >
        <span className="hint-icon" aria-hidden="true"></span>
        Hint
      </button>

      {/* Hint Display - Elephant slides in from right */}
      <div className={`hint-display ${showHint ? 'hint-display-visible' : ''} ${isClosing ? 'hint-display-closing' : ''}`}>
        {/* Elephant on Right Side */}
        <div className="hint-elephant-container">
          <img
            src={elephantLeft}
            alt="Hint mascot elephant"
            className="hint-elephant-image"
          />
        </div>

        {/* Cloud Speech Bubble */}
        <div className="hint-speech-bubble">
          <h2 className="hint-bubble-text">{getHintText(challenge)}</h2>
          <div className="hint-bubble-triangle"></div>
        </div>
      </div>
    </>
  )
}