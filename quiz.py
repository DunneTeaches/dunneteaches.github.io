#!/usr/bin/env python3
"""Interactive Python & Algorithms Quiz — command line."""

import random

QUESTIONS = [
    {
        "question": "What is the time complexity of binary search on a sorted array?",
        "choices": ["A) O(n)", "B) O(n log n)", "C) O(log n)", "D) O(1)"],
        "answer": "C",
        "explanation": "Binary search halves the search space at each step, giving O(log n).",
    },
    {
        "question": "Which sorting algorithm has the best worst-case time complexity?",
        "choices": ["A) Bubble Sort", "B) Insertion Sort", "C) Quick Sort", "D) Merge Sort"],
        "answer": "D",
        "explanation": "Merge Sort guarantees O(n log n) in all cases; Quick Sort degrades to O(n^2) in the worst case.",
    },
    {
        "question": "What data structure does a stack use for its primary operations?",
        "choices": ["A) FIFO (first-in, first-out)", "B) LIFO (last-in, first-out)", "C) Random access", "D) Priority-based"],
        "answer": "B",
        "explanation": "A stack is LIFO: the last element pushed is the first one popped.",
    },
    {
        "question": "In Python, what is the output of: print(type([]))?",
        "choices": ["A) <class 'tuple'>", "B) <class 'dict'>", "C) <class 'list'>", "D) <class 'set'>"],
        "answer": "C",
        "explanation": "Square brackets [] create a list in Python.",
    },
    {
        "question": "What is the space complexity of Bubble Sort?",
        "choices": ["A) O(n)", "B) O(n log n)", "C) O(log n)", "D) O(1)"],
        "answer": "D",
        "explanation": "Bubble Sort is an in-place algorithm; it uses only O(1) extra memory.",
    },
    {
        "question": "Which Python keyword is used to define a function?",
        "choices": ["A) func", "B) define", "C) def", "D) fn"],
        "answer": "C",
        "explanation": "'def' is the keyword used to define a function in Python.",
    },
    {
        "question": "What does the 'in' operator check for in Python lists?",
        "choices": [
            "A) The index of an element",
            "B) Whether an element exists in the list",
            "C) The length of the list",
            "D) Whether the list is sorted",
        ],
        "answer": "B",
        "explanation": "'x in lst' returns True if x is present anywhere in lst.",
    },
    {
        "question": "How many times does Fibonacci(5) call itself recursively (naive recursion)?",
        "choices": ["A) 5", "B) 9", "C) 14", "D) 25"],
        "answer": "C",
        "explanation": "Naive recursive Fibonacci(5) makes 14 recursive calls due to overlapping subproblems.",
    },
    {
        "question": "Which Python built-in function returns the number of items in a list?",
        "choices": ["A) count()", "B) size()", "C) length()", "D) len()"],
        "answer": "D",
        "explanation": "len() returns the number of items in a sequence or collection.",
    },
    {
        "question": "What is the average time complexity of Quick Sort?",
        "choices": ["A) O(n)", "B) O(n^2)", "C) O(n log n)", "D) O(log n)"],
        "answer": "C",
        "explanation": "Quick Sort averages O(n log n) with a good pivot strategy.",
    },
]


def run_quiz(shuffle: bool = True) -> None:
    print("=" * 42)
    print("   Interactive Python & Algorithms Quiz")
    print("=" * 42)
    print("Answer each question by typing A, B, C, or D.")
    print()

    questions = list(QUESTIONS)
    if shuffle:
        random.shuffle(questions)

    score = 0
    total = len(questions)

    for i, q in enumerate(questions, 1):
        print(f"Question {i}/{total}: {q['question']}")
        for choice in q["choices"]:
            print(f"  {choice}")

        while True:
            try:
                answer = input("Your answer (A/B/C/D): ").strip().upper()
            except (EOFError, KeyboardInterrupt):
                print("\nQuiz interrupted.")
                return
            if answer in ("A", "B", "C", "D"):
                break
            print("  Please enter A, B, C, or D.")

        if answer == q["answer"]:
            print("  ✓ Correct!")
            score += 1
        else:
            print(f"  ✗ Incorrect. The correct answer is {q['answer']}.")
        print(f"  Explanation: {q['explanation']}")
        print()

    print("=" * 42)
    print(f"Quiz complete!  Score: {score}/{total}  ({100 * score // total}%)")
    if score == total:
        print("Perfect score — excellent work!")
    elif score >= total * 0.8:
        print("Great job!")
    elif score >= total * 0.5:
        print("Good effort — keep practising!")
    else:
        print("Keep studying — you'll improve!")
    print("=" * 42)


if __name__ == "__main__":
    run_quiz()
