import React, { useState } from 'react';
import '.././App.css';
import sampleImage from ".././img/c_telo-removebg-preview.png";

function RandomNumberGenerator({ min, max, thresholdRanges, numberOfNumbers }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [numberCounts, setNumberCounts] = useState({});
  const [displayText, setDisplayText] = useState('');

  const generateRandomNumber = () => {
     const newRandomNumber = Math.floor(Math.random() * 100) + 1; // 1から100までの乱数生成
     setRandomNumber(newRandomNumber);

     // 乱数に応じてテキストを設定
     if (newRandomNumber < 20 ) {
       setDisplayText('当たれ～');
     } else  if(newRandomNumber < 40 ){
       setDisplayText('いたいなぁ～');
     } else  if(newRandomNumber < 60 ){
       setDisplayText('邪魔、やめろ？');
     } else  if(newRandomNumber < 80 ){
       setDisplayText('何がしたいん？');
     }
     else{
       setDisplayText('やめてよ～');
     }
   };

    const generateRandomNumbers = () => {
    const newRandomNumbers = [];
    const counts = {};

    for (let i = 0; i < numberOfNumbers; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      newRandomNumbers.push(randomNumber);

      // 乱数の出現回数をカウント
      for (const range of thresholdRanges) {
        if (randomNumber >= range.min && randomNumber <= range.max) {
          counts[range.color] = (counts[range.color] || 0) + 1;
          break;
        }
      }
    }
    setRandomNumbers(newRandomNumbers);
    setNumberCounts(counts);
  };

  const getColor = (number) => {
    for (const range of thresholdRanges) {
      if (number >= range.min && number <= range.max) {
        return range.color;
      }
    }
    return 'black'; // デフォルトの色
  };

  return (
    <div className="random-number-container">
      <button onClick={generateRandomNumbers} className="generate-button">
        ガチャを回す
      </button>
      <div className="telo_set">
            <img onClick={generateRandomNumber} src={sampleImage} alt="画像" className="telo animation"/>
            <div className="box15">
              <p>{displayText}</p>
            </div>
      </div>
      <div className="number-counts">
        {Object.entries(numberCounts).map(([color, count]) => (
          <div key={color} className="number-count">
            <span className="count" style={{ color: color }}>{count}</span>個の当たりが出たよ
          </div>
        ))}
      </div>
      <div className="random-numbers">
        {randomNumbers.map((number, index) => (
          <div key={index} className="random-number" style={{ color: getColor(number) }}>
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [thresholdRanges, setThresholdRanges] = useState([
    { min: 1, max: 30, color: 'blue' },
    { min: 31, max: 70, color: 'green' },
    { min: 71, max: 100, color: 'red' },
  ]);
  const [numberOfNumbers, setNumberOfNumbers] = useState(5);

  const handleMinRangeChange = (event) => {
    const value = parseInt(event.target.value);
    setMinRange(value);
  };

  const handleMaxRangeChange = (event) => {
    const value = parseInt(event.target.value);
    setMaxRange(value);
  };

  const handleThresholdRangesChange = (index, field, value) => {
    const newThresholdRanges = [...thresholdRanges];
    newThresholdRanges[index][field] = value;
    setThresholdRanges(newThresholdRanges);
  };

  const handleNumberOfNumbersChange = (event) => {
    const value = parseInt(event.target.value);
    setNumberOfNumbers(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>闇ガチャ</h1>
        <div className="range-controls">
          <label htmlFor="min-range">最小値:</label>
          <input
            type="number"
            id="min-range"
            value={minRange}
            onChange={handleMinRangeChange}
          />
          <label htmlFor="max-range">最大値:</label>
          <input
            type="number"
            id="max-range"
            value={maxRange}
            onChange={handleMaxRangeChange}
          />
        </div>
        <div className="threshold-value-controls">
          {thresholdRanges.map((range, index) => (
            <div key={index} className="threshold-value-control">
              <label htmlFor={`min-range-${index}`}>範囲 {index + 1} 最小値:</label>
              <input
                type="number"
                id={`min-range-${index}`}
                value={range.min}
                onChange={(event) => handleThresholdRangesChange(index, 'min', parseInt(event.target.value))}
              />
              <label htmlFor={`max-range-${index}`}>最大値:</label>
              <input
                type="number"
                id={`max-range-${index}`}
                value={range.max}
                onChange={(event) => handleThresholdRangesChange(index, 'max', parseInt(event.target.value))}
              />
              <label htmlFor={`color-${index}`}>色:</label>
              <input
                type="text"
                id={`color-${index}`}
                value={range.color}
                onChange={(event) => handleThresholdRangesChange(index, 'color', event.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="number-of-numbers-control">
          <label htmlFor="number-of-numbers">ガチャ回数:</label>
          <input
            type="number"
            id="number-of-numbers"
            value={numberOfNumbers}
            onChange={handleNumberOfNumbersChange}
          />
        </div>
        <RandomNumberGenerator
          min={minRange}
          max={maxRange}
          thresholdRanges={thresholdRanges}
          numberOfNumbers={numberOfNumbers}
        />
      </header>
    </div>
  );
}

export default App;
