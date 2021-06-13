import React from 'react';
import { render, screen } from '@testing-library/react';
import { StateMachine } from './StateMachine';

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
});
