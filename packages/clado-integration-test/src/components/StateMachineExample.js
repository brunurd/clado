import React from 'react';
import { StateMachine } from 'clado';
import './StateMachineExample.css';

const Login = () => {
    return (<p>login</p>)
}

const SignUp = () => {
    return (<p>signUp</p>)
}

const StateMachineExample = () => {
    return (
        <div className="state-machine-example">
            <StateMachine
                states={{
                    login: <Login />,
                    signUp: <SignUp />
                }}
            />
        </div>
    );
};

export { StateMachineExample };
