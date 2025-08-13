import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { resume, resumeAsMarkdown, searchResume } from "./resume"

// ---------------------------------------------
// Simple MCP server that serves Sean's resume
// ---------------------------------------------
// Endpoints:
//  - HTTP:      /mcp
//  - SSE:       /sse (or /sse/message)
// Tools:
//  - resume.basics
//  - resume.summary
//  - resume.education
//  - resume.experience (optional filters)
//  - resume.projects
//  - resume.skills (optional category)
//  - resume.search (simple keyword search)
//  - resume.as_markdown
// ---------------------------------------------

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
    server = new McpServer({ name: "Sean Resume Server", version: "1.0.0" });

    async init() {
        // Basics
        this.server.tool("resume_basics", z.object({}), async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.basics, null, 2) }],
        }));

        // Summary
        this.server.tool("resume_summary", z.object({}), async () => ({
            content: [{ type: "text", text: resume.summary }],
        }));

        // Education
        this.server.tool("resume_education", z.object({}), async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.education, null, 2) }],
        }));

        // Experience with optional filters
        this.server.tool(
            "resume_experience",
            z.object({
                company: z.string().optional(),
                role: z.string().optional(),
                year: z.number().int().optional(),
            }),
            async ({ company, role, year }) => {
                let data = resume.experience;
                if (company) data = data.filter((j) => j.company.toLowerCase().includes(company.toLowerCase()));
                if (role) data = data.filter((j) => j.role.toLowerCase().includes(role.toLowerCase()));
                if (year)
                    data = data.filter((j) => {
                        const [start, end] = j.period.replace(/\s/g, "").split("–").map(Number);
                        const y = Number(year);
                        return y >= start && y <= (isNaN(end) ? y : end);
                    });
                return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
            }
        );

        // Projects
        this.server.tool("resume_projects", z.object({}), async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.projects, null, 2) }],
        }));

        // Skills (optional category)
        this.server.tool(
            "resume_skills",
            z.object({ category: z.enum(["highLevel", "languages", "frameworks", "toolsPlatforms", "databases"]).optional() }),
            async ({ category }) => {
                const data = category ? (resume.skills as any)[category] : resume.skills;
                return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
            }
        );

        // Search
        this.server.tool("resume_search", z.object({ query: z.string().min(1) }), async ({ query }) => {
            const hits = searchResume(query);
            return { content: [{ type: "text", text: JSON.stringify({ query, hits }, null, 2) }] };
        });

        // Markdown export
        this.server.tool("resume_as_markdown", z.object({}), async () => ({
            content: [{ type: "text", text: resumeAsMarkdown }],
        }));
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/sse" || url.pathname === "/sse/message") {
            return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};
