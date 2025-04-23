import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface SegmentedRevenueData {
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

// Start the server
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error('[MCP Error]', error);
  process.exit(1);
});

console.error('MCP server running on stdio'); 