# FindingAlpha AI MCP Server

[![smithery badge](https://smithery.ai/badge/findingalpha-ai-mcp)](https://smithery.ai/server/findingalpha-ai-mcp)

A Model Context Protocol server for FindingAlpha AI that provides various tools for fundamental analysis and processing for public traded stocks.


## Installation

### Via Smithery

```bash
npx -y @smithery/cli install findingalpha-ai-mcp --client claude
```

### Via npm

```bash
npm install findingalpha-ai-mcp
```

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. For development with auto-rebuild:
```bash
npm run watch
```

### Testing

```bash
npm test
```

## Usage Examples


## License

MIT License - see [LICENSE](LICENSE) for details.

## API Endpoints

The MCP server provides the following endpoints:

1. **Segmented Revenue**
   - Endpoint: `segmented-revenue`
   - Parameters: `ticker` (string) - Stock ticker symbol (e.g., AAPL)
   - Example: `segmented-revenue` with `{ "ticker": "AAPL" }`

2. **Congress Trades by Name**
   - Endpoint: `congress-trades-by-name`
   - Parameters: `name` (string) - Congressman first name (e.g., nancy)
   - Example: `congress-trades-by-name` with `{ "name": "nancy" }`

3. **Congress Trades by Ticker**
   - Endpoint: `congress-trades-by-ticker`
   - Parameters: `ticker` (string) - Stock ticker symbol (e.g., AAPL)
   - Example: `congress-trades-by-ticker` with `{ "ticker": "AAPL" }`

## Testing

The project includes both integration tests and unit tests.

### Running Tests

```bash
# Run all tests
npm test

# Run only client integration tests
npm run test:client

# Run only unit tests
npm run test:unit
```

### Test Files

- Integration tests: `test-client.js`
- Unit tests: 
  - `src/__tests__/segmented-revenue.test.ts`
  - `src/__tests__/congress-trades.test.ts` 