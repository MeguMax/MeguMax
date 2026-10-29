# Internal integration and workflow platform

## Overview

I independently designed and built an internal application that connects an external marketplace through MCP with an operator workspace, n8n workflows and persistent business state. The system helps a team discover relevant work, apply versioned rules, prepare source-backed drafts and review the exact context before taking further action.

The difficult part was keeping identity, state and evidence consistent while external requests, model calls and manual edits happen at different times.

## My responsibilities

- Requirements analysis, application architecture and backend implementation.
- MCP integration and OAuth discovery, dynamic client registration, PKCE and token refresh.
- Operator workspace for jobs, profiles, rules, drafts, sources and conversations.
- Persistent workflow state, migration, versioning, validation and recovery behavior.
- AI-assisted preparation with strict structured output and server-controlled evidence references.
- Regression tests, container deployment and code-release checks.

## Architecture

```text
External platform MCP
        |
OAuth and account-scoped adapter
        |
Express API and operator workspace
        |
Versioned rules and workflow orchestration
        |                       |
PostgreSQL state          AI preparation
        |                       |
Run ledger               Server-owned source registry
        |                       |
        +------ Human review ---+
```

## Engineering decisions

**Identity and authorization.** A job discovered through one account is not automatically an action authorised for another account. I kept canonical job identity, discovery context and applying identity separate and bound operations to the relevant connection.

**Reliable state changes.** I used transactional state mutations, revision-aware reads and immutable workflow snapshots. Long operations recheck their pinned context before committing results so newer manual edits are preserved.

**Ambiguous outcomes.** A timeout does not prove an operation failed. The workflow records pending and unknown outcomes and prevents unsafe duplicate actions until the state can be reconciled.

**Source-backed AI preparation.** The model selects from server-generated evidence identifiers. The server resolves those identifiers to exact source passages and performs additional business validation after schema validation. Unknown availability, commercial commitments and unsupported experience remain review items.

**Recovery and deployment.** Preparation attempts record stage inputs, outputs, versions and ownership. Interrupted work is retained rather than blindly replayed. Release checks compare protected workflow records and manual state before and after code changes.

## Technologies

JavaScript, Node.js, Express, PostgreSQL, MCP SDK, OAuth/PKCE, Zod, n8n, Docker and Traefik. The operator interface uses HTML, CSS and JavaScript.

## Outcome

The application brings discovery, qualification, drafts and review into one operational workspace with traceable sources and explicit workflow state. Its implementation provides concrete examples of concurrency handling, integration reliability, source validation and preserving human work.

Private project. A sanitized architecture walkthrough can be used for an interview. Client records, credentials and internal service URLs are excluded from this summary.
