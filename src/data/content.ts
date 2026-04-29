export const person = {
  name: "James Kendrick",
  title: "Software Engineer",
  subtitle: "Data Engineer · Systems/Platform · Backend",
  bio: "CS + Math at UIUC. I build high-performance systems — from genetic algorithms and CLI tools to large-scale data pipelines. Incoming Data Engineer at Meta.",
  email: "kendrickj5@yahoo.com",
  github: "https://github.com/jlkendrick",
  linkedin: "https://linkedin.com/in/jlkendrick",
  location: "Champaign, IL",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  highlights: string[];
  github?: string;
  live?: string;
  brewInstall?: string;
  featured?: boolean;
  demo?: string;
  demoHeight?: number;
};

export const projects: Project[] = [
  {
    id: "grimoire",
    title: "Grimoire",
    description: "[Still under heavy development] Declarative CLI execution framework that turns any function into a fully typed command with zero boilerplate.",
    longDescription:
      "A language-agnostic developer productivity tool built in Go. Define functions in Python or Go (more supported languages coming soon), describe them in a spell.yaml or let Grimoire infer the signature from the function itself, and Grimoire auto-generates fully typed CLI commands — handling argument parsing, type coercion, and runtime dependency provisioning (Python venvs, Go binaries) automatically. Uses Tree-sitter for AST-based function signature extraction, eliminating manual config.",
    tech: ["Go", "Cobra", "Tree-sitter", "YAML", "Python"],
    highlights: [
      "AST-based signature extraction via Tree-sitter (Python + Go)",
      "Automatic venv/binary provisioning with SHA-256 dep caching",
      "Dynamic Cobra command generation from YAML spell definitions",
      "Real-time subprocess IO streaming with stdin JSON arg passing",
    ],
    github: "https://github.com/jlkendrick/grimoire",
    live: "https://jlkendrick.github.io/grimoire/",
    brewInstall: "brew install jlkendrick/tap/grimoire",
    demo: "/videos/grimoire-demo.mp4",
  },
  {
    id: "court-vision",
    title: "Court Vision",
    description: "Full-stack fantasy basketball analytics platform with a proprietary lineup optimization engine.",
    longDescription:
      "A production-grade microservices platform for fantasy basketball managers. Engineered a Genetic Algorithm in Go that solves the NP-Hard lineup optimization problem — evaluating ~10⁹ combinations via concurrent population evolution, consistently outperforming greedy heuristics by ~15% in projected fantasy points.",
    tech: ["Go", "Python", "FastAPI", "PostgreSQL", "TypeScript", "Next.js"],
    highlights: [
      "Genetic Algorithm in Go for NP-Hard lineup optimization",
      "Concurrent Goroutines with tournament selection & crossover",
      "Custom constraint-satisfaction engine with backtracking",
      "Dual ETL pipelines from ESPN + NBA APIs",
    ],
    github: "https://github.com/court-vision",
    live: "https://courtvision.dev",
    featured: true,
    demo: "/videos/court-vision-demo.mp4",
    demoHeight: 295,
  },
  {
    id: "dirvana",
    title: "Dirvana",
    description: "High-performance C++ CLI for intelligent terminal navigation with sub-millisecond path resolution.",
    longDescription:
      "A Zsh augmentation tool built in C++20 that learns from your navigation patterns. Embeds SQLite for persistent history and uses a frequency/recency ranking algorithm to surface the right directory instantly — reducing keystrokes by ~40% during deep traversal.",
    tech: ["C++20", "SQLite", "CMake", "Zsh", "Shell"],
    highlights: [
      "Sub-millisecond path resolution via embedded SQLite",
      "Context-aware ranking from historical usage patterns",
      "Quick-nav engine wrapping standard shell binaries",
      "curl | bash installer with Zsh config injection",
    ],
    github: "https://github.com/jlkendrick/dirvana",
    brewInstall: "brew install jlkendrick/tap/dirvana",
    demo: "/videos/dirvana-demo.mp4",
    demoHeight: 383,
    live: "https://jlkendrick.github.io/dirvana/"
  },
  {
    id: "sqlmate",
    title: "SQLMate",
    description: "Full-stack, embeddable database exploration tool with a graph-based SQL JOIN resolution engine.",
    longDescription:
      "A containerized application that plugs into any PostgreSQL or MySQL database and introspects schemas at runtime, constructing a directed graph of foreign key relationships. Uses BFS to find the shortest JOIN path between any two tables — automatically generating valid multi-table queries without manual input.",
    tech: ["Next.js", "FastAPI", "Python", "SQLAlchemy", "TypeScript"],
    highlights: [
      "Graph-based SQL resolution via foreign key introspection",
      "BFS shortest-path JOIN generation between disconnected tables",
      "Drag-and-drop query builder interface",
      "Multi-database support with JWT authentication",
    ],
    github: "https://github.com/jlkendrick/sqlmate",
    live: "https://courtvision.dev/query-builder",
    demo: "/videos/sqlmate-demo.mp4",
    demoHeight: 295,
  },
  {
    id: "reco-forge",
    title: "Reco-Forge",
    description: "Rust crate for NLP-driven recommendation systems using Hugging Face transformers.",
    longDescription:
      "A published Rust library (crates.io v0.1.2) for building personalized recommendation systems. Uses Candle to run pre-trained transformer models locally, generating vector embeddings for cosine similarity clustering and tag-based filtering.\n\nThis isn't my proudest project, but it's honest work!",
    tech: ["Rust", "Candle", "HuggingFace", "NLP", "crates.io"],
    highlights: [
      "Published on crates.io (v0.1.2)",
      "Candle-based transformer inference for local embedding generation",
      "Cosine similarity + Euclidean distance clustering",
      "Tag-based filtering with JSON dataset serialization",
    ],
    github: "https://github.com/jlkendrick/reco-forge",
    live: "https://crates.io/crates/reco-forge",
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  status?: "incoming" | "completed";
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Meta",
    role: "Data Engineer Intern",
    location: "Seattle, WA",
    period: "Summer 2026",
    status: "incoming",
    bullets: [
      "Incoming for Summer 2026.",
    ],
  },
  {
    company: "Meta",
    role: "Data Engineer Intern",
    location: "New York City, NY",
    period: "May – Aug 2025",
    status: "completed",
    bullets: [
      "Architected a configuration-driven Python ETL framework that horizontally scaled dimensional modeling across the IG Graph domain, enabling others to define arbitrary event chains and deploy multi-terabyte pipelines in minutes.",
      "Optimized the framework’s procedural SQL translator to execute a disk-backed, Breadth-First Search (BFS) data cube lattice, bypassing Presto out-of-memory limitations and slashing peak memory utilization by ~80% across all generated pipelines.",
      "Designed and deployed large-scale data pipelines in Python, powering interactive dashboards that analyze and monitor the user experience of discovering and connecting with friends on Instagram, partnering with DSs and DEs.",
      "Improved private follow surface attribution accuracy by 4% in existing pipelines and overall surface attribution by 20% in new ones, impacting 30+ downstream metrics consumed by 100+ users and enabling more reliable product decision-making.",
      "Orchestrated complex dependency graphs within Dataswarm (Meta’s internal Airflow), enforcing strict SLAs for 30+ downstream systems consumed by 100+ internal stakeholders.",
    ],
  },
];

export const education = {
  school: "University of Illinois Urbana-Champaign",
  degree: "B.S. Mathematics & Computer Science",
  period: "Aug 2023 – May 2027",
  gpa: "3.91 / 4.00",
  courses: [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Computer Systems",
    "Programming Languages",
  ],
  irrelevantCourses: [
    "Real Analysis",
    "Nonlinear Programming",
    "Abstract Linear Algebra",
    "Models of Computation",
  ],
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    label: "Languages",
    items: ["Python", "Go", "TypeScript", "C++", "SQL", "Haskell"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "PostgreSQL", "AWS", "GCP", "Azure", "Linux", "CI/CD", "Airflow"],
  },
  {
    label: "Frameworks",
    items: ["Next.js", "FastAPI", "React", "Tailwind CSS", "SQLAlchemy", "Candle"],
  },
  {
    label: "Concepts",
    items: [
      "Randomized Algorithms",
      "Graph Theory",
      "ETL Pipelines",
      "Microservices",
      "OOP Design",
    ],
  },
];

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
