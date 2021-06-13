# Clado

A React state machine based on Context API.

---

## Usage:

### StateMachine

The main component of `clado` is the `StateMachine`, where you can pass a bunch of components in the `states` using the state name as a key.

```jsx
import { StateMachine } from 'clado';

const App = () => {
  return (
    <main>
      <h1>React State Machine</h1>
      <StateMachine
        initialState="a"
        states={{
          a: <ComponentA />,
          b: <ComponentB />,
        }}
      />
    </main>
  );
};
```

### setState

To change the current state you can use the `setState` function of the `useStateMachine` hook in one of the `StateMachine` children.

```jsx
import { useStateMachine } from 'clado';

const ComponentA = () => {
  const { setState } = useStateMachine();

  return (
    <>
      <h2>Component A</h2>
      <button onClick={() => setState('b')}>Go To B</button>
    </>
  );
};
```

---

## Data Management

### Initial Data

The `StateMachine` accepts a data object to share data between the states.

```jsx
import { StateMachine } from 'clado';

const App = () => {
  return (
    <main>
      <h1>React State Machine</h1>
      <StateMachine
        data={{
          textValue: 'a example text',
        }}
        initialState="a"
        states={{
          a: <ComponentA />,
          b: <ComponentB />,
        }}
      />
    </main>
  );
};
```

### Update Data

The way to update this data is using the `setState` function of the `useStateMachine` hook. It only overrides the passed fields, any other will be preserved.

```jsx
const { setState } = useStateMachine();

<button
  onClick={() =>
    setState('b', {
      textValue: 'new text value',
    })
  }
>
  Go To B
</button>;
```

### Reading Data

Is possible to access this data using the `data` return of the `useStateMachine` hook.

```jsx
const { data } = useStateMachine();

<h2>{data.textValue}</h2>;
```

Or in the states declaration as a parameter in the function.

```jsx
<StateMachine
  data={{
    textValue: 'a example text',
  }}
  states={{
    a: (data) => <ComponentA text={data.textValue} />,
    b: (data) => <ComponentB text={data.textValue} />,
  }}
/>
```
