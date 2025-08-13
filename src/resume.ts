// --- Static resume data --- //
export const resume = {
    basics: {
        name: "Sean Paul Robertson",
        location: "Seattle, WA",
        email: "sprobertson@gmail.com",
        links: {
            linkedin: "https://linkedin.com/in/sprobertson",
            github: "https://github.com/spro",
            website: "https://spro.ai",
        },
        title: "Web-focused full-stack engineer with AI research experience",
    },
    summary:
        "Full‑stack engineer and architect with deep experience shipping web/mobile products, leading teams, and integrating practical AI/LLM capabilities. Built platforms, data pipelines, developer tooling, and microservice systems across cloud and on‑prem.",
    education: [
        {
            institution: "Massachusetts Institute of Technology",
            period: "2008 – 2012",
            details: [
                "Candidate for BS in Computer Science and Engineering and Brain and Cognitive Sciences",
                "Worked under Tim Berners‑Lee on a browser extension to interpret and display semantic web data",
            ],
        },
    ],
    experience: [
        {
            role: "Lead Engineer and Architect",
            company: "Nuve Platform",
            location: "Chicago, IL",
            period: "2021 – 2025",
            bullets: [
                "Led end‑to‑end development of a cloud platform for one‑click SAP server deployment",
                "Designed and built monitoring/automation to manage SAP instances across multi‑cloud and on‑premise",
                "Mentored dev team; established best practices for code quality, system design, and CI/CD",
            ],
        },
        {
            role: "Co‑Founder and Lead Engineer",
            company: "Prontotype",
            location: "San Francisco, CA",
            period: "2011 – 2021",
            bullets: [
                "Co‑founded a software agency specializing in rapid full‑stack web and mobile development",
                "Handled end‑to‑end project lifecycle from sales and design to implementation and deployment",
                "Scaled from small teams to enterprise clients worldwide",
            ],
            highlights: [
                {
                    client: "ManpowerGroup — Workforce Assessment Suite",
                    period: "2017 – 2021 (Milwaukee, WI)",
                    details: [
                        "Suite of web‑based assessments aggregating personality trait data",
                        "Admin dashboards for visualization and applicant filtering",
                    ],
                },
                {
                    client: "Applied Technology Council — Structural Hazards Search Tool",
                    period: "2016 – 2020 (Redwood City, CA)",
                    details: [
                        "Mapping tool integrating ASCE reference data for wind, snow, tornado, and seismic risk",
                        "Supported ~50k MAU with a polyglot Somata microservices architecture",
                    ],
                },
                {
                    client: "Winsborough Limited — Psychological Assessment Platform",
                    period: "2017 – 2019 (Auckland, NZ)",
                    details: [
                        "Platform for developing assessments based on internal psychology research",
                        "Insights dashboards across companies",
                    ],
                },
                {
                    client: "Level Solar — Solar Sales Software Suite",
                    period: "2012 – 2017 (Long Island, NY)",
                    details: [
                        "React Native iOS/Android app + Node.js backend with Salesforce, MongoDB, Redis; >2.5M interactions tracked",
                        "Web management dashboard (React/Node) with real‑time geolocation and conversion analytics",
                        "Energy monitoring app with real‑time solar production",
                        "Developed a pre‑Expo on‑demand update system for RN apps (bypassing store review delays)",
                    ],
                },
            ],
            internalTools: [
                {
                    name: "Somata — Microservices framework",
                    link: "https://github.com/somata",
                    details: [
                        "Polyglot RPC + pub/sub framework with libraries for Python, Node.js, Lua, and Go",
                        "Common interface over ZeroMQ, HTTP, WebSockets, and gRPC",
                    ],
                },
                {
                    name: "Nexus — Team collaboration hub",
                    details: [
                        "Central chat, tasking, and real‑time metrics",
                        "Handled millions of events with a custom MongoDB‑based ORM",
                    ],
                },
            ],
        },
    ],
    projects: [
        {
            name: "RARNN — Recursive Application of RNNs",
            link: "https://github.com/spro/rarnn",
            details: [
                "Extends seq2seq+attention with a recursive architecture to parse complex intent hierarchies",
                "DSL to synthesize large training sets from small intent/object inventories",
                "Deployed as an Alexa‑style assistant for parallel and conditional home‑automation intents",
            ],
        },
        {
            name: "Practical PyTorch — Tutorial series (NLP)",
            link: "https://github.com/spro/practical-pytorch",
            details: [
                "Hands‑on NLP tutorials (classification, generation, translation) with small, PC‑trainable models",
                "Adopted as the first official PyTorch NLP tutorials",
            ],
        },
    ],
    skills: {
        highLevel: [
            "Full‑stack web/mobile applications",
            "Intuitive UI design",
            "Translating ambiguous requirements",
            "Cloud and on‑prem deployment automation",
            "Practical integration of AI & LLM tools",
        ],
        languages: [
            "TypeScript/JavaScript",
            "Python",
            "Go",
            "Swift",
            "Bash",
            "Lua",
            "Java",
            "PHP",
            "C (AVR embedded)",
            "Crystal",
        ],
        frameworks: [
            "React",
            "Svelte",
            "Vue",
            "Node.js",
            "Next.js",
            "React Native",
            "FastAPI",
            "Pandas",
            "LangChain",
            "LangGraph",
            "PydanticAI",
            "CrewAI",
        ],
        toolsPlatforms: [
            "Docker",
            "Kubernetes",
            "Terraform",
            "GitHub Actions",
            "Linux",
            "AWS",
            "GCP",
            "Azure",
            "Digital Ocean",
        ],
        databases: [
            "Postgres",
            "MySQL",
            "MongoDB",
            "EdgeDB",
            "Redis",
            "ElasticSearch",
            "Relational/NoSQL/KV/Graph schema design",
        ],
    },
};

// Helpers
export const resumeToMarkdown = () => {
    const lines: string[] = [];
    lines.push(`# ${resume.basics.name}`);
    lines.push(`${resume.basics.location} · ${resume.basics.email}`);
    lines.push(
        `${resume.basics.links.linkedin} · ${resume.basics.links.github} · ${resume.basics.links.website}`
    );
    lines.push("\n" + resume.basics.title + "\n");
    lines.push("## Experience");
    for (const job of resume.experience) {
        lines.push(`\n### ${job.role}, ${job.company} — ${job.location} (${job.period})`);
        for (const b of job.bullets) lines.push(`- ${b}`);
        if (job.highlights) {
            for (const h of job.highlights) {
                lines.push(`  - _${h.client}_ (${h.period})`);
                for (const d of h.details) lines.push(`    - ${d}`);
            }
        }
        if (job.internalTools) {
            lines.push("  - _Internal tools_");
            for (const t of job.internalTools) {
                lines.push(`    - ${t.name}`);
                for (const d of t.details) lines.push(`      - ${d}`);
            }
        }
    }
    lines.push("\n## Education");
    for (const ed of resume.education) {
        lines.push(`\n### ${ed.institution} (${ed.period})`);
        for (const d of ed.details) lines.push(`- ${d}`);
    }
    lines.push("\n## Selected Projects");
    for (const p of resume.projects) {
        lines.push(`\n### ${p.name} — ${p.link}`);
        for (const d of p.details) lines.push(`- ${d}`);
    }
    lines.push("\n## Skills & Keywords");
    lines.push("\n### High level:\n" + resume.skills.highLevel.join(", "));
    lines.push("\n### Languages:\n" + resume.skills.languages.join(", "));
    lines.push("\n### Frameworks & Libraries:\n" + resume.skills.frameworks.join(", "));
    lines.push("\n### Tools & Platforms:\n" + resume.skills.toolsPlatforms.join(", "));
    lines.push("\n### Databases:\n" + resume.skills.databases.join(", "));
    return lines.join("\n");
};

export const resumeAsMarkdown = resumeToMarkdown();

// Search

function contains(text: string, q: string) {
    return text.toLowerCase().includes(q.toLowerCase());
}

export function searchResume(query: string) {
    const q = query.trim();
    const hits: Array<{ section: string; path: string; text: string }> = [];

    // Basics & summary
    if (contains(resume.basics.name, q)) hits.push({ section: "basics", path: "name", text: resume.basics.name });
    if (contains(resume.summary, q)) hits.push({ section: "summary", path: "summary", text: resume.summary });

    // Experience
    resume.experience.forEach((job, i) => {
        const base = `experience[${i}]`;
        if ([job.role, job.company, job.location, job.period].some((t) => contains(t, q))) {
            hits.push({ section: "experience", path: base, text: `${job.role} @ ${job.company} (${job.period})` });
        }
        job.bullets?.forEach((b, j) => {
            if (contains(b, q)) hits.push({ section: "experience", path: `${base}.bullets[${j}]`, text: b });
        });
        job.highlights?.forEach((h, j) => {
            if ([h.client, h.period].some((t) => contains(t, q))) {
                hits.push({ section: "experience", path: `${base}.highlights[${j}]`, text: `${h.client} (${h.period})` });
            }
            h.details.forEach((d, k) => {
                if (contains(d, q)) hits.push({ section: "experience", path: `${base}.highlights[${j}].details[${k}]`, text: d });
            });
        });
        job.internalTools?.forEach((t, j) => {
            if (contains(t.name, q)) hits.push({ section: "experience", path: `${base}.internalTools[${j}].name`, text: t.name });
            t.details.forEach((d, k) => {
                if (contains(d, q)) hits.push({ section: "experience", path: `${base}.internalTools[${j}].details[${k}]`, text: d });
            });
        });
    });

    // Education
    resume.education.forEach((ed, i) => {
        const base = `education[${i}]`;
        if (contains(ed.institution, q) || contains(ed.period, q)) {
            hits.push({ section: "education", path: base, text: `${ed.institution} (${ed.period})` });
        }
        ed.details.forEach((d, j) => {
            if (contains(d, q)) hits.push({ section: "education", path: `${base}.details[${j}]`, text: d });
        });
    });

    // Projects
    resume.projects.forEach((p, i) => {
        const base = `projects[${i}]`;
        if (contains(p.name, q) || contains(p.link, q)) {
            hits.push({ section: "projects", path: base, text: `${p.name}` });
        }
        p.details.forEach((d, j) => {
            if (contains(d, q)) hits.push({ section: "projects", path: `${base}.details[${j}]`, text: d });
        });
    });

    // Skills
    const categories: Array<[string, string[]]> = [
        ["highLevel", resume.skills.highLevel],
        ["languages", resume.skills.languages],
        ["frameworks", resume.skills.frameworks],
        ["toolsPlatforms", resume.skills.toolsPlatforms],
        ["databases", resume.skills.databases],
    ];
    categories.forEach(([name, arr]) => {
        arr.forEach((s, i) => {
            if (contains(s, q)) hits.push({ section: "skills", path: `skills.${name}[${i}]`, text: s });
        });
    });

    return hits;
}

