import './App.css';
import { useEffect, useState } from 'react';
import { calculateWaterPosition, createMatrix, findPairs } from './utils';

function App() {
  const [list, setList] = useState('0,3,0,3')
  const [totalunit, setTotalUnit] = useState(0)
  const [matrix, setMatrix] = useState(null)
  const [array, setArray] = useState([])

  useEffect(() => {
    const data = list.split(',').map(item => parseInt(item))
    setArray(data)
  }, [list])

  // 1. first step is to find wall pair
  // 2. then calculate water inside it

  


  const calculateResult = (arr) => {
    const walls = [];
    let unit = 0
    let counter = 0
    const wallIndex = []
    while (arr.length > 2) {
      let [pair, index, start, end] = findPairs(arr)
      walls.push(pair)
      arr = arr.slice(index - 1)
      start = start - 1
      end = end - 1
      wallIndex.push({ start: (start + counter), end: (end + counter) })
      counter += end
    }
    const waterIndex = calculateWaterPosition(wallIndex)
    const matrixData = createMatrix(array, waterIndex, walls, wallIndex)
    setMatrix(matrixData)
    walls.forEach((item) => {
      item = item.sort((a, b) => b - a)
      let waterUnit = 0
      if (item[0] > item[1]) waterUnit = item[1] * (item.length - 2)
      else waterUnit = item[0] * (item.length - 2)
      unit += waterUnit
    })
    setTotalUnit(unit)
  }
  return (
    <div className="App">
      <input
        type='text'
        value={list}
        onChange={e => setList(e.target.value)}
        placeholder='enter list values with comma separated'
        style={{ marginBottom: 12 }}
      />
      <button onClick={() => calculateResult(array)}>Generate Table</button>

      <h2>{JSON.stringify(array)}</h2>
      <h3>{totalunit}</h3>
      <table>
        <tbody>
          {
            matrix && matrix.map((item, index) => (
              <tr key={index}>
                {item.map((ele, i) => <td key={i} style={{ background: ele === 1 ? 'yellow' : ele === 2 ? 'blue' : "white" }}></td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
