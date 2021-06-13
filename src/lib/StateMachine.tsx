import React, { ReactNode, useState, createContext } from 'react';

type State =
  | { [key: string]: ReactNode }
  | { [key: string]: (data: object) => ReactNode };

type StateMachineProps = {
  data?: object;
  states: State;
  initialState?: string;
};

type StateMachineContextType = {
  state?: string;
  setState: (state: string, data: object) => void;
  data: object;
};

const StateMachineContext = createContext({} as StateMachineContextType);

const StateMachine = ({
  states,
  initialState,
  data = {},
}: StateMachineProps) => {
  const keys: Array<string | undefined> = Object.keys(states);

  const [stateData, setStateData] = useState(data);
  const [state, setState] = useState(
    initialState || keys.length >= 1 ? Object.keys(states)[0] : undefined
  );

  const stateChild = (): ReactNode => {
    if (keys.includes(state) && state !== undefined) {
      return states[state];
    }
    return keys.length >= 1 && keys[0] !== undefined
      ? states[keys[0]]
      : undefined;
  };

  return (
    <StateMachineContext.Provider
      value={{
        state,
        data: stateData,
        setState: (newState: string, newData: object) => {
          setStateData({ ...stateData, ...newData });
          setState(newState);
        },
      }}
    >
      {stateChild}
    </StateMachineContext.Provider>
  );
};

export { StateMachine, StateMachineContext };
