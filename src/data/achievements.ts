import { Achievement } from "@/types";

export const achievements: Achievement[] = [
    {
        id: "hackathon-1",
        icon: "trophy",
        category: "HACKATHON",
        title: "Smart India Hackathon Finalist",
        description:
            "Reached the finals of SIH with an AI-powered solution for automated document processing and classification.",
        date: "Dec 2024",
    },
    {
        id: "hackathon-2",
        icon: "medal",
        category: "HACKATHON",
        title: "College Hackathon Winner",
        description:
            "Won first place with a real-time collaboration tool built in 24 hours using WebSocket and React.",
        date: "Sep 2024",
    },
    {
        id: "certification-1",
        icon: "certificate",
        category: "CERTIFICATION",
        title: "Full Stack Web Development",
        description:
            "Completed an intensive full-stack certification covering React, Node.js, PostgreSQL, and deployment workflows.",
        date: "Jun 2024",
    },
    {
        id: "opensource-1",
        icon: "code",
        category: "OPEN SOURCE",
        title: "First Open Source Contribution",
        description:
            "Contributed bug fixes and feature enhancements to a popular React component library used by thousands.",
        date: "Mar 2024",
    },
    {
        id: "recognition-1",
        icon: "star",
        category: "RECOGNITION",
        title: "Dean's List — Academic Excellence",
        description:
            "Recognized for academic excellence while maintaining an active project portfolio and extracurricular involvement.",
        date: "May 2024",
    },
    {
        id: "hackathon-3",
        icon: "rocket",
        category: "HACKATHON",
        title: "TechFest Innovation Award",
        description:
            "Received the innovation award for building a sustainability-focused web application at a national tech festival.",
        date: "Jan 2025",
    },
];
