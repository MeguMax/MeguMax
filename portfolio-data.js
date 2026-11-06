window.PORTFOLIO = {
  "updated": "7 November 2026",
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
      "eyebrow": "Proposal preparation",
      "summary": "I built a single workspace for finding relevant opportunities, reusing project evidence and reviewing AI-assisted proposal drafts before delivery.",
      "problem": "Preparing a proposal requires the job details, the right work profile, relevant project examples and a draft that someone has checked. Those details can change while preparation is running. The operator needs to see what was used and keep their corrections when a background task finishes.",
      "benefit": "Operators can find a job, reuse relevant evidence and review a draft in one place. Each draft retains its source references, and manual corrections stay separate from the original AI output. If preparation stops or a remote result is uncertain, the operator can see that state and check before repeating an action.",
      "benefitLabel": "Practical benefit",
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
      "cover": "assets/portfolio/upwork-cover-v2.png",
      "architecture": "assets/portfolio/upwork-architecture.svg",
      "screenshots": [
        {
          "src": "assets/portfolio/upwork-work-profile-full-app-synthetic.png",
          "caption": "Actual full application interface with synthetic data: a work profile and its pinned preparation policies."
        },
        {
          "src": "assets/portfolio/upwork-jobs-list-demo.png",
          "caption": "Actual current Jobs interface with synthetic data: saved job records, preparation state and explicit review steps."
        },
        {
          "src": "assets/portfolio/upwork-jobs-workspace-demo.png",
          "caption": "Actual current operator workspace with synthetic portfolio data: job discovery and preparation state. No live accounts or external actions."
        },
        {
          "src": "assets/portfolio/upwork-portfolio-library-demo.png",
          "caption": "Actual current portfolio library with synthetic cases and evidence boundaries. No live client records."
        },
        {
          "src": "assets/portfolio/upwork-dashboard-demo.png",
          "caption": "Actual current dashboard with synthetic workflow data. Displayed counts are demonstration values."
        },
        {
          "src": "assets/portfolio/upwork-job-workflow-states-synthetic.png",
          "caption": "Actual job-list renderer with synthetic workflow states; draft, review and delivery states remain distinct."
        },
        {
          "src": "assets/portfolio/upwork-chat-exact-recipient-review-synthetic.png",
          "caption": "Actual chat component with synthetic participants and an explicit recipient-review step."
        },
        {
          "src": "assets/portfolio/upwork-renderer-demo.png",
          "caption": "Actual original-result component with synthetic portfolio data, separate from human corrections."
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
      "eyebrow": "Legal document review",
      "summary": "I built a workflow that turns emailed legal documents into case packages reviewers can check and correct, with editable PDFs generated from Excel.",
      "problem": "Legal staff need to prepare the right documents for each case and check the details before a package is ready. One email can include several cases, incomplete fields and attachments that need clarification. When processing continues during review, corrections and source versions need to stay together.",
      "benefit": "Reviewers can inspect extracted fields beside each case's source documents and keep their corrections as processing continues. A failed document can be retried without blocking another case that is ready for preparation. Excel-based PDF generation produces editable documents for review.",
      "benefitLabel": "Practical benefit",
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
      "cover": "assets/portfolio/mifile-cover-v2.png",
      "architecture": "assets/portfolio/mifile-architecture.svg",
      "screenshots": [
        {
          "src": "assets/portfolio/mifile-case-assignment-demo.png",
          "caption": "Actual application UI with synthetic QA data: several independent cases share one intake email while unassigned supporting PDFs remain visible for review."
        },
        {
          "src": "assets/portfolio/mifile-review-demo.png",
          "caption": "Actual application UI with synthetic QA data: document preview and guided package corrections."
        },
        {
          "src": "assets/portfolio/mifile-bulk-document-move-demo.png",
          "caption": "Actual application UI with synthetic QA data: moving selected supporting PDFs to another case preserves original OneDrive files and requires review of both packages."
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
        },
        {
          "src": "assets/portfolio/mifile-court-rule-demo.png",
          "caption": "Actual application UI with synthetic QA data: versioned court rules preserve existing manual document choices."
        },
        {
          "src": "assets/portfolio/mifile-document-retry-demo.png",
          "caption": "Actual application UI with synthetic QA data: a simulated download timeout is visible alongside bounded retry status and actionable corrections."
        },
        {
          "src": "assets/portfolio/mifile-ocr-source-demo.png",
          "caption": "Actual application UI with synthetic QA data: the operator can distinguish OCR-derived source fields and cross-check completion from later preparation or submission state."
        },
        {
          "src": "assets/portfolio/mifile-notification-review-demo.png",
          "caption": "Actual application UI with synthetic QA data: uncertain notification delivery stays separate from the saved preparation package and prompts inbox review before retry."
        },
        {
          "src": "assets/portfolio/mifile-dc508-output-demo.png",
          "caption": "Rendered generated PDF with fictional QA fields. A template-output example, not a real legal record or filing."
        },
        {
          "src": "assets/portfolio/mifile-mc202-output-demo.png",
          "caption": "Rendered generated PDF with fictional QA fields, visibly labelled QA TEST - DO NOT FILE."
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
      "eyebrow": "Contact and appointment sync",
      "summary": "I built a synchronization backend designed to keep contact and appointment records consistent between PatientNow and GoHighLevel, with checks for repeated events and recovery from missed updates.",
      "problem": "Staff working in PatientNow and GoHighLevel need the same contact details and appointments in both places. Different record identifiers, repeated notifications and missed changes make it difficult to know which record to update.",
      "benefit": "The service is designed to reduce entering the same contact or appointment twice. It checks whether a change has already been handled and periodically compares records to catch missed updates. Unclear matches and conflicting edits are reported for review.",
      "benefitLabel": "Designed benefit",
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
      "cover": "assets/portfolio/patientnow-cover-v2.png",
      "architecture": "assets/portfolio/patientnow-architecture.svg",
      "screenshots": [
        {
          "src": "assets/portfolio/patientnow-guide-permissions-excerpt.png",
          "caption": "Excerpt from the 24 October 2026 deployment guide: scoped configuration and account-specific setup. Documentation example, not a live system capture."
        },
        {
          "src": "assets/portfolio/patientnow-guide-acceptance-excerpt.png",
          "caption": "Excerpt from the 24 October 2026 deployment guide: acceptance checks for cancellation, refunds, provider calendars and blocked time. These are test instructions, not a claim that each live check has passed."
        }
      ],
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
    }
  ],
  "clientWork": [
    {
      "id": "uw-01",
      "sourceIndex": 0,
      "title": "Notion to GoHighLevel contact sync",
      "titleOriginal": "Notion ↔ GoHighLevel CRM Integration and Automation via Make",
      "role": "Automation and API integration",
      "summary": "I connected a Notion contact database to GoHighLevel through a Make scenario. The workflow maps fields, searches for an existing contact, and chooses an update or create operation. Webhook triggers, error logging and notifications make the sequence easier to follow and maintain. The described implementation sends changes from Notion to GHL; reverse synchronization was a possible extension.",
      "stack": [
        "Notion",
        "GoHighLevel",
        "Make",
        "Webhooks",
        "JSON mapping"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2110337539072770048",
      "scope": "One-way contact synchronization through Make, with duplicate checks and field mapping.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-01-01.png",
          "caption": "Notion-to-GoHighLevel contact lookup, create/update and task workflow."
        }
      ]
    },
    {
      "id": "uw-02",
      "sourceIndex": 1,
      "title": "Coaching community and webinar funnel",
      "titleOriginal": "GoHighLevel Funnel & CRM Automation for Mompreneur Coaching Community",
      "role": "GoHighLevel funnels and CRM automation",
      "summary": "I built a GoHighLevel journey that connects community signup, discovery calls, webinars and program enrollment. Forms apply tags and segmentation so contacts enter the relevant booking or email sequence. Calendar integration, Zapier and webhooks connect registration to CRM updates, reminders and replay access. Custom HTML, CSS and JavaScript support responsive pages and conditional form behaviour.",
      "stack": [
        "GoHighLevel",
        "Zapier",
        "Webhooks",
        "Calendar integration",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1998392639857852416",
      "scope": "Community, booking and webinar workflows built on GoHighLevel.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-02-02.png",
          "caption": "Mompreneur community homepage and branded hero section."
        },
        {
          "src": "assets/portfolio/upwork/uw-02-01.png",
          "caption": "Public booking page with embedded discovery-call calendar."
        },
        {
          "src": "assets/portfolio/upwork/uw-02-05.png",
          "caption": "Branded merchandise storefront and product grid."
        },
        {
          "src": "assets/portfolio/upwork/uw-02-03.png",
          "caption": "Lead-capture popup with an empty email and name form."
        },
        {
          "src": "assets/portfolio/upwork/uw-02-04.png",
          "caption": "Community, guide and episode calls to action."
        }
      ]
    },
    {
      "id": "uw-03",
      "sourceIndex": 2,
      "title": "Executive coaching lead-magnet funnel",
      "titleOriginal": "GoHighLevel Landing Page & CRM Automation for Executive Coaching",
      "role": "Funnel migration and workflow integration",
      "summary": "I migrated a coaching lead-magnet journey from fragmented Systeme.io flows into GoHighLevel. Opt-in and thank-you pages connect ebook delivery to CRM tagging, nurture emails and booking follow-ups. Showit pages and calls to action follow the same journey, while Make, Google Sheets and analytics configuration support the surrounding workflow. The work combines page implementation, segmentation and integration setup.",
      "stack": [
        "GoHighLevel",
        "Showit",
        "Make",
        "Google Sheets",
        "GA4",
        "GTM",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2091895862459183104",
      "scope": "Lead-magnet migration, page alignment and CRM follow-up automation.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-03-01.png",
          "caption": "Executive-coaching lead-capture landing page with a blank form."
        },
        {
          "src": "assets/portfolio/upwork/uw-03-02.png",
          "caption": "Webhook workflow with HTTP/Sheets and AI response branches."
        }
      ]
    },
    {
      "id": "uw-04",
      "sourceIndex": 3,
      "title": "White-label GoHighLevel workspace",
      "titleOriginal": "GoHighLevel White-Label SaaS CRM Automation & UI/UX Optimization",
      "role": "JavaScript and CSS interface customization",
      "summary": "I customized a white-label GoHighLevel interface with JavaScript and reusable CSS. The work covers navigation, dashboards, smart lists, contacts, opportunity views and enrollment pipelines. Shared styling and interaction patterns keep the workspace consistent across sub-accounts, while role-aware visibility changes which interface elements people see. This is customization of an existing platform; frontend visibility does not replace its backend authorization.",
      "stack": [
        "GoHighLevel",
        "JavaScript",
        "HTML",
        "CSS",
        "DOM integration",
        "Naive UI",
        "Tabulator"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2054642433408012288",
      "scope": "Platform interface customization with reusable styling and role-aware visibility.",
      "images": []
    },
    {
      "id": "uw-05",
      "sourceIndex": 4,
      "title": "Interactive mortgage enquiry flow",
      "titleOriginal": "Interactive Mortgage Lead Funnel | CRM Automation & Lead Generation",
      "role": "Interactive frontend and CRM-ready intake",
      "summary": "I designed a conversational mortgage enquiry flow that gathers service intent, property information, indicative financing needs and timing before contact details. A Vue.js single-page interface on AdsQuiz uses stepped questions, sliders and consent capture to organize the information. The flow prepares structured lead data for CRM delivery and segmentation, giving the enquiry a consistent format before the first conversation.",
      "stack": [
        "Vue.js",
        "AdsQuiz",
        "JavaScript",
        "HTML",
        "CSS",
        "GoHighLevel",
        "API integration"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2105280224797556736",
      "scope": "Interactive enquiry collection and integration-ready lead delivery.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-05-01.png",
          "caption": "Mortgage consultation funnel introduction."
        },
        {
          "src": "assets/portfolio/upwork/uw-05-02.png",
          "caption": "Mortgage-service selection step."
        },
        {
          "src": "assets/portfolio/upwork/uw-05-03.png",
          "caption": "Contact form and consent controls at the final funnel step."
        }
      ]
    },
    {
      "id": "uw-06",
      "sourceIndex": 5,
      "title": "Fitness webinar and replay automation",
      "titleOriginal": "GHL Funnel Builder for Fitness Coach | Webinar & Marketing Automation",
      "role": "Funnel and automation implementation with a designer",
      "summary": "I implemented the automation side of a webinar sales journey alongside a designer. GoHighLevel pages cover registration, the live session, replay, sales offers and checkout. ActiveCampaign lists, tags and behavioural states distinguish registered, attended, missed and purchased contacts, driving different reminders and follow-ups. Stripe and PayPal integrations and GA4 event setup connect the marketing workflow to its checkout stages.",
      "stack": [
        "GoHighLevel",
        "ActiveCampaign",
        "Stripe",
        "PayPal",
        "GA4",
        "Email automation"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2096955411710705664",
      "scope": "Webinar and replay workflows with ActiveCampaign segmentation and checkout integration.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-06-01.png",
          "caption": "Fitness webinar registration page with a blank contact form."
        },
        {
          "src": "assets/portfolio/upwork/uw-06-03.png",
          "caption": "Fitness webinar offer and course-content section."
        },
        {
          "src": "assets/portfolio/upwork/uw-06-04.png",
          "caption": "Fitness webinar learning-goals section."
        },
        {
          "src": "assets/portfolio/upwork/uw-06-02.png",
          "caption": "Published webinar-funnel concept diagram."
        }
      ]
    },
    {
      "id": "uw-07",
      "sourceIndex": 6,
      "title": "Business-coach booking funnel",
      "titleOriginal": "GoHighLevel Funnel for Business Coach | CRM Automation, Booking, API",
      "role": "Frontend, booking and CRM workflow integration",
      "summary": "I connected responsive coaching pages, consultation forms and chat capture to a GoHighLevel booking workflow. CRM tags and pipeline stages organize contacts as booking and follow-up events arrive. Zapier, webhooks and Twilio connect calendar updates, confirmations, reminders and segmented email or SMS sequences. Custom HTML, CSS and JavaScript support the page layout and form behaviour around that journey.",
      "stack": [
        "GoHighLevel",
        "Zapier",
        "Webhooks",
        "Twilio",
        "HTML",
        "CSS",
        "JavaScript",
        "GA4",
        "GTM"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1995878684624539648",
      "scope": "Website, consultation booking, chat capture and CRM follow-ups.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-07-01.png",
          "caption": "Business-coaching homepage and consultation call to action."
        },
        {
          "src": "assets/portfolio/upwork/uw-07-03.png",
          "caption": "Business-coaching services page."
        },
        {
          "src": "assets/portfolio/upwork/uw-07-02.png",
          "caption": "Consultation call to action and public business-contact footer."
        }
      ]
    },
    {
      "id": "uw-08",
      "sourceIndex": 7,
      "title": "Merchant onboarding and CRM automation",
      "titleOriginal": "GoHighLevel CRM Automation & Stripe Payment Integration | B2B Fintech",
      "role": "CRM setup and payment-triggered workflow integration",
      "summary": "I connected a merchant-services CRM workflow to Stripe payment events and onboarding communication. GoHighLevel pipelines, tags and responsive forms organize the customer journey, while Zapier and webhooks trigger CRM updates, team alerts and Twilio messages. The work brings payment-event notifications and follow-up steps into the CRM, keeping the onboarding sequence connected to the contact and its current pipeline stage.",
      "stack": [
        "GoHighLevel",
        "Stripe",
        "Twilio",
        "Zapier",
        "Webhooks",
        "JavaScript",
        "HTML",
        "CSS"
      ],
      "category": "Payments & commerce",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1991157873461620736",
      "scope": "Payment-event and onboarding workflows around GoHighLevel and Stripe.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-08-01.png",
          "caption": "Merchant-services homepage and payment-processing offer."
        },
        {
          "src": "assets/portfolio/upwork/uw-08-03.png",
          "caption": "Merchant-services lead-capture page with an empty email field."
        },
        {
          "src": "assets/portfolio/upwork/uw-08-02.png",
          "caption": "Merchant-services content and service highlights."
        }
      ]
    },
    {
      "id": "uw-09",
      "sourceIndex": 8,
      "title": "Gift-order and delivery workflows",
      "titleOriginal": "GoHighLevel Automation Funnel for Gift Delivery (CRM API SMS Zapier)",
      "role": "GoHighLevel and external-service integration",
      "summary": "I built a branded gift-order funnel that connects CRM tagging, payment-event logic, scheduling and customer communication. GoHighLevel manages the funnel and workflow stages, with Stripe, Twilio, Zapier and webhooks linking the surrounding services. Custom page and form code supports the order journey. Customer messages and delivery-related follow-ups are attached to the relevant order stage through the connected workflow.",
      "stack": [
        "GoHighLevel",
        "Stripe",
        "Twilio",
        "Zapier",
        "Webhooks",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "category": "Payments & commerce",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1988622094966190080",
      "scope": "Gift-order funnel, scheduling links and customer communication automation.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-09-01.png",
          "caption": "Gift-delivery platform homepage and signup calls to action."
        },
        {
          "src": "assets/portfolio/upwork/uw-09-02.png",
          "caption": "Public consultation calendar for the gift-delivery platform."
        },
        {
          "src": "assets/portfolio/upwork/uw-09-03.png",
          "caption": "Gift-delivery website integration-marketing section."
        }
      ]
    },
    {
      "id": "uw-10",
      "sourceIndex": 9,
      "title": "Restaurant reservations and dynamic menu",
      "titleOriginal": "GoHighLevel Restaurant Booking Website | CRM, HTML, CSS & JavaScript",
      "role": "GoHighLevel frontend and booking workflows",
      "summary": "I built a responsive restaurant website in GoHighLevel with a categorized JavaScript menu and reservation forms. Form submissions connect to CRM records and workflow triggers, followed by booking confirmations and reminders through email or SMS. The implementation combines platform editing with custom HTML, CSS and JavaScript, keeping the menu, mobile layout and reservation journey within one maintainable website.",
      "stack": [
        "GoHighLevel",
        "HTML",
        "CSS",
        "JavaScript",
        "CRM workflows",
        "SMS/email automation"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1996231600239800320",
      "scope": "Restaurant website, reservation forms and confirmation workflows.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-10-01.png",
          "caption": "Archived restaurant homepage with menu and online-order navigation."
        }
      ]
    },
    {
      "id": "uw-11",
      "sourceIndex": 10,
      "title": "Custom CRM dashboard and pipeline",
      "titleOriginal": "Custom CRM Development | Marketing Automation, CRM Automation & API",
      "role": "React frontend and Node.js backend development",
      "summary": "This is the custom CRM project also shown as CRM-KP in my application work. It combines a React and TypeScript dashboard, client forms, a Kanban sales pipeline and centralized Redux state with an Express backend. The source includes Slack and email service modules. It remains a development snapshot, with authentication integration and demonstration adapters needing alignment before complete production use.",
      "stack": [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Material UI",
        "Node.js",
        "Express",
        "Slack Web API",
        "Nodemailer"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2007049514782806016",
      "scope": "The existing CRM-KP project, presented here through its published Upwork case.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-11-01.png",
          "caption": "CRM dashboard with sample sales-pipeline data."
        },
        {
          "src": "assets/portfolio/upwork/uw-11-03.png",
          "caption": "CRM Kanban pipeline with sample deals."
        },
        {
          "src": "assets/portfolio/upwork/uw-11-02.png",
          "caption": "CRM client table with sample records."
        },
        {
          "src": "assets/portfolio/upwork/uw-11-04.png",
          "caption": "CRM email-template and compose interface."
        }
      ]
    },
    {
      "id": "uw-12",
      "sourceIndex": 11,
      "title": "Construction quote intake and routing",
      "titleOriginal": "GoHighLevel CRM Automation, Lead Generation, Workflow for Construction",
      "role": "Service website and CRM workflow implementation",
      "summary": "I connected a construction-services website and quote-request forms to an operational GoHighLevel pipeline. Enquiries move through estimate, scheduled, in-progress and completed stages, with tags, assignments and calendar links tying each request to the next action. Zapier and webhooks connect form capture to CRM updates, while confirmation and follow-up messages support the enquiry, estimate and scheduling portions of the workflow.",
      "stack": [
        "GoHighLevel",
        "HTML",
        "CSS",
        "JavaScript",
        "Zapier",
        "Webhooks",
        "Email/SMS",
        "GA4",
        "GTM"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1995508211760467968",
      "scope": "Service enquiries, quotation stages and scheduling-related CRM workflows.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-12-01.png",
          "caption": "Construction-services homepage and estimate call to action."
        },
        {
          "src": "assets/portfolio/upwork/uw-12-02.png",
          "caption": "Construction estimate-request form with blank inputs."
        },
        {
          "src": "assets/portfolio/upwork/uw-12-03.png",
          "caption": "Construction service details and FAQ layout."
        }
      ]
    },
    {
      "id": "uw-13",
      "sourceIndex": 12,
      "title": "Vacation rental booking and calendars",
      "titleOriginal": "GoHighLevel Website for Vacation Rentals | Booking CRM Automation API",
      "role": "GoHighLevel frontend and booking automation",
      "summary": "I built rental pages and booking or enquiry forms that connect to GoHighLevel CRM pipelines and guest communication workflows. Google Calendar integration, Zapier and webhooks support availability updates alongside confirmations, reminders and follow-ups. Custom HTML, CSS and JavaScript provide the responsive frontend. The described project focuses on booking and calendar coordination; checkout and additional guest services were possible extensions.",
      "stack": [
        "GoHighLevel",
        "HTML",
        "CSS",
        "JavaScript",
        "Google Calendar API",
        "Zapier",
        "Webhooks",
        "Twilio",
        "GA4",
        "GTM"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2000942337346359296",
      "scope": "Rental frontend, guest communication and calendar integration.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-13-01.png",
          "caption": "Vacation-rental homepage in the GoHighLevel preview."
        },
        {
          "src": "assets/portfolio/upwork/uw-13-02.png",
          "caption": "Vacation-rental enquiry form with blank guest fields."
        },
        {
          "src": "assets/portfolio/upwork/uw-13-03.png",
          "caption": "Vacation-rental activity and guest-gallery layout."
        }
      ]
    },
    {
      "id": "uw-14",
      "sourceIndex": 13,
      "title": "Professional service-request intake",
      "titleOriginal": "GoHighLevel Landing Page & Service Request Automation | HTML, CSS, API",
      "role": "Responsive frontend and CRM-connected forms",
      "summary": "I built a responsive landing page and multi-step request forms for a professional-services workflow. Submitted information maps into GoHighLevel custom fields, tags, pipelines and opportunities, with routing, internal notifications and follow-up sequences. React, JavaScript, HTML and CSS support the interface, while Zapier and webhooks connect the form to CRM operations. The form collects the information needed to categorize each request.",
      "stack": [
        "GoHighLevel",
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Zapier",
        "Webhooks",
        "Form Builder"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=2001679576824881152",
      "scope": "Service-request forms, field mapping and CRM routing.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-14-01.png",
          "caption": "Service-request homepage with a blank enquiry form."
        },
        {
          "src": "assets/portfolio/upwork/uw-14-02.png",
          "caption": "Service-request page and public business footer."
        }
      ]
    },
    {
      "id": "uw-15",
      "sourceIndex": 14,
      "title": "Event tickets and merchandise sites",
      "titleOriginal": "GHL Dual-Site | E-Commerce & Event Ticketing System for Entertainment",
      "role": "Dual-site frontend and CRM/payment workflow setup",
      "summary": "I built two connected GoHighLevel websites for event tickets and merchandise, using a shared CRM to keep the purchase journeys organized. Stripe payment events, Zapier and CRM workflows connect transactions to tags, confirmation or access emails and audience segmentation. Custom HTML, CSS and JavaScript support the responsive storefronts, with analytics configuration covering the ticket and merchandise paths.",
      "stack": [
        "GoHighLevel",
        "Stripe",
        "Zapier",
        "HTML",
        "CSS",
        "JavaScript",
        "CRM workflows",
        "GA4",
        "GTM",
        "Meta Pixel"
      ],
      "category": "Payments & commerce",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1998769231989415936",
      "scope": "Two platform-based storefronts connected through payment events and a shared CRM.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-15-01.png",
          "caption": "Entertainment-event homepage and ticket-navigation layout."
        },
        {
          "src": "assets/portfolio/upwork/uw-15-03.png",
          "caption": "Event enquiry popup with empty contact fields."
        },
        {
          "src": "assets/portfolio/upwork/uw-15-04.png",
          "caption": "Event partnership and programme content section."
        },
        {
          "src": "assets/portfolio/upwork/uw-15-02.png",
          "caption": "Ecommerce collection-grid preview for the entertainment project."
        }
      ]
    },
    {
      "id": "uw-16",
      "sourceIndex": 15,
      "title": "Rental booking pages with React logic",
      "titleOriginal": "GoHighLevel Booking Pages & CRM Automation | React HTML CSS JavaScript",
      "role": "GoHighLevel frontend and CRM-connected booking pages",
      "summary": "I built GoHighLevel rental landing pages with custom booking forms and React or JavaScript interface logic. Forms connect lead capture to CRM pipelines, tags and follow-up communication, while API integrations, Zapier and webhooks support calendar availability. The work combines responsive page implementation with workflow configuration, bringing property details, lead forms and booking-related communication into a consistent interface for prospective guests.",
      "stack": [
        "GoHighLevel",
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Zapier",
        "Webhooks",
        "API integration",
        "GA4",
        "GTM"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1999514259445223424",
      "scope": "Rental pages, form behaviour and CRM-connected booking workflows.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-16-01.png",
          "caption": "Vacation-rental homepage and booking call to action in GoHighLevel preview."
        },
        {
          "src": "assets/portfolio/upwork/uw-16-03.png",
          "caption": "Vacation-guide lead-capture form and rental-card layout."
        },
        {
          "src": "assets/portfolio/upwork/uw-16-04.png",
          "caption": "Rental-suite catalogue with amenities and detail links."
        },
        {
          "src": "assets/portfolio/upwork/uw-16-02.png",
          "caption": "Rental-detail gallery, property information and amenity layout."
        }
      ]
    },
    {
      "id": "uw-17",
      "sourceIndex": 16,
      "title": "Coaching, training and speaking workflows",
      "titleOriginal": "GoHighLevel Automation for Sales Coach | CRM, Funnels, API, HTML, CSS",
      "role": "Funnels, CRM segmentation and automation integration",
      "summary": "I built connected funnels for coaching, training and speaking services, with forms and tags routing contacts into the relevant journey. GoHighLevel pipelines and email sequences connect consultation booking, training-program checkout, onboarding, reminders and post-session follow-ups. Zapier, webhooks and custom HTML, CSS and JavaScript support the integrations and page behaviour. Each service line has its own lead classification and follow-up sequence.",
      "stack": [
        "GoHighLevel",
        "Zapier",
        "Webhooks",
        "HTML",
        "CSS",
        "JavaScript",
        "Booking workflows",
        "Commerce workflows"
      ],
      "category": "CRM & integrations",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1993712123571834880",
      "scope": "Service-specific lead routing, booking and training-program automation.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-17-01.png",
          "caption": "Sales-coaching homepage with branded hero and service navigation."
        },
        {
          "src": "assets/portfolio/upwork/uw-17-02.png",
          "caption": "Sales-coaching service choices and blank enquiry form."
        },
        {
          "src": "assets/portfolio/upwork/uw-17-03.png",
          "caption": "Coaching service page with embedded video and contact call to action."
        }
      ]
    },
    {
      "id": "uw-18",
      "sourceIndex": 17,
      "title": "Custom restaurant menu and forms",
      "titleOriginal": "GohighLevel Website | Landing Page HTML CSS JavaScript for Restaurant",
      "role": "GoHighLevel website and custom JavaScript/CSS interface",
      "summary": "I built a restaurant website in GoHighLevel with a custom category-filtered menu written in JavaScript and CSS. Responsive pages connect ordering, catering and reservation enquiries to CRM segments, tags and internal notifications. The project demonstrates custom frontend behaviour inside a website platform, alongside practical form integration. Its published scope describes enquiry and order capture; online payments were a possible later addition.",
      "stack": [
        "GoHighLevel",
        "JavaScript",
        "HTML",
        "CSS",
        "Form Builder",
        "CRM tags",
        "Workflow notifications"
      ],
      "category": "Funnels & websites",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1989001779622383616",
      "scope": "Custom JavaScript menu, responsive pages and CRM-connected enquiry forms.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-18-01.png",
          "caption": "Archived restaurant homepage with food imagery and section navigation."
        },
        {
          "src": "assets/portfolio/upwork/uw-18-02.png",
          "caption": "Archived catering request form with delivery and contact fields."
        },
        {
          "src": "assets/portfolio/upwork/uw-18-03.png",
          "caption": "Archived restaurant menu and public image gallery."
        }
      ]
    },
    {
      "id": "uw-19",
      "sourceIndex": 18,
      "title": "Payment-triggered course access",
      "titleOriginal": "GoHighLevel Automation | CRM Stripe Zapier Webhooks SMS & Coach Funnel",
      "role": "Funnel and automation integration",
      "summary": "I built a one-page course-sales funnel connecting Stripe checkout events to GoHighLevel CRM updates and access-email workflows. Zapier and webhooks link payment events to tags, welcome sequences and subsequent email or SMS follow-ups. Custom HTML, CSS and JavaScript support the responsive page and forms. The public case covers the integration flow; protected course content and client details remain private.",
      "stack": [
        "GoHighLevel",
        "Stripe",
        "Zapier",
        "Webhooks",
        "HTML",
        "CSS",
        "JavaScript",
        "Email/SMS"
      ],
      "category": "Payments & commerce",
      "link": "https://www.upwork.com/freelancers/~014b478981bfacdaf1?p=1990431490445197312",
      "scope": "Course-sales funnel and payment-triggered onboarding; course content remains private.",
      "images": [
        {
          "src": "assets/portfolio/upwork/uw-19-01.png",
          "caption": "Coaching lead-magnet landing page with video and guide call to action."
        },
        {
          "src": "assets/portfolio/upwork/uw-19-02.png",
          "caption": "Guide-download modal with blank contact and consent fields."
        },
        {
          "src": "assets/portfolio/upwork/uw-19-03.png",
          "caption": "Coaching landing-page overview, consultation call to action and testimonial section."
        }
      ]
    }
  ],
  "visualNote": "Project covers illustrate the tools and workflow. Architecture diagrams describe implementation; actual interface screenshots and synthetic demonstrations are individually labelled."
};
