export const demos = [
  {
    id: "bubble_sort",
    name: "Bubble Sort",
    labels: { a: "Array (comma separated ints)", b: "Optional: stop after N passes (blank = full)" },
    defaults: { inputA: "5,1,4,2,8", inputB: "" },
    explain: [
      "Goal: Sort an array in ascending order by repeatedly swapping adjacent out of order items.",
      "Inputs:",
      "  Input A: comma separated integers",
      "  Input B: optional number of passes to run",
      "Output:",
      "  Prints the array after each pass, plus total passes and swaps.",
      "Time complexity: O(n^2) worst and average. Best case O(n) with early exit.",
      "Space complexity: O(1) extra space.",
      "Notes: Stable sort if you only swap when left > right."
    ].join("\n"),
    code: `def bubble_sort(arr, max_passes=None):
    n = len(arr)
    passes = 0
    swaps = 0

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
                swapped = True
        passes += 1
        print(f"After pass {passes}: {arr}")

        if max_passes is not None and passes >= max_passes:
            break

        if not swapped:
            break

    return arr, passes, swaps

arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
max_passes = int(inputB) if inputB.strip() != "" else None

sorted_arr, passes, swaps = bubble_sort(arr, max_passes)
print("Sorted (current state):", sorted_arr)
print("Passes:", passes)
print("Swaps:", swaps)
`
  },

  {
    id: "insertion_sort",
    name: "Insertion Sort",
    labels: { a: "Array (comma separated ints)", b: "Optional: stop after N insert steps (blank = full)" },
    defaults: { inputA: "9,5,1,4,3", inputB: "" },
    explain: [
      "Goal: Build a sorted prefix by inserting each next element into its correct position.",
      "Inputs:",
      "  Input A: comma separated integers",
      "  Input B: optional number of insertion steps to run",
      "Output:",
      "  Prints the array after each insertion step.",
      "Time complexity: O(n^2) worst and average. Best case O(n) when already sorted.",
      "Space complexity: O(1) extra space.",
      "Notes: Stable. Good for small arrays."
    ].join("\n"),
    code: `def insertion_sort(arr, max_steps=None):
    steps = 0
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key
        steps += 1
        print(f"After step {steps} (insert index {i}): {arr}")

        if max_steps is not None and steps >= max_steps:
            break

    return arr, steps

arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
max_steps = int(inputB) if inputB.strip() != "" else None

sorted_arr, steps = insertion_sort(arr, max_steps)
print("Sorted (current state):", sorted_arr)
print("Insertion steps:", steps)
`
  },

  {
    id: "selection_sort",
    name: "Selection Sort",
    labels: { a: "Array (comma separated ints)", b: "Optional: stop after N selections (blank = full)" },
    defaults: { inputA: "64,25,12,22,11", inputB: "" },
    explain: [
      "Goal: Repeatedly select the smallest remaining element and place it at the next position.",
      "Inputs:",
      "  Input A: comma separated integers",
      "  Input B: optional number of selections to run",
      "Output:",
      "  Prints the array after each selection and swap.",
      "Time complexity: O(n^2) in all cases.",
      "Space complexity: O(1) extra space.",
      "Notes: Not stable in its basic swap form. Few swaps compared to bubble sort."
    ].join("\n"),
    code: `def selection_sort(arr, max_steps=None):
    n = len(arr)
    steps = 0

    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        steps += 1
        print(f"After step {steps} (place min at index {i}): {arr}")

        if max_steps is not None and steps >= max_steps:
            break

    return arr, steps

arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
max_steps = int(inputB) if inputB.strip() != "" else None

sorted_arr, steps = selection_sort(arr, max_steps)
print("Sorted (current state):", sorted_arr)
print("Selection steps:", steps)
`
  },

  {
    id: "quick_sort",
    name: "Quick Sort",
    labels: { a: "Array (comma separated ints)", b: "Optional: pivot mode (last or middle)" },
    defaults: { inputA: "10,7,8,9,1,5", inputB: "last" },
    explain: [
      "Goal: Sort by partitioning around a pivot, then recursively sorting left and right partitions.",
      "Inputs:",
      "  Input A: comma separated integers",
      "  Input B: pivot mode: 'last' or 'middle'",
      "Output:",
      "  Prints partitions as they occur, plus final sorted array.",
      "Time complexity: Average O(n log n). Worst case O(n^2) with bad pivots.",
      "Space complexity: O(log n) average recursion depth, O(n) worst case.",
      "Notes: Not stable. Very fast in practice with good pivot choices."
    ].join("\n"),
    code: `def choose_pivot_index(lo, hi, mode):
    if mode == "middle":
        return (lo + hi) // 2
    return hi

def lomuto_partition(arr, lo, hi, pivot_mode):
    p_idx = choose_pivot_index(lo, hi, pivot_mode)
    arr[p_idx], arr[hi] = arr[hi], arr[p_idx]
    pivot = arr[hi]

    i = lo
    for j in range(lo, hi):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    arr[i], arr[hi] = arr[hi], arr[i]
    return i

def quick_sort(arr, lo, hi, pivot_mode):
    if lo >= hi:
        return
    p = lomuto_partition(arr, lo, hi, pivot_mode)
    print(f"Partition at index {p}, pivot {arr[p]}: {arr}")
    quick_sort(arr, lo, p - 1, pivot_mode)
    quick_sort(arr, p + 1, hi, pivot_mode)

arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
pivot_mode = inputB.strip().lower() if inputB.strip() != "" else "last"
if pivot_mode not in ["last", "middle"]:
    pivot_mode = "last"

quick_sort(arr, 0, len(arr) - 1, pivot_mode)
print("Sorted:", arr)
`
  },

  {
    id: "binary_search",
    name: "Binary Search",
    labels: { a: "Sorted array (comma separated ints)", b: "Target integer" },
    defaults: { inputA: "1,3,4,7,9,11,15", inputB: "9" },
    explain: [
      "Goal: Find the index of a target in a sorted array by halving the search range each step.",
      "Inputs:",
      "  Input A: sorted comma separated integers",
      "  Input B: target integer",
      "Output:",
      "  Prints index and each step as (lo, mid, hi, mid_value).",
      "Time complexity: O(log n).",
      "Space complexity: O(1).",
      "Notes: Array must be sorted."
    ].join("\n"),
    code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    steps = []
    while lo <= hi:
        mid = (lo + hi) // 2
        steps.append((lo, mid, hi, arr[mid]))
        if arr[mid] == target:
            return mid, steps
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1, steps

arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
target = int(inputB)

idx, steps = binary_search(arr, target)
print("Index:", idx)
print("Steps (lo, mid, hi, mid_value):")
for s in steps:
    print(s)
`
  },

  {
    id: "fibonacci",
    name: "Fibonacci (iterative)",
    labels: { a: "n (non negative integer)", b: "Optional: show sequence up to n (yes or no)" },
    defaults: { inputA: "10", inputB: "yes" },
    explain: [
      "Goal: Compute Fibonacci numbers efficiently using iteration.",
      "Inputs:",
      "  Input A: n",
      "  Input B: 'yes' to print the sequence up to n, otherwise only print F(n).",
      "Output:",
      "  Prints F(n) and optionally the sequence.",
      "Time complexity: O(n).",
      "Space complexity: O(1) extra space.",
      "Notes: F(0)=0, F(1)=1."
    ].join("\n"),
    code: `n = int(inputA)
show = inputB.strip().lower() == "yes"

a, b = 0, 1
seq = []
for i in range(n + 1):
    if show:
        seq.append(a)
    a, b = b, a + b

# after loop, a is F(n+1) and seq[-1] is F(n) if show
# compute F(n) directly:
a, b = 0, 1
for _ in range(n):
    a, b = b, a + b

print("F(n):", a)
if show:
    print("Sequence up to n:", seq)
`
  },

  {
    id: "min_max_array",
    name: "Max and Min in Array",
    labels: { a: "Array (comma separated ints)", b: "Optional: show running updates (yes or no)" },
    defaults: { inputA: "3,1,9,2,9,5,-4", inputB: "yes" },
    explain: [
      "Goal: Find the minimum and maximum values in a single pass.",
      "Inputs:",
      "  Input A: comma separated integers",
      "  Input B: 'yes' to show running updates",
      "Output:",
      "  Prints min and max, and optionally the update steps.",
      "Time complexity: O(n).",
      "Space complexity: O(1)."
    ].join("\n"),
    code: `arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
show = inputB.strip().lower() == "yes"

if len(arr) == 0:
    print("Error: array is empty")
else:
    mn = arr[0]
    mx = arr[0]
    if show:
        print(f"Start: mn={mn}, mx={mx}")

    for i in range(1, len(arr)):
        v = arr[i]
        changed = False
        if v < mn:
            mn = v
            changed = True
        if v > mx:
            mx = v
            changed = True
        if show and changed:
            print(f"Index {i}, value {v}: mn={mn}, mx={mx}")

    print("Min:", mn)
    print("Max:", mx)
`
  }
];

