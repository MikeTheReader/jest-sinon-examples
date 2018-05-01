import sinon from 'sinon';
import PubSub from '../src/pubsub';

describe('Sinon', () => {
  describe('Mock Objects', () => {
    it('calls function on publish', () => {
      const mockAPI = { method: function(message) {} };
      const apiMock = sinon.mock(mockAPI);
      apiMock.expects('method').once().withArgs('Hello');

      const pubsub = new PubSub();
      pubsub.subscribe('myRoute', mockAPI.method);
      pubsub.publish('myRoute', 'Hello');
      apiMock.verify();
    });
  });
});
