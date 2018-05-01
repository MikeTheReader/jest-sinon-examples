import PubSub from '../src/pubsub';
import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

jest.mock('axios');

describe('Jest', () => {
  describe('Stubs', () => {
    it('handles exceptions in callback', () => {
      const testError = new Error('whoops');
      const callbackStub = jest.fn().mockImplementation(() => { throw testError; });
      const pubsub = new PubSub();
      pubsub.subscribe('myRoute', callbackStub);
      expect(() => pubsub.publish('myRoute', 'Hello')).toThrowError(testError);
    });
    it('returns the correct response', () => {
      axios.get.mockResolvedValue({ name: 'Bob' });
      return getGoogleHomePage().then((response) => {
        expect(response).toEqual({ name: 'Bob' });
        axios.get.mockRestore();
      });
    });
  });
});