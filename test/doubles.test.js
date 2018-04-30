import sinon from 'sinon';
import PubSub from '../src/pubsub';
import axios from 'axios';
import { getGoogleHomePage } from '../src/google';
jest.mock('axios');

// Spies
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
  describe('Mocks', () => {
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
  describe('Mocks', () => {
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