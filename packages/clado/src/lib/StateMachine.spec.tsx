import React, { useContext, useState } from 'react';
import { prettyDOM, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StateMachine, StateMachineContext } from './StateMachine';

describe('<StateMachine />', () => {
  afterEach(() => {
    console.log(prettyDOM(document));
  });

  it('shows the first state component when initialState is not passed.', () => {
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

  it('shows the first state component when initialState is passed.', () => {
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

  it('shows the data value when render the current state component.', () => {
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
    it('should does nothing when no state is passed to setState.', async () => {
      const ComponentA = () => {
        const { setState } = useContext(StateMachineContext);
        const [clicks, setClicks] = useState(0);

        return (
          <>
            <p>A</p>
            <p>{`Clicks count: ${clicks}`}</p>
            <button
              onClick={() => {
                setState();
                setClicks(clicks + 1);
              }}
            >
              Swap to B
            </button>
          </>
        );
      };

      const ComponentB = () => {
        const { setState } = useContext(StateMachineContext);
        const [clicks, setClicks] = useState(0);

        return (
          <>
            <p>B</p>
            <p>{`Clicks count: ${clicks}`}</p>
            <button
              onClick={() => {
                setState();
                setClicks(clicks + 1);
              }}
            >
              Swap to A
            </button>
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
      expect(screen.queryByText('Swap to B')).toBeVisible();

      userEvent.click(screen.getByText('Swap to B'));

      await screen.findByText('Clicks count: 1');

      expect(screen.queryByText('A')).toBeVisible();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('Swap to B')).toBeVisible();
    });

    it('should return to the first state if an wrong state is passed.', async () => {
      enum States {
        a = 'a',
        b = 'b',
        c = 'c',
      }

      const ComponentA = () => {
        const { setState } = useContext(StateMachineContext);
        return (
          <>
            <p>A</p>
            <button onClick={() => setState(States.c)}>Swap to C</button>
          </>
        );
      };
      const ComponentB = () => {
        const { setState } = useContext(StateMachineContext);
        return (
          <>
            <p>B</p>
            <button onClick={() => setState(States.a)}>Swap to A</button>
          </>
        );
      };
      const ComponentC = () => {
        const { setState } = useContext(StateMachineContext);
        return (
          <>
            <p>C</p>
            <button onClick={() => setState('d')}>Swap to B</button>
          </>
        );
      };

      render(
        <StateMachine
          states={{
            a: () => <ComponentA />,
            b: () => <ComponentB />,
            c: () => <ComponentC />,
          }}
        />
      );

      expect(screen.queryByText('A')).toBeVisible();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('C')).toBeNull();
      expect(screen.queryByText('Swap to C')).toBeVisible();

      userEvent.click(screen.getByText('Swap to C'));

      await screen.findByText('Swap to B');

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('C')).toBeVisible();
      expect(screen.queryByText('Swap to B')).toBeVisible();

      userEvent.click(screen.getByText('Swap to B'));

      await screen.findByText('Swap to C');

      expect(screen.queryByText('A')).toBeVisible();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('C')).toBeNull();
      expect(screen.queryByText('Swap to C')).toBeVisible();
    });

    it('swaps between states using the setState function.', async () => {
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
            <button onClick={() => setState(States.a)}>Swap to A</button>
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

      await screen.findByText('Swap to A');

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeVisible();
      expect(screen.queryByText('Swap to A')).toBeVisible();
    });

    it('changes state machine data when swap from a state to other.', async () => {
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

      await screen.findByText('from B to A');

      expect(screen.queryByText('default text')).toBeNull();
      expect(screen.queryByText('from A to B')).toBeNull();
      expect(screen.queryByText('from B to A')).toBeVisible();

      userEvent.click(screen.getByText('Swap to B'));

      await screen.findByText('from A to B');

      expect(screen.queryByText('default text')).toBeNull();
      expect(screen.queryByText('from A to B')).toBeVisible();
      expect(screen.queryByText('from B to A')).toBeNull();
    });
  });

  describe('lastState', () => {
    it('should return the correct last state in each state.', async () => {
      enum States {
        a = 'a',
        b = 'b',
        c = 'c',
      }

      const ComponentA = () => {
        const { setState, lastState } = useContext(StateMachineContext);
        return (
          <>
            <p>A</p>
            <p>{`Last state: ${lastState()}`}</p>
            <button onClick={() => setState(States.c)}>Swap to C</button>
          </>
        );
      };

      const ComponentB = () => {
        const { setState, lastState } = useContext(StateMachineContext);
        return (
          <>
            <p>B</p>
            <p>{`Last state: ${lastState()}`}</p>
            <button onClick={() => setState(States.a)}>Swap to A</button>
          </>
        );
      };

      const ComponentC = () => {
        const { setState, lastState } = useContext(StateMachineContext);
        return (
          <>
            <p>C</p>
            <p>{`Last state: ${lastState()}`}</p>
            <button onClick={() => setState(States.b)}>Swap to B</button>
          </>
        );
      };

      render(
        <StateMachine
          initialState={States.b}
          states={{
            a: () => <ComponentA />,
            b: () => <ComponentB />,
            c: () => <ComponentC />,
          }}
        />
      );

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeVisible();
      expect(screen.queryByText('C')).toBeNull();
      expect(screen.queryByText('Last state: undefined')).toBeVisible();

      userEvent.click(screen.getByText('Swap to A'));
      await screen.findByText('Swap to C');

      expect(screen.queryByText('A')).toBeVisible();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('C')).toBeNull();
      expect(screen.queryByText('Last state: b')).toBeVisible();

      userEvent.click(screen.getByText('Swap to C'));
      await screen.findByText('Swap to B');

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeNull();
      expect(screen.queryByText('C')).toBeVisible();
      expect(screen.queryByText('Last state: a')).toBeVisible();

      userEvent.click(screen.getByText('Swap to B'));
      await screen.findByText('Swap to A');

      expect(screen.queryByText('A')).toBeNull();
      expect(screen.queryByText('B')).toBeVisible();
      expect(screen.queryByText('C')).toBeNull();
      expect(screen.queryByText('Last state: c')).toBeVisible();
    });
  });
});
