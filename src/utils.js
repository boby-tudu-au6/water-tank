export const findPairs = (arr) => {
  const pairs = []
  let counter = false
  let index = 0
  let start = 0
  let end = 0
  for (let i = 0; i < arr.length; i++) {
    index += 1
    if (arr[i] !== 0 && counter === false) {
      if (start === 0) start = index
      pairs.push(arr[i])
      counter = true
      if (pairs.length && pairs.length - 1 !== 0) {
        end = index
        break
      }
      continue
    }
    if (counter = true && arr[i] === 0) {
      if (pairs.length !== 0) pairs.push(arr[i])
      counter = false
      continue
    }
  }
  return [pairs, index, start, end]
}

export const createMatrix = (list, waterIndex) => {
  const arr = []
  const height = [...list].sort((a, b) => b - a)[0]
  for (let i = height; i > 0; i--) {
    const items = []
    list.forEach((item, position) => {
      if (
        waterIndex.includes(position) &&
        item === 0 &&
        (items[items.length - 1] === 1 || items[items.length - 1] === 2)
      ) items.push(2)
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