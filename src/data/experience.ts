// Work experiences from your CV
const workExperiences = [
    {
        id: 1,
        type: 'work',
        role: 'Software Developer',
        company: 'Blue Silo',
        location: 'Singapore (Remote)',
        duration: 'Jun 2025 - Feb 2026',
        description: 'Architected scalable IoT pipelines and SaaS infrastructure for smart restroom monitoring and real-time telemetry systems handling 500K–1M+ records.',
        responsibilities: [
            'Smart Restroom Dual-Database & Analytics: Designed a resilient architecture routing raw IoT payloads to MongoDB (write-optimized) and structured sensor data to PostgreSQL (via Prisma). Slashed Power BI dashboard refresh times from 15 minutes to under 1 minute for massive datasets (500,000–1,000,000+ records) by engineering flattened, pre-aggregated SQL Views.',
            'Axora Event-Driven IoT Pipeline: Architected a real-time telemetry pipeline connecting devices to a Node.js/Nest.js backend via MQTT. Bridged event streams using RabbitMQ to a Socket.io gateway, ensuring isolated, multi-tenant WebSocket connections.',
            'Frontend Performance Optimization: Optimized real-time UI rendering in the React frontend (Axora) by implementing a 1000ms debouncing strategy combined with React Query caching, preventing browser bottlenecks during high-frequency sensor data streams.',
            'Data Lifecycle & Cloud Infrastructure: Containerized multiple backend services and frontend apps using Docker, managed via automated Bitbucket Pipelines. Implemented MongoDB TTL indexes for automated archiving of 30-to-365-day device telemetry logs.',
            'SaaS Security & Billing Integration: Integrated Stripe for subscription management, securing webhooks with strict signature verification. Enforced global API payload validation using Zod and secured multi-tenant data access with strict isolation guards.'
        ]
    },
    {
        id: 2,
        type: 'work',
        role: 'Full Stack & Mobile Developer',
        company: 'PT. Porlone Digital Agency',
        location: 'Sidoarjo, Indonesia',
        duration: 'Mar 2025 - Dec 2025',
        description: 'Architected and developed a comprehensive multi-tenant SaaS platform comprising 4 distinct React Native / Expo applications (POS, Owner, Employee, Client).',
        responsibilities: [
            'Multi-App SaaS Architecture: Architected and developed a comprehensive multi-tenant SaaS platform comprising 4 distinct React Native / Expo applications (POS, Owner, Employee, Client). Implemented branch-level data isolation and server-driven Role-Based Access Control (RBAC).',
            'Advanced State & Cache Management: Engineered a highly reliable point-of-sale system using domain-split Zustand stores for complex cart and queue operations. Integrated React Query for pessimistic data synchronization, utilizing cascading cache invalidations to guarantee financial data accuracy post-transaction.',
            'BLE Hardware Integration: Integrated external hardware via Bluetooth Low Energy (BLE) using react-native-ble-plx and custom native modules. Enabled automated thermal printing for transaction receipts, queue tickets, and end-of-shift Z-reports with background auto-reconnect capabilities.',
            'Local Database & Performance: Optimized high-frequency product grid rendering using FlashList for predictive layouts. Architected a local storage layer utilizing SQLite and Drizzle ORM to manage structured data, laying the groundwork for offline-first transaction queues.',
            'Mobile CI/CD Pipeline: Established a streamlined mobile deployment pipeline via Expo Application Services (EAS). Configured 3 isolated build environments (Development, Preview, Production) with distinct package names to enable simultaneous multi-environment testing on single devices.'
        ]
    },
    {
        id: 3,
        type: 'work',
        role: 'Frontend Developer - Contract',
        company: 'PT. Setara Komunika Futura',
        location: 'Tangerang, Indonesia',
        duration: 'Feb 2025 - Apr 2025',
        description: 'Developed the frontend of Sekufu.id, a Muslim matchmaking (taaruf) platform that emphasizes identity-based compatibility and modest interaction flow.',
        responsibilities: [
            'Profile-Based Matching: Users matched through attributes like occupation, ethnicity, physical details, city, and birth date.',
            'Event Module: Built pages for upcoming taaruf events with registration functionality.',
            'Swipe-Based Interaction: Implemented a swipe card UI for liking/disliking based on profile (no photos shown); separate photo-like system to preserve modesty.',
            'Match System: Designed separate match pages for profile-only and profile + photo matches.',
            'Chat System: Built a structured chat interface with tabs for asking and answering; users select context-driven questions and rate responses from potential matches.',
            'Face Verification on Registration: Integrated gesture-based webcam detection to verify that the uploaded profile photo matches the user.'
        ]
    },
    {
        id: 4,
        type: 'work',
        role: 'Frontend Engineer',
        company: 'Eftranet',
        location: 'Jombang, East Java, Indonesia',
        duration: 'Jul 2024 - Jan 2025',
        description: 'Built a comprehensive web application for one of Indonesia\'s top 10 universities, designed to strengthen alumni engagement and institutional development.',
        responsibilities: [
            'Developed Frontend Platform for Institut Teknologi Bandung (ITB) Alumni',
            'Alumni profile management with CV creation and personal data updates.',
            'Interactive discussion forums and event/news feeds to foster community engagement.',
            'Networking tools enabling professional collaboration among graduates.'
        ]
    },
    {
        id: 5,
        type: 'work',
        role: 'Frontend Engineer',
        company: 'ADS Digital Partner (PT. Adma Digital Solusi)',
        location: 'Surabaya, Indonesia',
        duration: 'Jan 2024 - Jun 2024',
        description: 'Developed a frontend application to monitor social media and news coverage related to Polda Jatim, aggregating crawled data from Facebook, Instagram, and major Indonesian news portals.',
        responsibilities: [
            'Integrated with APIs that crawl headlines, captions, and article content mentioning Polda Jatim.',
            'Designed an interactive dashboard for streamlined analysis of over 1,000+ posts and articles.',
            'Implemented SWC-based caching strategy using hashtags and account mentions as keys to optimize performance.',
            'Reduced frontend data fetching time from ~600–800ms to ~100–150ms.',
            'Cut total API calls to the backend by up to 50%, improving overall app responsiveness and scalability.'
        ]
    },
    {
        id: 6,
        type: 'education',
        role: 'Cloud Computing Learning Path',
        company: 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka',
        location: 'Indonesia',
        duration: 'Aug 2023 - Dec 2023',
        description: 'Completed the Cloud Computing learning path with a focus on Google Cloud Platform (GCP), backend development, and system administration.',
        responsibilities: [
            'Built scalable cloud-based APIs',
            'Deployed containerized apps using Google Compute Engine, Cloud Storage',
            'Integrated ML models',
            'Delivered a Capstone Project involving full API development, database design, cloud deployment, and model integration',
            'Collaborated in a multidisciplinary team'
        ]
    },
    {
        id: 7,
        type: 'work',
        role: 'Freelance - Self Employed',
        company: 'Bantuin Tech Solutions',
        location: 'Jombang, Indonesia',
        duration: 'Aug 2021 - Dec 2023',
        description: 'Creating creative and innovative solutions for digital needs.',
        responsibilities: [
            'Creating Website, Web-App, API and other tech solution based from the client needs',
            'Company Profile, Competition Registration, Try-Out Web App, etc.',
            'Teamwork development (GIT, Github)'
        ]
    },
    {
        id: 8,
        type: 'work',
        role: 'Mini Project Intern Front End Developer',
        company: 'PT. Sinergi Merah Putih',
        location: 'Jakarta, Indonesia (Remote)',
        duration: 'Jun 2023 - Nov 2023',
        description: 'Digital collaboration program between Higher Education and Industry that aims to create competent human resources.',
        responsibilities: [
            'Developing an HR System on the Front End with React.js that is integrated with the Back End API',
            'Using various library like axios, react-table, tailwindcss, chart.js',
            'Working in teams and familarize with project management tools like Trello and Github'
        ]
    },
    {
        id: 9,
        type: 'work',
        role: 'Web Developer',
        company: 'Agroteknologi UPN Veteran Jawa Timur',
        location: 'Surabaya, Indonesia',
        duration: 'Jun 2023 - Sep 2023',
        description: 'An S1 & S2 program in UPN "Veteran" Jawa Timur under Faculty of Agriculture',
        responsibilities: [
            'Modernizing the website UI for S1 Agroteknologi and S2 Agroteknologi UPN "Veteran" Jawa Timur',
            'Adding lecturer list and detailed profile, showing statistics in the homepage'
        ]
    }
];

// Education and organizational experiences
const educationAndOrg = [
    {
        id: 10,
        type: 'education',
        role: 'Bachelor of Informatics, 3.93/4.00',
        company: 'Universitas Pembangunan Nasional Veteran Jawa Timur',
        location: 'Surabaya, Indonesia',
        duration: 'Jun 2021 - Dec 2025',
        description: '',
        responsibilities: []
    },
    {
        id: 11,
        type: 'organization',
        role: 'Website Lead',
        company: 'FASILKOM SAVE',
        location: 'Pasuruan, Indonesia',
        duration: 'Aug 2023 - Nov 2023',
        description: '',
        responsibilities: [
            'Created a website for a Kayukebek Village Profile, located in Tutur, Pasuruan, East Java, Indonesia',
            'Exposing local UMKM and favorite tourist destination'
        ]
    },
    {
        id: 12,
        type: 'organization',
        role: 'Lead of Education Division',
        company: 'ILC (Informatics Learning Community)',
        location: 'Surabaya, Indonesia',
        duration: 'Jul 2023 - Present',
        description: 'Contributed significantly to the educational division at ILC, assisting fellow students in navigating the realm of web development.',
        responsibilities: []
    },
    {
        id: 13,
        type: 'organization',
        role: 'Head of Web Division',
        company: 'PEMIRA',
        location: 'Surabaya, Indonesia',
        duration: 'Jan 2023 - Feb 2023',
        description: 'Election for association of department organizations within the scope of the Computer Science Faculty UPN Veteran Jawa Timur',
        responsibilities: [
            'Handle 1000+ client request at a slight time, with IP blocking when user request too many at a time',
            'Create a website for the election of organizational leaders'
        ]
    },
    {
        id: 14,
        type: 'organization',
        role: 'Staff of Education Division',
        company: 'ILC (Informatics Learning Community)',
        location: 'Surabaya, Indonesia',
        duration: 'Aug 2022 - Jul 2023',
        description: '',
        responsibilities: [
            'Creating quiz and material for IG Feeds',
            'Helping developing ILC project from external vendor'
        ]
    }
];

export { workExperiences, educationAndOrg };