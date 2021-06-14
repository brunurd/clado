import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StateMachine, StateMachineContext } from './StateMachine';

describe('<StateMachine />', () => {
  it('shows the first state component when initialState is not passed', () => {
    render(
      <StateMachine
        states={{
          a: () => <p>text a</p>,
          b: () => <p>text b</p>,
        }}
      />
    );

    expect(screen.queryByText('text a')).toBeVisible();
    expect(screen.queryByText('text b')).toBeNull();
  });

  it('shows the first state component when initialState is passed', () => {
    render(
      <StateMachine
        initialState="b"
        states={{
          a: () => <p>text a</p>,
          b: () => <p>text b</p>,
        }}
      />
    );

    expect(screen.queryByText('text a')).toBeNull();
    expect(screen.queryByText('text b')).toBeVisible();
  });

  it('shows the data value when render the current state component', () => {
    render(
      <StateMachine
        data={{
          exampleStr: 'Example text here',
          exampleInt: 931,
        }}
        initialState="b"
        states={{
          a: () => <p>text a</p>,
          b: (data) => <p>{`${data.exampleStr} ${data.exampleInt}`}</p>,
        }}
      />
    );

    expect(screen.queryByText('Example text here 931')).toBeVisible();
  });

  describe('setState', () => {
    it('swaps between states using the setState function', () => {
      enum States {
        a = 'a',
        b = 'b',
      }

      const ComponentA = () => {
        const { setState } = useContext(StateMachineContext);
        return (
          <>
            <p>A</p>
            <button onClick={() => setState(States.b)}>Swap to B</button>
          </>
        );
      };

      const ComponentB = () => {
        const { setState } = useContext(StateMachineContext);
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
        const { setState } = useContext(StateMachineContext);
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
        const { data, setState } = useContext(StateMachineContext);
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
