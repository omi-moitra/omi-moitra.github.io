// =============================================================================
// src/data/projects.js — verified public project cards and case-study content
// -----------------------------------------------------------------------------
// 1. projects    truthful current-site metadata, URLs, and implementation story
// =============================================================================

export const projects = [
  {
    id: 'rocket-elevators-website-admin-dashboard',
    slug: 'rocket-elevators-website-admin-dashboard',
    title: 'Rocket Elevators Website + Admin Dashboard',
    subtitle: 'A public company site paired with a session-protected operations portal.',
    summary:
      'Engineered a public company site and admin dashboard with agent CRUD, validated transaction entry, Express REST APIs, and MongoDB Atlas persistence.',
    featured: true,
    status: 'published',
    year: 2026,
    role: ['Full Stack Developer'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Chart.js'],
    categories: ['Full Stack', 'Dashboard', 'Data Visualization'],
    coverImage: null,
    links: {},
    overview:
      'This project combines a customer-facing company website with a protected administrative experience for managing agents and recording elevator transactions.',
    challenge:
      'The application needed reliable CRUD workflows, validated transaction data, secure session boundaries, and useful operational reporting from the same data source.',
    solution:
      'React handles the responsive interfaces, Express exposes REST resources, Mongoose models MongoDB Atlas data, and Chart.js turns transactions into agent totals, 14-day trends, regional performance, and business-share reports.',
    outcome:
      'The result is a complete public and back-office system that connects validated operational input with decision-ready analytics.',
    process: [
      'Separate public browsing from authenticated administrative workflows.',
      'Validate transaction entry at the API boundary before persistence.',
      'Shape stored transactions into focused reports for operational review.',
    ],
    lessons: [],
  },
  {
    id: 'rocket-food-delivery-backoffice',
    slug: 'rocket-food-delivery-backoffice',
    title: 'Rocket Food Delivery Backoffice',
    subtitle: 'A layered Spring Boot API for a broad food-delivery domain.',
    summary:
      'Implemented controllers, services, repositories, and MySQL persistence with JWT protection, DTOs, Jakarta validation, structured errors, and tested API boundaries.',
    featured: true,
    status: 'published',
    year: 2026,
    role: ['Full Stack Developer'],
    technologies: ['Java 21', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'MySQL', 'JWT', 'Thymeleaf', 'MockMvc'],
    categories: ['Backend', 'API', 'Testing'],
    coverImage: null,
    links: {},
    overview:
      'The backoffice provides a structured Spring Boot foundation for food-delivery operations, from HTTP controllers through service and repository layers to MySQL.',
    challenge:
      'The API needed clear boundaries around authentication, validation, response formats, persistence, and error handling across a wide domain model.',
    solution:
      'JWT protection, DTO models, Jakarta validation, shared success envelopes, structured JSON errors, and native SQL queries make the API contract explicit and maintainable.',
    outcome:
      'JUnit 5 and MockMvc tests verify responses, status codes, validation paths, and error handling, with the API documented for Postman-based testing.',
    process: [
      'Keep controllers, services, repositories, and persistence responsibilities distinct.',
      'Use shared response and error shapes to make client integration predictable.',
      'Test both successful requests and validation or authorization failures.',
    ],
    lessons: [],
  },
  {
    id: 'rocket-food-delivery-app',
    slug: 'rocket-food-delivery-app',
    title: 'Rocket Food Delivery App',
    subtitle: 'Role-aware customer and courier mobile experiences.',
    summary:
      'Built a React Native and Expo app with persisted JWT sessions, protected nested navigation, restaurant and order workflows, and resilient loading and error states.',
    featured: true,
    status: 'published',
    year: 2026,
    role: ['Full Stack Developer'],
    technologies: ['React Native', 'Expo Router', 'Java', 'Spring Boot', 'MySQL', 'JWT', 'AsyncStorage', 'Jest'],
    categories: ['Mobile', 'Full Stack', 'Testing'],
    coverImage: null,
    links: {},
    overview:
      'The mobile app supports distinct customer and courier workflows backed by the Rocket food-delivery API.',
    challenge:
      'The client needed to preserve sessions, protect nested role-specific routes, and make asynchronous ordering and delivery state understandable on a phone.',
    solution:
      'Expo Router, React Context, AsyncStorage, and persisted JWT sessions provide navigation and identity foundations. API integration covers restaurant filtering, menu totals, order history, courier status progression, and account updates.',
    outcome:
      'Loading, empty, error, retry, and session-expiry states were designed explicitly and verified with Jest, Postman, simulator/device QA, and an ngrok phone-testing workflow.',
    process: [
      'Model customer and courier flows as separate protected navigation paths.',
      'Make every network-dependent screen account for loading, empty, error, and retry states.',
      'Test the same API flow across automated, simulator, device, and phone-network environments.',
    ],
    lessons: [],
  },
  {
    id: 'codebloggs',
    slug: 'codebloggs',
    title: 'CodeBloggs',
    subtitle: 'A social blogging SPA for developer communities.',
    summary:
      'Co-developed a responsive React SPA for authenticated posts, comments, replies, likes, profile images, themes, and online presence.',
    featured: true,
    status: 'published',
    year: 2026,
    role: ['Full Stack Developer'],
    technologies: ['React', 'Redux/Thunk', 'Node.js', 'Express', 'MongoDB/Mongoose', 'Session Auth', 'Multer'],
    categories: ['Full Stack', 'Social', 'Authentication'],
    coverImage: null,
    links: {},
    overview:
      'CodeBloggs is a responsive developer-focused SPA where users can register, authenticate, publish, discuss, and personalize their experience.',
    challenge:
      'The product combined nested social interactions, authentication, media uploads, theme preferences, and live presence without losing consistency across client and server state.',
    solution:
      'Redux/Thunk manages client state while Express REST resources, Mongoose models, cookie-session guards, bcrypt authentication, validation, and Multer uploads support the server side.',
    outcome:
      'The application includes nested replies, profiles, themes, heartbeat presence, and a team Git branch and pull-request workflow.',
    process: [
      'Keep reusable UI components aligned with explicit Redux state transitions.',
      'Treat nested replies, uploads, and session guards as separate API concerns.',
      'Use a shared branch and pull-request workflow to coordinate feature work.',
    ],
    videos: [
      {
        id: 'codebloggs-demo-one',
        title: 'CodeBloggs demo: community and content flows',
        embedUrl: 'https://www.youtube-nocookie.com/embed/JbjfAwnXPwU?rel=0&modestbranding=1&mute=1',
      },
      {
        id: 'codebloggs-demo-two',
        title: 'CodeBloggs demo: profiles and presence',
        embedUrl: 'https://www.youtube-nocookie.com/embed/XHaAaW2Twu0?rel=0&modestbranding=1&mute=1',
      },
    ],
    lessons: [],
  },
]
