import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function testSegmentedRevenue() {
  const client = new Client({ name: "test-client", version: "0.1.0" });
  
  try {
    await client.connect(new StdioClientTransport({
      command: "node",
      args: ["server.js"]
    }));

    const result = await client.callTool({
      name: "segmented-revenue",
      arguments: { ticker: "AAPL" }
    });

    console.log("Segmented Revenue Data:", result.content[0].text);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

testSegmentedRevenue(); 