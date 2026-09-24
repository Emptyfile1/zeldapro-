export const servicesData = {
  'web-dev': {
    id: 'web-dev',
    category: 'Enterprise Engineering',
    title: 'Web Development',
    subtitle: 'Enterprise Web Development | Scalable Web Architecture',
    description:
      'We architect high-performance, fault-tolerant web applications engineered for global scale, zero-downtime deployments, and sub-100ms server response times.',
    stack: ['React 19', 'Next.js 15', 'JavaScript', 'Node.js', 'PostgreSQL', 'Redis', 'Cloudflare Workers', 'GraphQL', 'Docker'],
    capabilities: [
      {
        title: 'Custom Full-Stack Development',
        desc: 'End-to-end cloud applications using modern React Server Components, high-throughput microservices, and edge-native routing.',
      },
      {
        title: 'High-Performance Landing Pages & Corporate Sites',
        desc: 'Lighthouse 100/100 scored responsive web architectures with optimized asset delivery and zero layout shift.',
      },
      {
        title: 'E-Commerce & CMS Platform Integration',
        desc: 'Headless Shopify, Medusa, and custom transactional engines with multi-currency payment orchestration.',
      },
      {
        title: 'Secure Backend API Architecture',
        desc: 'Zero-trust API gateways, distributed rate limiting, and automated OAuth2 / JWT authentication pipelines.',
      },
    ],
    metrics: [
      { value: '99.99%', label: 'Uptime SLA Guarantee' },
      { value: '< 65ms', label: 'Average Edge TTFB' },
      { value: '100/100', label: 'Core Web Vitals' },
    ],
    caseStudy: {
      client: 'Apex Global Logistics',
      outcome: '+310% Concurrent Throughput with 45% Lower Server Costs',
      quote:
        'Eldor rebuilt our fleet dispatch platform from legacy monolith into modern edge-first web infrastructure without a single minute of downtime.',
      author: 'Marcus Vance',
      role: 'VP of Engineering, Apex Logistics',
    },
  },
  'app-dev': {
    id: 'app-dev',
    category: 'Mobile Ecosystems',
    title: 'App Development',
    subtitle: 'Native Mobile Engineering | Cross-Platform Solutions',
    description:
      'We craft silky 120 FPS native and cross-platform mobile experiences that users love, backed by offline-first database synchronization and robust biometric security.',
    stack: ['SwiftUI', 'Kotlin Jetpack Compose', 'React Native', 'Flutter', 'Realm DB', 'Firebase Cloud Messaging', 'Fastlane', 'gRPC'],
    capabilities: [
      {
        title: 'iOS & Android Native Application Builds',
        desc: 'Platform-native code utilizing hardware accelerometers, Metal shaders, Neural Engine, and background synchronization.',
      },
      {
        title: 'Cross-Platform Solutions (React Native/Flutter)',
        desc: 'Unified codebases saving 40% development cycle time with single-source UI consistency across iOS, Android, and iPadOS.',
      },
      {
        title: 'Interactive UI/UX App Prototyping',
        desc: 'Figma-to-code design system workflows with micro-haptics, gesture handling, and ergonomic one-hand reachability.',
      },
      {
        title: 'Post-Launch Maintenance & Scaling',
        desc: 'Automated CI/CD App Store releases, crash analytics triage, and OS version day-one upgrade support.',
      },
    ],
    metrics: [
      { value: '4.9★', label: 'Average App Store Rating' },
      { value: '120 FPS', label: 'Silky Smooth Rendering' },
      { value: '0.01%', label: 'Crash-Free Session Rate' },
    ],
    caseStudy: {
      client: 'NeuraPay Financial',
      outcome: '2.4M Active Users with Zero Security Incidents',
      quote:
        'The mobile banking app created by Eldor achieved a 4.9 App Store rating in our first month and handled Black Friday traffic flawlessly.',
      author: 'Elena Rostova',
      role: 'Head of Mobile Product, NeuraPay',
    },
  },
  'ai-intelligence': {
    id: 'ai-intelligence',
    category: 'Intelligent Systems',
    title: 'Artificial Intelligence',
    subtitle: 'AI & Machine Learning Solutions | Intelligent Automation',
    description:
      'Transform manual business operations with enterprise-grade autonomous AI agents, retrieval-augmented generation (RAG) vector engines, and custom predictive models.',
    stack: ['PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'Pinecone', 'vLLM', 'FastAPI', 'Hugging Face', 'Kubeflow'],
    capabilities: [
      {
        title: 'Custom AI Workflow Automation',
        desc: 'Autonomous multi-agent swarms that ingest invoices, extract contracts, and synchronize ERP records without human intervention.',
      },
      {
        title: 'Predictive Analytics & Data Modeling',
        desc: 'Time-series forecasting, predictive maintenance classifiers, and customer lifetime value algorithms.',
      },
      {
        title: 'Smart Chatbots & Natural Language Processing (NLP)',
        desc: 'Enterprise domain-grounded conversational assistants with zero hallucinations and strict access control.',
      },
      {
        title: 'Machine Learning Model Integration',
        desc: 'Custom model quantization, private cloud inference hosting, and low-latency API endpoint orchestration.',
      },
    ],
    metrics: [
      { value: '10x', label: 'Process Speed Acceleration' },
      { value: '99.4%', label: 'Extraction Precision' },
      { value: '$1.8M', label: 'Annual Labor Cost Saved' },
    ],
    caseStudy: {
      client: 'Vanguard Biopharma',
      outcome: 'Reduced Clinical Trial Intake Time from 3 Weeks to 4 Hours',
      quote:
        'Eldor delivered an autonomous AI intelligence pipeline that securely parses complex clinical trial documentation with exceptional precision.',
      author: 'Dr. Julian Thorne',
      role: 'Chief Data Scientist, Vanguard Biopharma',
    },
  },
};
