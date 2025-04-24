import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface SegmentedRevenueData {
  [key: string]: any; // Replace with more specific types if needed
}

interface CongressTradesData {
  [key: string]: any; // Replace with more specific types if needed
}

// Create an MCP server
const server = new McpServer({
  name: 'segmented-revenue-mcp',
  version: '0.1.0',
});

/**
 * Fetches segmented revenue data for a given ticker
 * @param {string} ticker - Stock ticker symbol
 * @returns {Promise<SegmentedRevenueData>} Segmented revenue data
 */
async function fetchSegmentedRevenue(ticker: string): Promise<SegmentedRevenueData> {
  const response = await axios.get(`https://scraper-backend-2ml7.onrender.com/api/v1/sec/segmented-revenue/?ticker=${ticker}`);
  return response.data;
}

/**
 * Fetches congress trades by congressman first name
 * @param {string} name - Congressman first name (e.g., nancy)
 * @returns {Promise<CongressTradesData>} Congress trades data
 */
async function fetchCongressTradesByName(name: string): Promise<CongressTradesData> {
  const response = await axios.get(`https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/${name}/`);
  return response.data;
}

/**
 * Fetches all congressman trades for a specific ticker
 * @param {string} ticker - Stock ticker symbol
 * @returns {Promise<CongressTradesData>} Congress trades data for ticker
 */
async function fetchCongressTradesByTicker(ticker: string): Promise<CongressTradesData> {
  const response = await axios.get(`https://scraper-backend-2ml7.onrender.com/api/v1/sec/congress-trades/${ticker}/`);
  return response.data;
}

// Add the segmented revenue tool
server.tool(
  'segmented-revenue',
  {
    ticker: z.string().describe('Stock ticker symbol (e.g., AAPL)'),
  },
  async ({ ticker }) => {
    try {
      const data = await fetchSegmentedRevenue(ticker);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching segmented revenue: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Add the congress trades by name tool
server.tool(
  'congress-trades-by-name',
  {
    name: z.string().describe('Congressman first name (e.g., nancy)'),
  },
  async ({ name }) => {
    try {
      const data = await fetchCongressTradesByName(name);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching congress trades by name: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Add the congress trades by ticker tool
server.tool(
  'congress-trades-by-ticker',
  {
    ticker: z.string().describe('Stock ticker symbol (e.g., AAPL)'),
  },
  async ({ ticker }) => {
    try {
      const data = await fetchCongressTradesByTicker(ticker);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching congress trades by ticker: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error('[MCP Error]', error);
  process.exit(1);
});

console.error('MCP server running on stdio'); 