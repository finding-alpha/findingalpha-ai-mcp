import axios from 'axios';
import { fetchSegmentedRevenue } from '../index';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Segmented Revenue API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches segmented revenue data successfully', async () => {
    // Mock data
    const mockData = {
      results: [
        {
          ticker: 'AAPL',
          segment: 'iPhone',
          revenue: 123456789,
          year: 2023,
          quarter: 'Q4'
        }
      ]
    };

    // Set up mock response
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    // Call the function
    const result = await fetchSegmentedRevenue('AAPL');

    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://scraper-backend-2ml7.onrender.com/api/v1/sec/segmented-revenue/?ticker=AAPL'
    );
    expect(result).toEqual(mockData);
  });

  it('handles error when API call fails', async () => {
    // Set up mock rejection
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    // Call the function and expect it to throw
    await expect(fetchSegmentedRevenue('INVALID')).rejects.toThrow('Network error');

    // Verify the API was called
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://scraper-backend-2ml7.onrender.com/api/v1/sec/segmented-revenue/?ticker=INVALID'
    );
  });
}); 