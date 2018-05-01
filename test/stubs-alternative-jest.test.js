import axios from 'axios';
import { getGoogleHomePage } from '../src/google';

describe('Jest', () => {
  describe('Stubs - Using Spies', () => {
    it('returns the correct response', () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ name: 'Bob' });
      return getGoogleHomePage().then((response) => {
        expect(response).toEqual({ name: 'Bob' });
        axios.get.mockRestore();
      });
    });
  });
});