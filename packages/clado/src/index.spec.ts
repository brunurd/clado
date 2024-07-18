
describe('index.ts', () => {
  it('should re-export all exports from StateMachine module when module exists', () => {
    const stateMachineExports = require('./StateMachine');
    const reExported = require('./index');

    Object.keys(stateMachineExports).forEach(key => {
      expect(reExported[key]).toBe(stateMachineExports[key]);
    });
  });
});
