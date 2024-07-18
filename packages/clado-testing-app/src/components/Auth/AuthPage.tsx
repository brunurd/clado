import { StateMachine, useStateMachine } from 'clado';

const AuthPage = () => {
  enum States {
    a = 'a',
    b = 'b',
    c = 'c',
  }

  const ComponentA = () => {
    const { setState, lastState } = useStateMachine();
    return (
      <>
        <p>A</p>
        <p>{`Last state: ${lastState()}`}</p>
        <button onClick={() => setState(States.c)}>Swap to C</button>
      </>
    );
  };

  const ComponentB = () => {
    const { setState, lastState } = useStateMachine();
    return (
      <>
        <p>B</p>
        <p>{`Last state: ${lastState()}`}</p>
        <button onClick={() => setState(States.a)}>Swap to A</button>
      </>
    );
  };

  const ComponentC = () => {
    const { setState, lastState } = useStateMachine();
    return (
      <>
        <p>C</p>
        <p>{`Last state: ${lastState()}`}</p>
        <button onClick={() => setState(States.b)}>Swap to B</button>
      </>
    );
  };

  return <StateMachine states={{
    a: () => <ComponentA />,
    b: () => <ComponentB />,
    c: () => <ComponentC />,
  }} />
};

export { AuthPage };
