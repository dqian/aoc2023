export const parseInput = (input) => input.split('\n')

export const part1 = (input) => {
  return input.reduce((acc, val) => {
    const numbers = val.match(/\d/g);
    const first = parseInt(numbers[0])
    const last = parseInt(numbers[numbers.length - 1])
    const calibrationVal = first*10 + last
    return acc + calibrationVal
  }, 0)
}

const NUM_STRINGS = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

export const part2 = (input) => {
  return input.reduce((acc, val) => {
    const matchesFromFront = val.match(/\d|one|two|three|four|five|six|seven|eight|nine/g)
    const matchesFromBack = val.split("").reverse().join("").match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g)

    let firstStr = matchesFromFront[0]
    if (firstStr in NUM_STRINGS) {
      firstStr = NUM_STRINGS[firstStr]
    }

    let lastStr = matchesFromBack[0].split("").reverse().join("")
    if (lastStr in NUM_STRINGS) {
      lastStr = NUM_STRINGS[lastStr]
    }

    const first = parseInt(firstStr)
    const last = parseInt(lastStr)
    const calibrationVal = first*10 + last

    return acc + calibrationVal
  }, 0)
}
