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
//  - resume.contact
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
    server = new McpServer({ name: "Sean Robertson (spro)'s Resume Server", version: "1.0.0" });

    async init() {
        // Contact
        this.server.registerTool("resume_contact", {
            title: "Sean's contact info",
            description: "Get Sean's email, links, and tagline."
        }, async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.contact, null, 2) }],
        }));

        // Summary
        this.server.registerTool("resume_summary", {
            title: "Sean's professional summary",
            description: "Get Sean's professional summary and career overview."
        }, async () => ({
            content: [{ type: "text", text: resume.summary }],
        }));

        // Education
        this.server.registerTool("resume_education", {
            title: "Sean's education background",
            description: "Get information about Sean's educational background and qualifications."
        }, async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.education, null, 2) }],
        }));

        // Experience with optional filters
        this.server.registerTool("resume_experience",
            {
                title: "Sean's work experience",
                description: "Get information about the companies Sean has worked for in the past.",
                inputSchema: {
                    company: z.string().optional(),
                    role: z.string().optional(),
                    year: z.number().int().optional(),
                }
            },
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
        this.server.registerTool("resume_projects", {
            title: "Sean's professional projects",
            description: "Get information about Sean's professional projects and work."
        }, async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.projects, null, 2) }],
        }));

        // Personal projects
        this.server.registerTool("resume_personal_projects", {
            title: "Sean's personal projects",
            description: "Get information about Sean's personal projects and side work."
        }, async () => ({
            content: [{ type: "text", text: JSON.stringify(resume.personalProjects, null, 2) }],
        }));

        // Skills
        this.server.registerTool("resume_skills",
            {
                title: "Sean's technical skills",
                description: "Get information about Sean's technical skills, optionally filtered by category.",
                inputSchema: {
                    category: z.enum(["highLevel", "languages", "frameworks", "toolsPlatforms", "databases"]).optional()
                },
            },
            async ({ category }) => {
                const data = category ? (resume.skills as any)[category] : resume.skills;
                return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
            }
        );

        // Search
        this.server.registerTool("resume_search",
            {
                title: "Search Sean's resume",
                description: "Search through Sean's resume content using keywords.",
                inputSchema: { query: z.string().min(1) }
            },
            async ({ query }) => {
                const hits = searchResume(query);
                return { content: [{ type: "text", text: JSON.stringify({ query, hits }, null, 2) }] };
            });

        // Markdown export
        this.server.registerResource("resume_as_markdown", "sean://resume/markdown", {
            title: "Sean's resume as markdown",
            description: "Get Sean's complete resume formatted as markdown.",
            mimeType: "text/markdown",
        }, async (uri) => ({
            contents: [{ uri: uri.href, text: resumeAsMarkdown }],
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
