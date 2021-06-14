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
  history: Array<{ state: string; data: any }>;
  lastState: () => string | undefined;
  setState: (newState: string, newData?: any) => void;
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
  const [history, setHistory] = useState<Array<{ state: string; data: any }>>(
    []
  );

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
        history,
        lastState: () => {
          const lastIndex = history.length - 1;
          return history.length >= 1 ? history[lastIndex].state : undefined;
        },
        setState: (newState: string, newData?: any) => {
          newData = newData ? { ...data, ...newData } : data;
          setHistory(history.concat([{ state: state as string, data }]));
          setStateData(newData);
          setState(newState);
        },
      }}
    >
      {stateChild()}
    </StateMachineContext.Provider>
  );
};

export { StateMachine, StateMachineContext };
