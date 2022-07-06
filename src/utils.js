// this function is for finding wall pairs which can hold water
export const findPairs = (arr) => {
  const pairs = []
  let counter = false
  let index = 0
  let start = 0
  let end = 0
  for (let i = 0; i < arr.length; i++) {
    index += 1
    if (arr[i] !== 0 && counter === false && !Boolean(arr[i + 1])) {
      if (start === 0 && !Boolean(arr[i + 1])) start = index
      pairs.push(arr[i])
      counter = true
      if (pairs.length && pairs.length - 1 !== 0) {
        end = index
        break
      }
      continue
    }
    if (arr[i] !== 0 && counter === false && Boolean(arr[i + 1]) && pairs.length && pairs.length - 1 !== 0) {
      pairs.push(arr[i])
      end = index
      break
    }
    if (counter = true && arr[i] === 0) {
      if (pairs.length !== 0) pairs.push(arr[i])
      counter = false
      continue
    }
  }
  return [pairs, index, start, end]
}

export const createMatrix = (list, waterIndex, walls, wallIndex) => {
  const arr = []
  const height = [...list].sort((a, b) => b - a)[0]
  for (let i = height; i > 0; i--) {
    const items = []
    list.forEach((item, position) => {
      const heights = {}
      wallIndex.forEach((element, posi) => {
        let count = element.start;
        while (count < element.end) {
          heights[`${count}`] = walls[posi].sort((a, b) => b - a)[1]
          count += 1
        }
      })
      const keys = Object.keys(heights).map(item => parseInt(item))
      if (
        waterIndex.includes(position) &&
        item === 0 &&
        (items[items.length - 1] === 1 || items[items.length - 1] === 2)
        && keys.includes(position)
        && i <= heights[position]
      ) {
        items.push(2)
      }
      else if (i <= item && !waterIndex.includes(position)) items.push(1)
      else items.push(0)
    })
    arr.push(items)
  }
  return arr
}

export const calculateWaterPosition = (wallIndex) => {
  const index = []
  wallIndex.forEach(item => {
    let counter = item.start + 1;
    while (counter < item.end) {
      index.push(counter)
      counter += 1
    }
  })
  return index
}

export const calculateMatrixData = (data) => {
  const newMatrix = [...data]
  const pairs = []

  for (let i = 0; i < newMatrix.length; i++) {
    let start = false
    let startPos = 0
    for (let j = 0; j < newMatrix[i].length; j++) {
      if (start === true && newMatrix[i][j] === 1) {
        start = false
        pairs.push([startPos, j])
      }
      if (newMatrix[i][j] === 1 && newMatrix[i][j + 1] === 0) {
        start = true
        startPos = j
      }
      if (j === newMatrix[i].length - 1 && start === true) pairs.push([])
    }
    startPos = 0
    start = false
  }

  for (let j = 0; j < pairs.length; j++) {
    for (let i = pairs[j][0] + 1; i < pairs[j][1]; i++) {
      newMatrix[j][i] = 2
    }
  }
  return newMatrix
}