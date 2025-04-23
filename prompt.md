You are tasked to build a minimal MCP server.

<purpose>
Fetch segmented revenue for a given stock 
</purpose>

<tech-stack>
- Node.js
- Axios (Web requests)
- Cheerio (DOM scraping)
- zod (for validation)
- @modelcontextprotocol/sdk (^1.7.0)
</tech-stack>

<todo>
1. Set install the dependencies in the current directory.
2. Create fetch segmented revenue for a ticker for the server by doing a GET request https://scraper-backend-2ml7.onrender.com/api/v1/sec/segmented-revenue/?ticker=LRCX
4. Return the segmented revenue back to the MCP client
5. Write a test using the same sdk client to verify with "AAPL" and iterate until verifiably working
</todo>

Use the latest, accurate documentation and examples below.

<documentation>
Root of the codebase - /Users/jyothidharpulakunta/Developer/findingalpha-ai-mcp

```javascript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod'

// Create an MCP server
const server = new McpServer({
  name: 'my-mcp-server',
  version: '0.1.0',
});

/**
 * Perform a hello
 */
async function performHello(query: string) {
  return `Hello {$query}. This is a response from the MCP server!`;
}

// Add a tool
server.tool(
  'hello',
  {
    query: z.string().describe('The query'),
  },
  async ({ query }) => {
    try {
      const result = await performHello(query);
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
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

```

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({name: "client-name", version: "0.1.0"});
await client.connect(new StdioClientTransport({
  command: "node", args: ["server-file.js"]
}));

const result = await client.callTool({
  name: "toolName", arguments: { paramName: "value" }
});
```
</documentation>

Do not write documentation, no readme, no usage or anything at all other than mandatory code.


Document the file well so beginner coders can make sense of your code and learn from it.

Make sure to follow the steps outlined above and return the results in the specified JSON formats. 

Keep the implementation minimal and focused on the required functionality. Do not add nee features.