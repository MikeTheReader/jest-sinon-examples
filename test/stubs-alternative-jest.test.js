import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

describe('Jest', () => {
  describe('Stubs - Using Spies', () => {
    it('returns the correct response', () => {
      const getSpy = jest.spyOn(axios, 'get');
      getSpy.mockResolvedValue({ name: 'Bob' });
      return getGoogleHomePage().then((response) => {
        expect(response).toEqual({ name: 'Bob' });
        getSpy.mockRestore();
      });
    });
  });
});