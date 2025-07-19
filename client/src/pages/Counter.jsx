import React, {useState } from 'react';

function Counter(){
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(counter +  1);
    };
    return( 
        <div>
            <p>You Clicked {count} times</p>
            <button onClick={handleIncrement}>Click me</button>
        </div>
    );

}

export default Counter;