import axios from 'axios';
import { fetchCongressTradesByName, fetchCongressTradesByTicker } from '../index';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Congress Trades API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCongressTradesByName', () => {
    it('fetches congress trades by name successfully', async () => {
      // Mock data
      const mockData = {
        count: 19,
        results: [
          {
            id: 905,
            filing: {
              id: 310,
              filer: {
                id: 46,
                firstname: "Nancy",
                lastname: "Pelosi"
              }
            },
            asset_company_name: "Amazon.com, Inc. - Common Stock",
            ticker_symbol: "AMZN",
            transaction_type: "P"
          }
        ]
      };

      // Set up mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      // Call the function
      const result = await fetchCongressTradesByName('nancy');

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/nancy/'
      );
      expect(result).toEqual(mockData);
    });

    it('handles error when name API call fails', async () => {
      // Set up mock rejection
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchCongressTradesByName('invalid')).rejects.toThrow('Network error');

      // Verify the API was called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/invalid/'
      );
    });
  });

  describe('fetchCongressTradesByTicker', () => {
    it('fetches congress trades by ticker successfully', async () => {
      // Mock data
      const mockData = {
        count: 5,
        results: [
          {
            id: 123,
            filing: {
              id: 456,
              filer: {
                id: 46,
                firstname: "Nancy",
                lastname: "Pelosi"
              }
            },
            asset_company_name: "Apple Inc. - Common Stock",
            ticker_symbol: "AAPL",
            transaction_type: "P"
          }
        ]
      };

      // Set up mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      // Call the function
      const result = await fetchCongressTradesByTicker('AAPL');

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/AAPL/'
      );
      expect(result).toEqual(mockData);
    });

    it('handles error when ticker API call fails', async () => {
      // Set up mock rejection
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchCongressTradesByTicker('INVALID')).rejects.toThrow('Network error');

      // Verify the API was called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/INVALID/'
      );
    });
  });
}); 