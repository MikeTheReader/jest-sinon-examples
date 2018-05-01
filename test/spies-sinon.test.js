import sinon from 'sinon';
import PubSub from '../src/pubsub';
import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

describe('Sinon', () => {
  describe('Spies', () => {
    it('calls function on publish', () => {
      const callback = sinon.spy();
      const pubsub = new PubSub();
      pubsub.subscribe('myRoute', callback);
      pubsub.publish('myRoute', 'Hello');
      expect(callback.called).toBe(true);
      expect(callback.getCall(0).args[0]).toBe('Hello');
    });

    it('calls the network endpoint', () => {
      sinon.spy(axios, 'get');
      return getGoogleHomePage().then(() => {
        expect(axios.get.called).toBe(true);
        axios.get.restore();
      });
    });
  });
});
