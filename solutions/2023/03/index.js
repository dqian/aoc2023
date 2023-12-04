export const parseInput = (input) => input.split('\n')

const coordinateKey = (x, y) => {
  return `${x},${y}`
}

const collectGridDigitsAndSymbols = (input) => {
  const gridDigits = {}
  let symbolCoordinates = [];
  
  for (let [y, line] of input.entries()) {
    for (let [x, char] of line.split("").entries()) {
      if (char == ".") {
        continue
      }
      if (char.match(/^\d+$/)) {
        gridDigits[coordinateKey(x,y)] = char
        continue
      }
      symbolCoordinates = [...symbolCoordinates,[x, y, char]]
    }
  }

  return [gridDigits, symbolCoordinates]
}

const SEARCH_SPACE_VECTORS = [
  [-1,-1],
  [-1,0],
  [0,-1],
  [1,1],
  [1,0],
  [0,1],
  [1, -1],
  [-1,1]
]

const getSearchSpaceCoordinates = (x, y, X_MAX, Y_MAX) => {
  return SEARCH_SPACE_VECTORS.map(ssv => [x+ssv[0], y+ssv[1]]).filter(ss => ss[0] >= 0 && ss[0] < X_MAX && ss[1] >= 0 && ss[1] < Y_MAX)
}

const parseNumberOnCoordinate = (gridDigits, x, y) => {
  let visitedCoordinates = []
  let numberStr = "";

  const coordKey = coordinateKey(x, y);
  if (coordKey in gridDigits) {
    numberStr = gridDigits[coordKey]
    visitedCoordinates = [...visitedCoordinates, [x, y]]
  } else {
    return [0, []]
  }

  // search left
  let leftOffset = -1
  while (true) {
    const coordKey = coordinateKey(x+leftOffset, y);
    if (coordKey in gridDigits) {
      numberStr = `${gridDigits[coordKey]}${numberStr}` // prepend
      visitedCoordinates = [...visitedCoordinates, [x+leftOffset, y]]
      leftOffset -= 1
    } else {
      break;
    }
  }

  // search right
  let rightOffset = 1
  while (true) {
    const coordKey = coordinateKey(x+rightOffset, y);
    if (coordKey in gridDigits) {
      numberStr = `${numberStr}${gridDigits[coordKey]}` // append
      visitedCoordinates = [...visitedCoordinates, [x+rightOffset, y]]
      rightOffset += 1
    } else {
      break;
    }
  }

  return [parseInt(numberStr), visitedCoordinates]
}

const identifyAdjacentNumbers = (symbolCoordinates, gridDigits, X_MAX, Y_MAX) => {
  const visitedDigitCoordinates = {}
  let discoveredNumbers = [];

  for (let symbolCoordinate of symbolCoordinates) {
    const searchSpace = getSearchSpaceCoordinates(symbolCoordinate[0], symbolCoordinate[1], X_MAX, Y_MAX)
    for (let searchCoordinate of searchSpace) {
      if (searchCoordinate in visitedDigitCoordinates) {
        continue
      }

      const [partNumber, partNumberCoordinates] = parseNumberOnCoordinate(gridDigits, searchCoordinate[0], searchCoordinate[1])
      for (let pnc of partNumberCoordinates) {
        visitedDigitCoordinates[coordinateKey(pnc[0],pnc[1])] = true
      }
      if (partNumber > 0) {
        discoveredNumbers = [...discoveredNumbers, partNumber]
      }
    }
  }
  return discoveredNumbers
}

const identifyGearRatios = (symbolCoordinates, gridDigits, X_MAX, Y_MAX) => {
  const visitedDigitCoordinates = {}
  let gearRatios = [];

  for (let symbolCoordinate of symbolCoordinates) {
    if (symbolCoordinate[2] != '*') {
      continue
    }
    const searchSpace = getSearchSpaceCoordinates(symbolCoordinate[0], symbolCoordinate[1], X_MAX, Y_MAX)
    let adjacentNumbers = [];

    for (let searchCoordinate of searchSpace) {
      if (searchCoordinate in visitedDigitCoordinates) {
        continue
      }

      const [partNumber, partNumberCoordinates] = parseNumberOnCoordinate(gridDigits, searchCoordinate[0], searchCoordinate[1])
      for (let pnc of partNumberCoordinates) {
        visitedDigitCoordinates[coordinateKey(pnc[0],pnc[1])] = true
      }
      if (partNumber > 0) {
        adjacentNumbers = [...adjacentNumbers, partNumber]
      }
    }
    if (adjacentNumbers.length == 2) {
      gearRatios = [...gearRatios, adjacentNumbers[0]*adjacentNumbers[1]]
    }
  }
  return gearRatios
}

export const part1 = (input) => {
  const Y_MAX = input.length
  const X_MAX = input[0].length


  const [gridDigits, symbolCoordinates] = collectGridDigitsAndSymbols(input)
  const adjacentNumbers = identifyAdjacentNumbers(symbolCoordinates, gridDigits, X_MAX, Y_MAX)

  return adjacentNumbers.reduce((acc, n) => acc+n, 0);
}

export const part2 = (input) => {
  const Y_MAX = input.length
  const X_MAX = input[0].length


  const [gridDigits, symbolCoordinates] = collectGridDigitsAndSymbols(input)
  const gearRatios = identifyGearRatios(symbolCoordinates, gridDigits, X_MAX, Y_MAX)

  return gearRatios.reduce((acc, n) => acc+n, 0);
}
