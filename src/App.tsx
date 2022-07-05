import React, {useState} from 'react';

import img from "./img.png";

const App: React.FC = (props) => {
  const [count, setCount] = useState(1);
  const onButtonClick = () => {
    throw  new Error('you are fvcked')
  };
  return (
    <div>
      <img src={img} alt="some image"/>
      <img src={img} alt="some image"/>
      <img src={img} alt="some image"/>
      <h1>value = {count}</h1>
      <button onClick={onButtonClick}>Click</button>
    </div>
  );
}

export default App;