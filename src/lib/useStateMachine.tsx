import { useContext } from 'react';
import { StateMachineContext } from './StateMachine';

const useStateMachine = () => {
  const { data, setState } = useContext(StateMachineContext);
  return { data, setState };
};

export { useStateMachine };
