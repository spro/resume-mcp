# spro's Resume MCP Server

Use MCP to learn about me instead of reading a boring PDF file.

## Connection to Claude Desktop

Add this configuration to your Claude Desktop settings file:

```json
{
  "mcpServers": {
    "resume-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-stdio"],
      "env": {
        "MCP_SERVER_URL": "https://resume-mcp.sprobertson.workers.dev/sse"
      }
    }
  }
}
```

## Available Tools

### Basic Information
- **`resume_basics`** - Get basic contact information and personal details
  - Example: "What are Sean's contact details?"

- **`resume_summary`** - Get professional summary
  - Example: "Tell me about Sean's professional background"

### Experience & Education
- **`resume_experience`** - Get work experience with optional filters
  - Parameters: `company` (string), `role` (string), `year` (number)
  - Example: "What was Sean doing in 2020?"

- **`resume_education`** - Get educational background
  - Example: "Where did Sean go to school?"

### Projects & Skills
- **`resume_projects`** - Get professional projects
  - Example: "What projects has Sean worked on?"

- **`resume_personal_projects`** - Get personal/side projects
  - Example: "What personal projects has Sean built?"

- **`resume_skills`** - Get technical skills with optional category filter
  - Parameters: `category` (enum: "highLevel", "languages", "frameworks", "toolsPlatforms", "databases")
  - Example: "What are Sean's technical skills?"
  - Example: "What programming languages does Sean know?"

### Search & Export
- **`resume_search`** - Search across all resume content
  - Parameters: `query` (string, required)
  - Example: "Find mentions of LLMs in Sean's resume"

- **`resume_as_markdown`** - Export the entire resume as formatted markdown
  - Example: "Show me Sean's full resume in markdown format"

## Server Endpoints

- **SSE Endpoint**: `https://resume-mcp.sprobertson.workers.dev/sse`
- **HTTP Endpoint**: `https://resume-mcp.sprobertson.workers.dev/mcp`
