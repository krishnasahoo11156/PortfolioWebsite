import { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "climate-scrollytelling",
        number: "01",
        title: "Climate Scrollytelling",
        description:
            "An immersive, animated web experience that makes climate change personal through 3D parallax effects, personalized health-risk visualizations, and AI-generated stories powered by the Gemini API.",
        category: "WEB APP",
        techStack: ["HTML", "CSS", "JavaScript", "GSAP", "Gemini API"],
        githubUrl: "https://github.com/krishna",
        liveUrl: "#",
        featured: true,
    },
    {
        id: "inventory-management",
        number: "02",
        title: "PCB Inventory Manager",
        description:
            "A full-stack inventory management system for PCB data with real-time dashboards, Excel import pipelines, and role-based access control for manufacturing teams.",
        category: "WEB APP",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
        githubUrl: "https://github.com/krishna",
        liveUrl: "#",
        featured: true,
    },
    {
        id: "portfolio-website",
        number: "03",
        title: "Developer Portfolio",
        description:
            "This very website — a cinematic, AI-powered portfolio built with Next.js, GSAP, Framer Motion, and Three.js featuring scroll-triggered animations and real-time interactivity.",
        category: "WEB APP",
        techStack: ["Next.js", "TypeScript", "GSAP", "Three.js", "Framer Motion"],
        githubUrl: "https://github.com/krishna",
        liveUrl: "#",
        featured: true,
    },
    {
        id: "ai-chat-tool",
        number: "04",
        title: "AI Knowledge Assistant",
        description:
            "An intelligent chat application leveraging Google's Gemini API for context-aware conversations with document understanding and structured response generation.",
        category: "AI TOOL",
        techStack: ["React", "Node.js", "Gemini API", "WebSocket"],
        githubUrl: "https://github.com/krishna",
        liveUrl: "#",
        featured: true,
    },
    {
        id: "open-source-contrib",
        number: "05",
        title: "Open Source Contributions",
        description:
            "Active contributions to popular open-source projects including bug fixes, feature implementations, and documentation improvements across the JavaScript ecosystem.",
        category: "OPEN SOURCE",
        techStack: ["TypeScript", "React", "Node.js", "Git"],
        githubUrl: "https://github.com/krishna",
        featured: false,
    },
    {
        id: "api-service",
        number: "06",
        title: "RESTful API Service",
        description:
            "A production-grade REST API with JWT authentication, rate limiting, comprehensive documentation, and automated testing — built as a backend boilerplate for rapid development.",
        category: "API",
        techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
        githubUrl: "https://github.com/krishna",
        featured: false,
    },
];
