import React, {useState} from 'react';

const App: React.FC = (props)=> {
    const [count, setCount] = useState(1);
    const onButtonClick = ()=> {
      throw  new Error('you are fvcked')
    };
    return (
        <div>
            <h1>value = {count}</h1>
            <button onClick={onButtonClick}>Click</button>
        </div>
    );
}

export default App;