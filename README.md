# Clado

A React state machine based on Context API.

## Usage Example:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StateMachine, useStateMachine } from 'clado';

const APage = () => {
  const { data, setState } = useStateMachine();

  return (
    <>
      <h2>{`A: ${data.text}`}</h2>
      <button onClick={() => setState('b', { text: 'b from a' })}>
        Go To B
      </button>
    </>
  );
};

const BPage = () => {
  const { data, setState } = useStateMachine();

  return (
    <>
      <h2>{`B: ${data.text}`}</h2>
      <button onClick={() => setState('a', { text: 'a from b' })}>
        Go To A
      </button>
    </>
  );
};

ReactDOM.render(
  <main>
    <h1>React State Machine</h1>
    <StateMachine
      data={{
        text: undefined,
      }}
      states={{
        a: () => <APage />,
        b: () => <BPage />,
      }}
    />
  </main>,
  document.querySelector('#root')
);
```
