export const parseInput = (input) => input.split('\n')

const countWinningNumbers = (winningNumbers, cardNumbers) => {
  let count = 0;
  const winningSet = new Set(winningNumbers);

  for (let cn of cardNumbers) {
    if (winningSet.has(cn)) {
      count += 1
    }
  }
  return count
}

export const part1 = (input) => {
  let points = 0;
  for (let line of input) {
    const [winningNumbersStr, cardNumbersStr] = line.split(":")[1].trim().split("|")
    const winningNumbers = winningNumbersStr.trim().split(" ").filter(n => !!n.length)
    const cardNumbers = cardNumbersStr.trim().split(" ").filter(n => !!n.length)
    const count = countWinningNumbers(winningNumbers, cardNumbers)
    if (count >= 1) {
      points += 2**(count-1)
    }
  }
  return points
}

export const part2 = (input) => {
  let copiesCounter = {}
  let copies = 0;
  for (let [gameIndex, line] of input.entries()) {
    const [winningNumbersStr, cardNumbersStr] = line.split(":")[1].trim().split("|")
    const winningNumbers = winningNumbersStr.trim().split(" ").filter(n => !!n.length)
    const cardNumbers = cardNumbersStr.trim().split(" ").filter(n => !!n.length)
    const count = countWinningNumbers(winningNumbers, cardNumbers)

    if (!(gameIndex in copiesCounter)) {
      copiesCounter[gameIndex] = 1
    } else {
      copiesCounter[gameIndex] += 1
    }
    copies += copiesCounter[gameIndex]

    for (let i = 0; i < count; i++) {
      const copyGameIndex = gameIndex+i+1
      if (!(copyGameIndex in copiesCounter)) {
        copiesCounter[copyGameIndex] = 0
      }
      copiesCounter[copyGameIndex] += copiesCounter[gameIndex]
    }
  }
  return copies
}
