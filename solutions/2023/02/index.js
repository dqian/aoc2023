export const parseInput = (input) => input.split('\n')

const MAX_REVEAL = {
  'red': 12,
  'green': 13,
  'blue': 14,
}

const validGame = (game) => {
  for (const [color, count] of Object.entries(game)) {
    if (game[color] > MAX_REVEAL[color]) {
      return false
    }
  }
  return true
}

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const parseGame = (gameStr) => {
  const game = {}
  const handfuls = gameStr.split(":")[1].trim().split(";")
  for (let handfulStr of handfuls) {
    const colors = handfulStr.trim().split(",")
    for (let colorStr of colors) {
      const countColor = colorStr.trim().split(" ")
      const count = parseInt(countColor[0])
      const color = countColor[1]
      if (!(color in game) || count > game[color]) {
        game[color] = count
      }
    }
  }
  return game
}

export const part1 = (input) => {
  return input.reduce((acc, gameStr, gameIdx) => {
    const gameNumber = gameIdx+1
    const game = parseGame(gameStr)
    return validGame(game) ? acc+gameNumber : acc
  }, 0)
}

export const part2 = (input) => {
  return input.reduce((acc, gameStr) => {
    const game = parseGame(gameStr)
    return acc + game['red']*game['green']*game['blue']
  }, 0)
  
}
