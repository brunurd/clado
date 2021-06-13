import React from 'react';
import { render, screen } from '@testing-library/react';
import { StateMachine } from './StateMachine';
import { useStateMachine } from './useStateMachine';
import userEvent from '@testing-library/user-event';

describe('useStateMachine()', () => {
  describe('setState', () => {
    it('swaps between states using the setState function', () => {
      enum States {
        a = 'a',
        b = 'b',
      }

      const ComponentA = () => {
        const { setState } = useStateMachine();
        return (
          <>
            <p>A</p>
            <button onClick={() => setState(States.b)}>Swap to B</button>
          </>
        );
      };

      const ComponentB = () => {
        const { setState } = useStateMachine();
        return (
          <>
            <p>B</p>
            <button onClick={() => setState(States.b)}>Swap to A</button>
          </>
        );
      };

      render(
        <StateMachine
          states={{
            a: () => <ComponentA />,
            b: () => <ComponentB />,
          }}
        />
      );

      expect(screen.queryByText('A')).toBeVisible();
      expect(screen.queryByText('B')).toBeNull();

      userEvent.click(screen.getByText('Swap to B'));

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeVisible();
      expect(screen.queryByText('Swap to A')).toBeVisible();
    });

    it('changes state machine data when swap from a state to other', () => {
      enum States {
        a = 'a',
        b = 'b',
      }

      const ComponentA = ({ text }: { text: string }) => {
        const { setState } = useStateMachine();
        return (
          <>
            <p>{text}</p>
            <button onClick={() => setState(States.b, { text: 'from A to B' })}>
              Swap to B
            </button>
          </>
        );
      };

      const ComponentB = () => {
        const { data, setState } = useStateMachine();
        return (
          <>
            <p>{data.text}</p>
            <button onClick={() => setState(States.a, { text: 'from B to A' })}>
              Swap to A
            </button>
          </>
        );
      };

      render(
        <StateMachine
          data={{ text: 'default text' }}
          initialState="b"
          states={{
            a: (data) => <ComponentA text={data.text} />,
            b: () => <ComponentB />,
          }}
        />
      );

      expect(screen.queryByText('default text')).toBeVisible();
      expect(screen.queryByText('from A to B')).toBeNull();
      expect(screen.queryByText('from B to A')).toBeNull();

      userEvent.click(screen.getByText('Swap to A'));

      expect(screen.queryByText('default text')).toBeNull();
      expect(screen.queryByText('from A to B')).toBeNull();
      expect(screen.queryByText('from B to A')).toBeVisible();

      userEvent.click(screen.getByText('Swap to B'));

      expect(screen.queryByText('default text')).toBeNull();
      expect(screen.queryByText('from A to B')).toBeVisible();
      expect(screen.queryByText('from B to A')).toBeNull();
    });
  });
});
