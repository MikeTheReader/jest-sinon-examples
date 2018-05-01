import sinon from 'sinon';
import PubSub from '../src/pubsub';
import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

describe('Sinon', () => {
  describe('Stubs', () => {
    it('handles exceptions in callback', () => {
      const testError = new Error('whoops');
      const callbackStub = sinon.stub().throws(testError);
      const pubsub = new PubSub();
      pubsub.subscribe('myRoute', callbackStub);
      expect(() => pubsub.publish('myRoute', 'Hello')).toThrowError(testError);
    });
    it('returns the correct response', () => {
      sinon.stub(axios, 'get').resolves({ name: 'Bob' });
      return getGoogleHomePage().then((response) => {
        expect(response).toEqual({ name: 'Bob' });
        axios.get.restore();
      });
    });
  });
});