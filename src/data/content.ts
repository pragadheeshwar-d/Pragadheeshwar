// Central data file — all your real portfolio content lives here

export const personal = {
  name: "Pragadheeshwar D",
  title: "Aspiring Ethical Hacker & AI Enthusiast",
  email: "pragadheesh06112007@gmail.com",
  phone: "+91 9786479416",
  location: "Pudukkottai, India",
  github: "https://github.com/pragadheeshwar-d",
  instagram: "https://www.instagram.com/d_pragadheeshwar/",
  facebook: "https://www.facebook.com/pragadheeshwar06/",
  twitter: "https://x.com/Pragadheesh06",
  leetcode: "https://leetcode.com/u/Pragadheeshwar-06/",
  codechef: "https://www.codechef.com/users/pragadhees_06",
  gfg: "https://www.geeksforgeeks.org/profile/pragadhees06",
  codolio: "https://codolio.com/profile/pragadheesh/problemSolving",
  codeforces: "https://codeforces.com/profile/pragadheesh",
  code360: "https://www.naukri.com/code360/profile/Pragadheesh",
};

export const codingStats = {
  totalSolved: "--", // Update this total across all platforms
  platforms: [
    {
      name: "LeetCode",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png", // We'll use custom SVG/Text if needed, or simple text for now.
      link: "https://leetcode.com/u/Pragadheeshwar-06/",
      solved: "--",
      badge: "Top 40%",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
    },
    {
      name: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/profile/pragadhees06",
      solved: "--", // Update with real number
      badge: "Coding Score 785", 
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
    },
    {
      name: "CodeChef",
      link: "https://www.codechef.com/users/pragadhees_06",
      solved: "--", // Updated with real number
      badge: "Max Rating 1357",
      color: "from-amber-700/20 to-yellow-600/20",
      borderColor: "border-yellow-600/30",
      textColor: "text-yellow-500",
    },
    {
      name: "Codeforces",
      link: "https://codeforces.com/profile/pragadheesh",
      solved: "--",
      badge: "Max Rating 981 (Newbie)",
      color: "from-blue-600/20 to-indigo-600/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
    }
  ]
};

export const skills = {
  programming: [
    { name: "Python", level: 85 },
    { name: "C++", level: 80 },
    { name: "C", level: 50 },
    { name: "JavaScript", level: 75 },
  ],
  web: [
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "Responsive Web Design", level: 80 },
  ],
  database: [
    { name: "MySQL", level: 70 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "GitHub", level: 85 },
    { name: "Visual Studio Code", level: 90 },
  ],
  coreConcepts: [
    { name: "Data Structures & Algorithms", level: 75 },
    { name: "Object-Oriented Programming", level: 80 },
    { name: "Problem Solving", level: 85 },
    { name: "API Integration", level: 75 },
  ],
  ai: [
    { name: "Generative AI", level: 70 },
    { name: "Prompt Engineering", level: 80 },
  ],
};

export const projects = [
  {
    id: "adhiraa",
    title: "Adhiraa Voice AI",
    category: "AI & Voice Development",
    featured: true,
    description: "A Python-based voice AI system built on LiveKit Agents and deployed through LiveKit Cloud. It enables developers to create intelligent, real-time conversational agents that can interact via voice, integrate with frontends, and connect to telephony systems. Converted directly from the LiveKit Agent Builder to ensure production-ready code identical to deployed agents.",
    features: [
      "Voice AI Pipeline: Powered by LiveKit Inference, supporting 50+ model providers including real-time models.",
      "Local & Cloud Deployment: Run agents locally for testing, then deploy to LiveKit Cloud for production.",
      "Frontend Integration: Starter templates available for React, Swift, Flutter, React Native, Android, and Web Embed.",
      "Telephony Support: Add SIP integration for phone-based voice agents.",
      "Observability: Monitor latency, conversation quality, and agent performance with built-in observability tools.",
      "AI Assistant Context: Includes AGENTS.md for guiding coding assistants with project-specific patterns.",
      "Use Case: Voice Assistants for web, mobile, and desktop applications.",
      "Use Case: Customer Support Agents with telephony integration.",
      "Use Case: Interactive Learning Tools powered by real-time AI models.",
      "Use Case: Smart Workflows using tasks and handoffs for reliable, low-latency responses."
    ],
    tech: ["Python", "Next.js", "LiveKit", "WebRTC", "Vercel"],
    liveUrl: "https://adhiraa-web.vercel.app/",
    githubUrl: "https://github.com/pragadheeshwar-d/Adhiraa",
    color: "from-violet-600 to-sky-500",
    icon: "/voice-ai-banner.png",
  },
  {
    id: "filetransfer",
    title: "FileTransfer",
    category: "Web Development",
    featured: true,
    description:
      "High-speed, secure peer-to-peer file transfer using WebRTC technology. Your data stays private via a direct device-to-device connection — no files stored on any server.",
    features: [
      "No file size limits — send documents to 4K videos.",
      "Completely browser-based; no software installation required.",
      "Cross-platform: Works seamlessly on PC, Android, and iOS.",
    ],
    tech: ["WebRTC", "JavaScript (ES6+)", "PeerJS", "HTML5/CSS3"],
    liveUrl: "",
    color: "from-sky-500 to-emerald-400",
    icon: "/filetransfer-banner.png",
  },
  {
    id: "ai-resume-analyser",
    title: "AI Resume Analyser",
    category: "AI & Tools",
    featured: false,
    description: "A production-style resume analysis tool built with HTML, CSS, JavaScript, and Node.js + Express. It helps job seekers and professionals evaluate their resumes against job descriptions, providing actionable insights to improve their chances with Applicant Tracking Systems (ATS) and recruiters.",
    features: [
      "Resume Upload: Supports PDF and DOCX formats.",
      "Text Extraction & ATS Score: Parses resume content and evaluates compatibility with ATS systems.",
      "Job Description Matching: Compares resume against target job postings.",
      "Keyword Detection: Identifies missing or weak keywords.",
      "AI-Powered Enhancement: Uses OpenAI for advanced analysis, with fallback keyword-based scoring if no API key is provided.",
      "Suggestions & Insights: Highlights weak areas and improvement opportunities.",
      "Modern UI: Glassmorphism dashboard with dark/light mode.",
      "Downloadable Reports: Generates PDF summaries of analysis.",
      "Use Case: Job seekers optimizing resumes for ATS systems.",
      "Use Case: Career coaches providing feedback to clients.",
      "Use Case: Students preparing resumes for internships or placements."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "OpenAI API"],
    liveUrl: "https://ai-resume-analyzer-g9f3.onrender.com/",
    githubUrl: "https://github.com/pragadheeshwar-d/Ai-Resume-AnalyZer",
    color: "from-blue-500 to-cyan-400",
    icon: "/resume-analyser-banner.png",
  },
  {
    id: "dsa-visualiser",
    title: "DSA Visualiser",
    category: "Educational Tool",
    featured: false,
    description: "An interactive learning tool designed to help students and developers understand Data Structures and Algorithms (DSA) through real-time visualizations. Built with modern web technologies, it transforms abstract concepts into clear, animated diagrams, making problem-solving more intuitive and engaging.",
    features: [
      "Algorithm Animation: Step-by-step visualization of sorting, searching, graph, and dynamic programming algorithms.",
      "Data Structure Simulation: Interactive views of arrays, linked lists, stacks, queues, trees, and graphs.",
      "Step Control: Play, pause, and step through algorithm execution to observe changes at each stage.",
      "Custom Input: Users can provide their own data sets to see how algorithms behave in different scenarios.",
      "Performance Insights: Displays time complexity and space usage alongside visual execution.",
      "Responsive Design: Works seamlessly across desktop and mobile devices.",
      "Use Case: Students learning DSA concepts with visual reinforcement.",
      "Use Case: Educators demonstrating algorithms in classrooms.",
      "Use Case: Interview Preparation for candidates practicing problem-solving."
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "React"],
    liveUrl: "https://pragadheeshwar-d.github.io/DSA-Visualiser/index.html",
    githubUrl: "https://github.com/pragadheeshwar-d/DSA-Visualiser",
    color: "from-emerald-500 to-teal-400",
    icon: "/dsa-visualiser-banner.png",
  },
  {
    id: "traffic-flow-predictor",
    title: "Traffic Flow Predictor",
    category: "Data Science",
    featured: false,
    description: "A Flask-based web application that models, analyzes, and forecasts traffic conditions in the Coimbatore road network. Integrates graph-based routing algorithms (A* & Dijkstra), congestion forecasting models, and real-time incident monitoring to deliver a comprehensive traffic management solution — deployed live on Render.",
    features: [
      "Live Traffic Dashboard: Displays current traffic flow, node/edge status, and active incidents in real time.",
      "Route Planner: Computes optimal paths using A* and Dijkstra algorithms with optional OSRM integration for realistic road geometry.",
      "Congestion Prediction: Forecasts traffic density up to 12 hours ahead using historical and real-time data.",
      "Incident Monitoring: Tracks accidents, roadblocks, and anomalies across the network.",
      "Analytics Dashboard: Visualizes peak-hour traffic trends and evaluates prediction model accuracy.",
      "Smart City Ready: Supports urban traffic management, navigation assistance, and event-surge planning.",
    ],
    tech: ["Python", "Flask", "A* Algorithm", "Dijkstra", "OSRM", "OpenStreetMap", "HTML5", "CSS3", "JavaScript", "Gunicorn", "Render"],
    liveUrl: "https://traffic-flow-predictor.onrender.com/",
    githubUrl: "https://github.com/pragadheeshwar-d/Traffic-Flow-Predictor",
    color: "from-red-500 to-orange-400",
    icon: "/traffic-flow-icon.png",
  },
  {
    id: "solution-generator",
    title: "Solution Generator",
    category: "Development Tools",
    featured: false,
    description: "An automated tool that generates optimal code solutions for programming problems using AI models.",
    features: [
      "Supports multiple programming languages.",
      "Integrates with modern AI language models.",
      "Outputs formatted and commented code."
    ],
    tech: ["Python", "AI APIs"],
    liveUrl: "",
    color: "from-indigo-500 to-purple-400",
    icon: "/solution-gen-banner.png",
  },
  {
    id: "leetcode-submit",
    title: "Leetcode Submit",
    category: "Automation",
    featured: false,
    description: "An automation script designed to automatically submit solutions to LeetCode and manage problem-solving workflows.",
    features: [
      "Automated login and submission.",
      "Syncs local solutions with LeetCode account.",
      "Error handling and retry logic."
    ],
    tech: ["Python", "Selenium", "Web Scraping"],
    liveUrl: "",
    color: "from-yellow-500 to-amber-400",
    icon: "/leetcode-banner.png",
  }
];

export const certificates = [
  { title: "C Programming Basics", issuer: "Simplilearn SkillUp", desc: "Completed foundational C programming training covering variables, loops, functions, arrays, and problem-solving techniques.", color: "text-sky-400", viewUrl: "/certificates/717825F140_Pragadheeshwar%20D.pdf", downloadUrl: "/certificates/717825F140_Pragadheeshwar%20D.pdf" },
  { title: "Introduction to Generative AI Studio", issuer: "Simplilearn SkillUp", desc: "Explored Generative AI concepts, prompt engineering, AI content generation, and modern AI workflows.", color: "text-violet-400", viewUrl: "/certificates/Generative_AI_Pragadhees.pdf", downloadUrl: "/certificates/Generative_AI_Pragadhees.pdf" },
  { title: "Introduction to Artificial Intelligence", issuer: "Simplilearn SkillUp", desc: "Learned AI fundamentals including machine learning concepts, neural networks, and real-world AI applications.", color: "text-cyan-400", viewUrl: "/certificates/Introduction%20to%20AI.pdf", downloadUrl: "/certificates/Introduction%20to%20AI.pdf" },
  { title: "Cybersecurity & Ethical Hacking", issuer: "Cappriciosec University", desc: "Completed intensive training in cybersecurity, penetration testing, web security, Linux, networking, and ethical hacking.", color: "text-red-400", viewUrl: "/certificates/Pragadheeshwar%20D.pdf", downloadUrl: "/certificates/Pragadheeshwar%20D.pdf" },
  { title: "HTML Training", issuer: "IIT Bombay Spoken Tutorial", desc: "Mastered HTML fundamentals, semantic elements, forms, accessibility, and modern web page structure.", color: "text-orange-500", viewUrl: "/certificates/PRAGADHEESHWAR-D-HTML.pdf", downloadUrl: "/certificates/PRAGADHEESHWAR-D-HTML.pdf" },
  { title: "CSS (Basic)", issuer: "HackerRank", desc: "Validated proficiency in CSS fundamentals, layouts, Flexbox, Grid, responsive design, and styling techniques.", color: "text-blue-400", viewUrl: "/certificates/css%20certificate.pdf", downloadUrl: "/certificates/css%20certificate.pdf" },
  { title: "Python (Basic)", issuer: "HackerRank", desc: "Demonstrated knowledge of Python syntax, functions, data structures, and problem-solving skills.", color: "text-yellow-400", viewUrl: "/certificates/python_basic%20certificate.pdf", downloadUrl: "/certificates/python_basic%20certificate.pdf" },
  { title: "C Training", issuer: "IIT Bombay Spoken Tutorial", desc: "Achieved 97.5% score while strengthening programming logic, algorithms, and core C concepts.", color: "text-green-400", viewUrl: "/certificates/PRAGADHEESHWAR-Participant-Certificate.pdf", downloadUrl: "/certificates/PRAGADHEESHWAR-Participant-Certificate.pdf" },
];

export const timeline = [
  { year: "2020", title: "Started Programming", desc: "Learned Python basics during the COVID-19 pandemic." },
  { year: "2023-24", title: "Grade 11", desc: "Started learning C++ and focused on building a strong foundation in programming logic." },
  { year: "2024-25", title: "Grade 12", desc: "Returned to Python, deepening my understanding of programming concepts and algorithms." },
  { year: "2025-26 (Sem 1)", title: "College 1st Year", desc: "Started at Karpagam College of Engineering. Focused on C programming and core concepts." },
  { year: "2025-26 (Sem 2)", title: "Core Fundamentals", desc: "Diving deep into Web Technology, Data Structures, and Graph Theory." },
];

export const whyHireMe = [
  "AI Development Experience",
  "Strong Problem Solving",
  "Python Expertise",
  "Fast Learning Ability",
  "Real-world Projects",
  "Open Source Mindset",
];

export const education = [
  { institution: "Government High School, T.Pudhupatti", duration: "2022 - 2023", desc: "10th Grade. Scored 453/500." },
  { institution: "Sivagangai District Government Model School", duration: "2024 - 2025", desc: "12th Grade. Scored 547/600 and achieved a centum in Computer Science." },
  { institution: "Karpagam College of Engineering", duration: "2025 - Present", desc: "B.Tech. in Information Technology, located in Coimbatore." },
];
