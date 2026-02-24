export const demos = [
    {
        id: "binary_search",
        name: "Binary Search",
        defaults: { inputA: "1,3,4,7,9,11,15", inputB: "9" },
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
        id: "bubble_sort",
        name: "Bubble Sort",
        defaults: { inputA: "5,1,4,2,8", inputB: "" },
        code: `arr = [int(x) for x in inputA.split(",") if x.strip() != ""]
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
    if not swapped:
        break

print("Sorted:", arr)
print("Passes:", passes)
print("Swaps:", swaps)
`
    },
    {
        id: "euclid_gcd",
        name: "Euclid's GCD",
        defaults: { inputA: "252", inputB: "105" },
        code: `a = int(inputA)
b = int(inputB)

steps = []
while b != 0:
    steps.append((a, b, a % b))
    a, b = b, a % b

print("GCD:", a)
print("Steps (a, b, a%b):")
for s in steps:
    print(s)
`
    }
];