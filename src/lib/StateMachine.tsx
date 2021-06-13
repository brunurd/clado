import React, { ReactNode, useState, createContext } from 'react';

type State = { [key: string]: (data: any) => JSX.Element };

type StateMachineProps = {
  data?: any;
  states: State;
  initialState?: string;
};

type StateMachineContextType = {
  state: string | undefined;
  data: any;
  setState: (state: string) => void;
  setStateData: (data: any) => void;
};

const StateMachineContext = createContext({} as StateMachineContextType);

const StateMachine = ({
  states,
  initialState,
  data = {},
}: StateMachineProps) => {
  const keys: Array<string | undefined> = Object.keys(states);

  const [stateData, setStateData] = useState(data);
  const [state, setState] = useState(initialState);

  const stateChild = (): ReactNode => {
    if (keys.includes(state) && state !== undefined) {
      return states[state](stateData);
    }
    return keys.length >= 1 && keys[0] !== undefined
      ? states[keys[0]](stateData)
      : undefined;
  };

  return (
    <StateMachineContext.Provider
      value={{
        state,
        data: stateData,
        setState,
        setStateData,
      }}
    >
      {stateChild()}
    </StateMachineContext.Provider>
  );
};

export { StateMachine, StateMachineContext };
