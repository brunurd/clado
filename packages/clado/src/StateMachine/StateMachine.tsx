import { ReactNode, useState, createContext, useMemo, useContext } from 'react';

type State = { [key: string]: (data: any) => JSX.Element };

type StateMachineProps = {
  data?: any;
  states: State;
  initialState?: string;
};

type HistoryItem = {
  state?: string;
  data?: any;
  loaded: boolean;
};

type StateMachineContextType = {
  state: string | undefined;
  data: any;
  history: Array<HistoryItem>;
  lastState: () => string | undefined;
  setState: (newState?: string, newData?: any) => void;
};

const StateMachineContext = createContext({} as StateMachineContextType);

const StateMachine = ({
  states,
  initialState = undefined,
  data = {},
}: StateMachineProps) => {
  const keys: Array<string | undefined> = useMemo(() => states ? Object.keys(states) : [], [states]);

  const [stateData, setStateData] = useState(data);
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState<Array<HistoryItem>>([
    { state: initialState ?? (keys.length > 0 ? keys[0] : undefined), data, loaded: true },
  ]);

  const stateChild = (): ReactNode => {
    if (keys.includes(state) && state !== undefined) {
      return states[state](stateData);
    }
    return keys.length >= 1 && keys[0] !== undefined
      ? states[keys[0]](stateData)
      : undefined;
  };

  const memorizedValue = useMemo(() => {
    return {
      state,
      data: stateData,
      history,
      lastState: () => {
        const lastIndex = history.length - 2;
        return history.length >= 2 && lastIndex < history.length && lastIndex >= 0
          ? history[lastIndex].state?.trim()
          : undefined;
      },
      setState: (newState?: string, newData?: unknown) => {
        if (!newState) {
          return;
        }

        setHistory([
          ...(history ?? []),
          {
            state: newState,
            data: newData,
            loaded: false,
          },
        ]);

        setStateData({ ...(stateData ?? {}), ...(newData ?? {}) });
        setState(newState);
      },
    };
  }, [stateData, state, history]);

  return (
    <StateMachineContext.Provider value={memorizedValue}>
      {stateChild()}
    </StateMachineContext.Provider>
  );
};

const useStateMachine = <T,>() => {
  const context = useContext(StateMachineContext);

  return useMemo(() => {
    return {
      ...context,
      data: context.data as T,
    };
  }, [context]);
};

export { StateMachine, useStateMachine };
