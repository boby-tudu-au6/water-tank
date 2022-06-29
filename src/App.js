import './App.css';
import { useEffect, useState } from 'react';
import { calculateWaterPosition, createMatrix, findPairs } from './utils';

function App() {
  // const [list, setList] = useState('0,3,0,3')
  // const [list, setList] = useState('0,4,7,0,4')
  // const [list, setList] = useState('0,4,7,0,4,3')
  const [list, setList] = useState('0,4,5,0,0,0,8,0,2,3')
  // const [list, setList] = useState('')
  const [pairs, setPairs] = useState([])
  const [totalunit, setTotalUnit] = useState(0)
  const [matrix, setMatrix] = useState(null)
  // 0,4,0,0,0,6,0,6,4,0
  const [array, setArray] = useState([0, 4, 0, 3, 0, 6, 0, 6, 0, 4])
  // const [array, setArray] = useState([0, 4, 0, 0, 0, 6, 0, 6, 4, 0])
  // const [tableHeight, setTableHeight] = useState([])
  // const [tableWidth, setTabelWidth] = useState([])
  // const [wallPositionIndex, setWallPositionIndex] = useState([])
  // const [waterPosition, setWaterPosition] = useState([])

  useEffect(() => {
    const data = list.split(',').map(item => parseInt(item))
    setArray(data)
  }, [list])

  // useEffect(() => {
  //   if (array.length) {
  //     setTableHeight([...Array([...array].sort((a, b) => b - a)[0]).keys()]);
  //     setTabelWidth([...Array(array.length).keys()])
  //   }
  // }, [array])

  // 1. first step is to find wall pair
  // 2. then calculate water inside it

  // this function is for finding wall pairs which can hold water


  const calculateResult = (arr) => {
    // here we have 2d array, each array will have 2 walls 
    // and distance between them which is 1 or greater than 1
    const walls = [];
    let unit = 0
    let counter = 0
    const wallIndex = []
    while (arr.length > 2) {
      let [pair, index, start, end] = findPairs(arr)
      console.log(end)
      walls.push(pair)
      setPairs(walls)
      arr = arr.slice(index - 1)
      // start = (counter === 0 && arr[0] === 0) ? start - 1 : start
      // start = counter === 0 ? start : start - 1
      start = start - 1
      end = end - 1
      wallIndex.push({ start: (start + counter), end: (end + counter) })
      counter += end
    }
    console.log({ wallIndex, walls })
    // setWallPositionIndex(wallIndex)
    const waterIndex = calculateWaterPosition(wallIndex)
    const matrixData = createMatrix(array, waterIndex)
    // console.log(waterIndex)
    setMatrix(matrixData)
    // setWaterPosition(waterIndex)
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
