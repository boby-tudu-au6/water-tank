import './App.css';
import { useEffect, useState } from 'react';
import {
  createMatrix,
  fillWater,
} from './utils';

function App() {
  const [list, setList] = useState('5,3,0,3,4')
  const [totalunit, setTotalUnit] = useState(0)
  const [matrix, setMatrix] = useState(null)
  const [array, setArray] = useState([])

  useEffect(() => {
    const data = list.split(',').map(item => parseInt(item))
    setArray(data)
  }, [list])

  const calculateResult = (arr) => {
    let unit = 0
    const matrix = createMatrix(arr)
    const matrixWithWater = fillWater(matrix)
    setMatrix(matrixWithWater)
    matrixWithWater.forEach(item => {
      item.forEach(ele => {
        if (ele === 2) unit += 1
      })
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
