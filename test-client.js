import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function runTests() {
  const client = new Client({ name: "test-client", version: "0.1.0" });
  
  try {
    await client.connect(new StdioClientTransport({
      command: "node",
      args: ["dist/index.js"]
    }));

    // Test 1: Segmented Revenue
    console.log("\n--- Testing Segmented Revenue ---");
    try {
      const segmentedResult = await client.callTool({
        name: "segmented-revenue",
        arguments: { ticker: "AAPL" }
      });
      console.log("✅ Segmented Revenue Test Passed");
      console.log("Sample data:", JSON.parse(segmentedResult.content[0].text).slice?.(0, 1) || "No data");
    } catch (error) {
      console.error("❌ Segmented Revenue Test Failed:", error.message);
    }

    // Test 2: Congress Trades by Name
    console.log("\n--- Testing Congress Trades by Name ---");
    try {
      const nameResult = await client.callTool({
        name: "congress-trades-by-name",
        arguments: { name: "nancy" }
      });
      console.log("✅ Congress Trades by Name Test Passed");
      const data = JSON.parse(nameResult.content[0].text);
      console.log("Sample data:", data.results?.slice?.(0, 1) || "No data");
    } catch (error) {
      console.error("❌ Congress Trades by Name Test Failed:", error.message);
    }

    // Test 3: Congress Trades by Ticker
    console.log("\n--- Testing Congress Trades by Ticker ---");
    try {
      const tickerResult = await client.callTool({
        name: "congress-trades-by-ticker",
        arguments: { ticker: "AAPL" }
      });
      console.log("✅ Congress Trades by Ticker Test Passed");
      const data = JSON.parse(tickerResult.content[0].text);
      console.log("Sample data:", data.results?.slice?.(0, 1) || "No data");
    } catch (error) {
      console.error("❌ Congress Trades by Ticker Test Failed:", error.message);
    }

    console.log("\n--- All Tests Completed ---");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to server:", error);
    process.exit(1);
  }
}

runTests(); 