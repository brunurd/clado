import { useCallback, useContext } from 'react';
import { StateMachineContext } from './StateMachine';

const useStateMachine = () => {
  const {
    state,
    data,
    setState: setStateState,
    setStateData,
  } = useContext(StateMachineContext);

  const setState = useCallback(
    (newState: string, newData?: any) => {
      newData = newData ? { ...data, ...newData } : data;
      setStateData(newData);
      setStateState(newState);
    },
    [setStateState, setStateData]
  );

  return { state, data, setState };
};

export { useStateMachine };
