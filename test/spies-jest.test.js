import PubSub from '../src/pubsub';
import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

jest.mock('axios');

describe('Jest', () => {
  describe('Spies', () => {
    it('calls function on publish', () => {
      const callback = jest.fn();
      const pubsub = new PubSub();
      pubsub.subscribe('myRoute', callback);
      pubsub.publish('myRoute', 'Hello');
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith('Hello');
    });

    it('calls the network endpoint', () => {
      const spy = jest.spyOn(axios, 'get');
      return getGoogleHomePage().then(() => {
        expect(axios.get).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
  });
});