window.PORTFOLIO = {
  "updated": "6 November 2026",
  "profile": {
    "name": "Artem Serdiuk",
    "title": "Backend & Full-Stack Engineer",
    "email": "artom.serdyuk.600@gmail.com",
    "github": "https://github.com/MeguMax",
    "linkedin": "https://www.linkedin.com/in/artem-serdiuk-4a3a15334/",
    "upwork": "https://www.upwork.com/freelancers/~014b478981bfacdaf1",
    "portfolio": "https://github.com/MeguMax/MeguMax",
    "location": "Ukraine",
    "education": "Software Engineering, Kherson National Technical University · expected graduation 2027",
    "availability": "Remote from Ukraine; open to discussing relocation within Europe."
  },
  "featured": [
    {
      "id": "upwork",
      "title": "Upwork workflow platform",
      "eyebrow": "AI-assisted operations",
      "summary": "I built an internal workspace that brings job discovery, qualification, reusable project evidence, AI-assisted preparation and human review into one workflow. The difficult part was keeping the right account, source facts and reviewed draft together while external calls, background jobs and operator edits happened at different times.",
      "problem": "The initial requirement was an OAuth/MCP bridge for an existing automation workflow. The application expanded into a dedicated business tool with persistent workflow state, versioned rules, source-bound preparation and an operator workspace.",
      "role": "Independent developer — backend, operator UI, integrations, testing and release tooling",
      "stack": [
        "JavaScript ES modules",
        "Node.js 20+",
        "Express5",
        "PostgreSQL/pg",
        "Model Context Protocol SDK",
        "OAuth2.1/PKCE",
        "OpenAI Responses API",
        "Zod/JSON Schema",
        "HTML/CSS and vanilla JavaScript",
        "Docker"
      ],
      "decisions": [
        {
          "title": "Bind authentication to the correct connection",
          "text": "Implemented OAuth discovery and PKCE, encrypted per-connection token storage, account-to-connection routing and single-flight refresh. Concurrent requests share the same refresh operation instead of racing a rotating refresh token."
        },
        {
          "title": "Treat persistence uncertainty as a state, not a retry instruction",
          "text": "Used transactional PostgreSQL updates, a locked metadata row and revision-aware snapshots. If a COMMIT response becomes ambiguous, the store stops and requires reconciliation instead of silently falling back to old JSON or replaying a write."
        },
        {
          "title": "Make long-running preparation reproducible",
          "text": "Added a durable run ledger with pinned input and policy hashes, version checks, ownership and ordered stages. Interrupted runs remain visible. A draft can be traced back to the specific job facts, profile, rule version and portfolio evidence used to create it."
        },
        {
          "title": "Validate AI output against server-owned evidence",
          "text": "The model selects permitted evidence identifiers. The server resolves the original quotes and applies domain rules after schema validation. Unsupported experience, missing sources and unknown commitments remain blocked or explicitly unknown; human corrections are stored separately from original model output."
        },
        {
          "title": "Preserve richer records during partial refreshes",
          "text": "Separated complete job details from lower-confidence search observations. Equivalent money formats, reordered lists and contained description snippets do not replace authoritative fields. Meaningful contradictions flag a refresh while preserving the original draft and history."
        },
        {
          "title": "Separate preparation, approval and remote delivery",
          "text": "Built immutable application packages, account-scoped previews, duplicate-send locks and delivery states that distinguish acknowledgement, verified delivery and unknown outcomes. The UI preserves unsaved manual text and rejects stale asynchronous responses."
        }
      ],
      "cover": "assets/portfolio/upwork-cover.png",
      "architecture": "assets/portfolio/upwork-architecture.svg",
      "screenshots": [
        {
          "src": "assets/portfolio/upwork-renderer-demo.png",
          "caption": "Actual component renderer and styling, populated with synthetic portfolio data. Isolated demonstration; no live account, AI request or application submission."
        }
      ],
      "validation": [
        {
          "title": "5,388 passing tests",
          "text": "Saved regression run dated 6 November 2026. A separate, overlapping Linux run passed 1,987 tests with outbound networking disabled; the counts are not added."
        },
        {
          "title": "A bounded performance experiment",
          "text": "For one saved record, payload size changed from 545,987 to 71,343 bytes. Median read time changed from 2,300.4 to 1,325.7 ms across three GET requests before and after. This is a single-record comparison, not a production-wide benchmark."
        }
      ],
      "boundary": "The platform prepares and reviews work with guarded provider operations. A prepared package, acknowledged request and independently verified remote result remain separate states. Shared operator authentication and process-local coordination are current architectural constraints.",
      "source": {
        "href": "https://github.com/MeguMax/MeguMax/blob/main/case-studies/integration-platform.md",
        "label": "Read the engineering case"
      },
      "sourceNote": "Application source is private. This public case describes a sanitized architecture.",
      "md": "integration-platform.md"
    },
    {
      "id": "mifile",
      "title": "Legal document workflow",
      "eyebrow": "Documents & Microsoft 365",
      "summary": "I built a document operations platform that turns incoming emails and PDFs into isolated case drafts. It preserves reviewers' corrections, pins documents to reviewed versions and verifies external saved bundles before reporting preparation complete.",
      "problem": "Legal intake was not a single PDF-to-form task. One email could contain several cases, scanned and fillable documents, incomplete fields and ambiguous attachments. Background extraction, human corrections and slow external systems had to coexist without mixing cases, discarding edits or repeating uncertain writes.",
      "role": "Sole full-stack engineer — application design, backend, admin interface, document pipeline, Microsoft integrations, browser preparation and Excel add-in.",
      "stack": [
        "TypeScript",
        "Node.js",
        "SQLite WAL",
        "Microsoft Graph",
        "Azure Identity",
        "OneDrive",
        "Playwright",
        "PDF.js",
        "Tesseract OCR",
        "Office.js",
        "Python",
        "pypdf",
        "reportlab",
        "Docker",
        "HTML/CSS/JavaScript"
      ],
      "decisions": [
        {
          "title": "Treat each case as an independent unit",
          "text": "Several packages from one email retain separate source documents, review state, form choices, audit trails and job payloads. Ambiguous attachments stay visible in a review group. A failed attachment in one case does not block an otherwise complete sibling case."
        },
        {
          "title": "Merge extraction around human corrections",
          "text": "Field-level protection preserves manually edited and intentionally blank values. Before an asynchronous result is applied, the worker rechecks source identity, replacement version and draft state. A late result cannot reopen or overwrite a changed package."
        },
        {
          "title": "Pin the documents that were actually reviewed",
          "text": "Immutable SHA-256-addressed form files and source-content fingerprints connect a draft, its selected form version and the job snapshot. Replacing or changing a PDF invalidates earlier extraction/preparation assumptions."
        },
        {
          "title": "Reconcile uncertain external writes",
          "text": "The worker persists checkpoints, verifies filing-type mappings and reopens the saved bundle to compare it with the source snapshot. If saving may have happened but cannot be confirmed, the workflow requires reconciliation rather than automatically creating another bundle. Graph read retries are bounded and explicitly separate from uncertain writes."
        },
        {
          "title": "Generate PDFs from live Excel state",
          "text": "The Office.js task pane waits for calculation completion, reads selected rows and rechecks row/sheet identity after asynchronous work. A Python worker generates fillable PDFs and validates field values, widget appearances and text fit. Selection changes invalidate old output."
        },
        {
          "title": "Keep email delivery independent and observable",
          "text": "A persistent notification outbox is tied to a verified prepared bundle. Duplicate or stale notifications are rejected; interrupted delivery becomes uncertain so the operator can check before resending. Workflow state, retry history and audits persist in SQLite WAL."
        }
      ],
      "cover": "assets/portfolio/mifile-cover.png",
      "architecture": "assets/portfolio/mifile-architecture.svg",
      "screenshots": [
        {
          "src": "assets/portfolio/mifile-review-demo.png",
          "caption": "Actual application UI with synthetic QA data: document preview and guided package corrections."
        },
        {
          "src": "assets/portfolio/mifile-fields-demo.png",
          "caption": "Actual application UI with synthetic QA data: extracted fields retain visible source labels and manual review controls."
        },
        {
          "src": "assets/portfolio/mifile-progress-demo.png",
          "caption": "Actual application UI with synthetic QA data: background preparation checkpoints and document verification progress. This is not a real court submission."
        },
        {
          "src": "assets/portfolio/mifile-recognition-recovery-demo.png",
          "caption": "Actual application UI with synthetic QA data: bounded document-recognition retries stop with an actionable review state."
        },
        {
          "src": "assets/portfolio/mifile-editable-pdf-demo.png",
          "caption": "Generated editable-PDF example rendered for inspection. All populated parties and contact details are fictional QA data; do not file."
        }
      ],
      "validation": [
        {
          "title": "87 source PDFs",
          "text": "A saved offline multi-case acceptance report dated 6 November 2026 exercised 87 PDFs and recorded unchanged original source files. This is acceptance scope, not production throughput."
        },
        {
          "title": "Editable PDFs from desktop Excel",
          "text": "A saved Windows Excel acceptance record dated 29 October 2026 verified four generated PDFs, 126 compared field values and five rendered pages using fictional QA cases."
        }
      ],
      "boundary": "The evidenced external workflow prepares and verifies Unsubmitted bundles. Completed payments and final court submissions are not claimed. Screenshots show the real application with synthetic QA data.",
      "source": {
        "href": "https://github.com/MeguMax/Adam-automatization",
        "label": "View the public source snapshot"
      },
      "sourceNote": "The public repository is a source snapshot. The current case also describes newer local implementation.",
      "md": "legal-workflow.md"
    },
    {
      "id": "patientnow",
      "title": "PatientNow ↔ GoHighLevel",
      "eyebrow": "Event-driven integrations",
      "summary": "I built a TypeScript integration backend that keeps contacts, appointments, provider calendars and blocked time aligned across PatientNow and GoHighLevel. It also maps PatientNow orders and refunds into CRM opportunities. The engineering focus is predictable behaviour when events are duplicated, delayed, missing or interrupted by an external API failure.",
      "problem": "Both platforms can change the same logical record, but they use different identifiers and expose different event and API semantics. A successful HTTP request is not enough: duplicate events can create duplicate records, a late update can undo a newer edit, and a missed reschedule can leave calendars inconsistent.",
      "role": "Backend services, event normalization, identity resolution, synchronization rules, reconciliation, regression tests and deployment definitions. I also prepared an English operations and setup guide for handoff.",
      "stack": [
        "TypeScript",
        "Node.js",
        "Fastify",
        "Axios",
        "Zod",
        "AWS SQS FIFO",
        "DynamoDB",
        "EFS",
        "ECS/Fargate deployment definitions",
        "Terraform",
        "Docker"
      ],
      "decisions": [
        {
          "title": "Order events before resolving identity",
          "text": "The two providers assign different record IDs. The queue therefore orders a tenant/entity-type stream instead of assuming that either provider ID is already a shared identity. The worker stops later messages in a failed group from overtaking the failure."
        },
        {
          "title": "Give processing a durable owner",
          "text": "DynamoDB conditional writes acquire a processing lease and distinguish processed duplicates from work already in progress. Failed or expired work can be retried. SQS visibility is renewed during long operations, and a message is removed only after successful processing."
        },
        {
          "title": "Refuse uncertain identity matches",
          "text": "Contact resolution checks persisted links, managed custom IDs and provider lookups. Ambiguous or conflicting matches fail visibly rather than choosing the first candidate. Pending-create state supports recovery when a provider may have created a record but its response did not contain an ID."
        },
        {
          "title": "Treat time and cancellation as domain state",
          "text": "Appointment handling includes authoritative rereads, timezone normalization, echo suppression and cancellation tombstones. Moving an appointment uses create, verify and delete with a rollback path because the source API does not expose the needed update operation."
        },
        {
          "title": "Recover from missing events",
          "text": "Paginated reconciliation compares linked records and checkpoints instead of assuming every webhook arrives. Provider-calendar and blocked-time reconciliation handles changes not represented by the selected webhook systems. Concurrent edits to a blocked-time record are surfaced as conflicts."
        },
        {
          "title": "Represent sales without duplicating revenue",
          "text": "A PatientNow order maps to a CRM opportunity through a persisted order-ID link. Voids and full or partial refunds update the associated representation. Purchases flow from PatientNow to GHL; this is not a bidirectional payment-processing system."
        }
      ],
      "cover": "assets/portfolio/patientnow-cover.png",
      "architecture": "assets/portfolio/patientnow-architecture.svg",
      "screenshots": [],
      "validation": [
        {
          "title": "74 offline tests",
          "text": "An isolated verification run dated 29 October 2026 passed 74 tests across 18 files with outbound networking blocked. This is historical regression evidence, not a fresh live end-to-end run."
        },
        {
          "title": "24-page operations guide",
          "text": "Prepared an English deployment and handoff guide covering setup, configuration and operations."
        }
      ],
      "boundary": "The current design deliberately uses one writer worker over EFS identity/history state. API replicas scale separately. A complete live cross-platform run, HIPAA certification, uptime and business-volume metrics are not claimed.",
      "source": {
        "href": "https://github.com/MeguMax/PN---GHL",
        "label": "View the earlier public implementation"
      },
      "sourceNote": "Current local implementation is broader than the earlier public source snapshot.",
      "md": "patientnow-ghl.md"
    }
  ],
  "additional": [
    {
      "id": "leafsplit",
      "title": "LeafSplit — AI model development",
      "role": "Backend Lead · October 2026–Present",
      "summary": "I work with the LeafSplit team on AI model development, training experiments and evaluation. My work includes experimental tooling, automated checks and comparisons with baseline models, with an emphasis on reproducible results.",
      "stack": [
        "Python",
        "NumPy",
        "PyTorch experiments"
      ],
      "category": "Research",
      "link": null,
      "scope": "Team contribution. Public workflow only; private model architecture and benchmark results are not disclosed."
    },
    {
      "id": "candidate-dashboard",
      "title": "Candidate Management Dashboard",
      "role": "Full-stack implementation · Technical take-home",
      "summary": "A recruitment dashboard with candidate cards, status changes, filters and a shared skill catalog. I used validated Express endpoints and Prisma transactions for related records, with optimistic React updates and rollback when requests fail.",
      "stack": [
        "React",
        "TypeScript",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Vite",
        "Tailwind CSS"
      ],
      "category": "Assessment",
      "link": "https://github.com/MeguMax/test-task-for-JotSolutions",
      "scope": "Technical take-home, not a commercial production system."
    },
    {
      "id": "wishlist",
      "title": "Shared wishlists and realtime groups",
      "role": "Independent application development",
      "summary": "A React/TypeScript application for shared wishlists, gift reservations, group contributions and realtime chat. It combines authenticated flows, relational data, image storage and realtime subscriptions through Supabase.",
      "stack": [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL"
      ],
      "category": "Application",
      "link": "https://github.com/MeguMax/wishlist-app",
      "scope": "Contribution tracking, not payment processing."
    },
    {
      "id": "ghl-intake-routing",
      "title": "Shared lead intake and agent routing",
      "role": "CRM workflow implementation and troubleshooting",
      "summary": "I worked on a shared GoHighLevel intake flow used by several forms and landing pages. The work covered field mappings, assigned-agent routing and notifications that retain complete application details, including updates to existing contacts.",
      "stack": [
        "GoHighLevel",
        "Forms",
        "CRM workflows",
        "Notification templates"
      ],
      "category": "Client work",
      "link": null,
      "scope": "Anonymized client workflow across multiple form variants."
    },
    {
      "id": "shopify-funnel-integration",
      "title": "Shopify storefront and funnel compatibility",
      "role": "Frontend and ecommerce integration work",
      "summary": "I worked on product and variant behaviour across a Shopify storefront and funnel links, checking that focused changes preserve the cart, subscriptions and the purchase path expected by the existing integration.",
      "stack": [
        "Shopify",
        "JavaScript",
        "GoHighLevel",
        "Frontend debugging"
      ],
      "category": "Client work",
      "link": null,
      "scope": "Compatibility work across an existing storefront and funnel."
    },
    {
      "id": "crm-kp",
      "title": "CRM-KP sales workspace",
      "role": "Independent React and backend development",
      "summary": "A sales-workflow application with client forms, a dashboard and Kanban-style pipeline. The source includes React/TypeScript state management, Express controllers, MongoDB models and Slack/email service modules.",
      "stack": [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Material UI",
        "Express",
        "MongoDB",
        "Mongoose"
      ],
      "category": "Application",
      "link": "https://github.com/MeguMax/CRM-KP",
      "scope": "Development snapshot; authentication integration requires further alignment."
    },
    {
      "id": "notion-ghl-make",
      "title": "Notion → GoHighLevel workflow automation",
      "role": "Platform integration work",
      "summary": "A published Upwork portfolio example of connecting Notion and GoHighLevel through Make. It adds evidence of low-code automation alongside custom backend engineering.",
      "stack": [
        "Notion",
        "GoHighLevel",
        "Make"
      ],
      "category": "Client work",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2110337539072770048",
      "scope": "Platform automation through Make."
    },
    {
      "id": "hostshield",
      "title": "HostShield frontend",
      "role": "Earlier paid React/Next.js frontend work · Product closed",
      "summary": "Historical frontend work for a waiver-management product, including role-specific dashboards, document and review flows, account screens and a marketing website. The repository remains a code example after the product closed.",
      "stack": [
        "React",
        "Next.js Pages Router",
        "Redux",
        "Tailwind CSS",
        "SCSS",
        "JavaScript"
      ],
      "category": "Client work",
      "link": "https://github.com/MeguMax/hosthield-develop",
      "scope": "Historical frontend code; the original product is closed."
    },
    {
      "id": "payment-triggered-course-onboarding",
      "title": "Payment-triggered onboarding and course access",
      "role": "Funnel and automation implementation",
      "summary": "A one-page course-sales funnel connecting Stripe checkout to GoHighLevel CRM updates, tags and access-email workflows through Zapier and webhooks. The published portfolio describes responsive forms and follow-up email/SMS sequences; course content and client details remain private.",
      "stack": [
        "GoHighLevel",
        "Stripe",
        "Zapier",
        "Webhooks",
        "JavaScript",
        "HTML",
        "CSS"
      ],
      "category": "Client work",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1990431490445197312",
      "scope": "Published client portfolio example."
    },
    {
      "id": "ghl-white-label-saas-customization",
      "title": "White-label CRM interface customization",
      "role": "GoHighLevel interface and workflow customization",
      "summary": "Customized a white-label GoHighLevel workspace using JavaScript, reusable CSS and responsive interface patterns. The published case covers navigation, dashboards, smart lists, pipelines and role-aware visibility across sub-accounts, with reusable branding and interaction states.",
      "stack": [
        "GoHighLevel",
        "JavaScript",
        "HTML",
        "CSS",
        "DOM integration",
        "Naive UI",
        "Tabulator"
      ],
      "category": "Client work",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2054642433408012288",
      "scope": "Published client portfolio example."
    },
    {
      "id": "interactive-mortgage-intake",
      "title": "Interactive mortgage intake",
      "role": "Interactive frontend and CRM intake design",
      "summary": "An interactive mortgage enquiry flow that captures service intent, property details, indicative financing needs and timing before collecting contact information and consent. The published case describes a Vue.js single-page interface on AdsQuiz with GoHighLevel integration-ready lead delivery and segmentation workflows.",
      "stack": [
        "Vue.js",
        "JavaScript",
        "HTML",
        "CSS",
        "AdsQuiz",
        "GoHighLevel",
        "API integration"
      ],
      "category": "Client work",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2105280224797556736",
      "scope": "Published client portfolio example."
    }
  ],
  "visualNote": "Cover images are conceptual illustrations. Architecture diagrams describe implementation. Application screenshots and demonstrations are individually labelled."
};
