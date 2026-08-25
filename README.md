# Interview Copilot

> A macOS-first, real-time AI interview and problem-solving copilot that understands spoken conversation, shared-screen content, and user input, then provides contextual hints, approaches, explanations, and suggested answers in a private assistant interface.

**Status:** MVP Specification  
**Target Platform:** macOS  
**Primary Database:** MongoDB Atlas  
**Architecture:** Tauri + React + Rust + Node.js API + MongoDB Atlas

---

## 1. Product Overview

Interview Copilot is a desktop application for real-time interview assistance and interview practice.

The application listens to an interview or meeting, converts speech into a live transcript, optionally analyzes shared-screen content, understands the current context, and provides AI-generated assistance.

The assistant is designed around the following workflow:

```text
Listen → Understand → Analyze → Suggest → User Decides
```

The user remains in control of what they say, type, or submit.

### Primary use cases

- Technical interviews
- Algorithm and data-structure problems
- Coding questions
- System design interviews
- Backend/API questions
- Frontend questions
- Database/SQL questions
- Debugging questions
- AI/ML technical questions
- General technical interview questions
- Behavioral/HR interview preparation
- Meeting notes and summaries

> **Responsible-use requirement:** The product should be used for practice or in interviews/meetings where external AI assistance is permitted. It must not be positioned as a tool for bypassing interview rules or assessment policies.

---

# 2. Product Vision

The long-term vision is to build a multimodal AI copilot that can understand:

1. What the interviewer says
2. What is visible on the shared screen
3. What the user types
4. What has already been discussed
5. What the current problem requires

The AI then creates a structured understanding of the current situation and provides useful assistance.

```text
                     INTERVIEW COPILOT
                            |
          +-----------------+-----------------+
          |                 |                 |
        AUDIO             SCREEN             TEXT
          |                 |                 |
          v                 v                 v
   Speech-to-Text        Vision           User Input
          |                 |                 |
          +-----------------+-----------------+
                            |
                            v
                    CONTEXT ENGINE
                            |
                 +----------+----------+
                 |                     |
              MEMORY              CURRENT CONTEXT
                 |                     |
                 +----------+----------+
                            |
                            v
                        AI ENGINE
                            |
              +-------------+-------------+
              |             |             |
             Hint         Approach       Answer
              |             |             |
              +-------------+-------------+
                            |
                            v
                      COPILOT UI
                            |
                            v
                       USER DECIDES
```

---

# 3. MVP Goals

The MVP must demonstrate that the following workflow works reliably:

1. Launch the macOS application.
2. Start an interview/session.
3. Capture microphone audio.
4. Capture supported system/meeting audio.
5. Generate a live transcript.
6. Detect and classify interview questions.
7. Allow the user to ask the AI questions.
8. Generate contextual hints and explanations.
9. Analyze a shared-screen screenshot when requested or when relevant.
10. Detect coding/algorithm problems from screen content.
11. Generate an algorithmic approach, complexity, and edge cases.
12. Display results in a private Copilot interface.
13. Stop the session.
14. Generate and save a session summary.

---

# 4. MVP Non-Goals

The following are intentionally excluded from the first MVP:

- Mobile application
- Web application
- Multi-user collaboration
- Billing/subscriptions
- Full calendar integration
- Slack/Teams integrations
- Notion integration
- Multiple cloud AI providers from day one
- Custom-trained AI models
- Complex RAG infrastructure
- Vector database
- Enterprise administration
- Public App Store launch
- Automatic submission of answers
- Automatic typing into interview/coding platforms

These can be considered after the MVP is stable.

---

# 5. Core Features

## 5.1 Desktop Application

The application will run as a native-feeling macOS desktop application.

### Requirements

- Menu bar application
- Main dashboard
- Session start/stop
- Mode selection
- Floating Copilot window
- Settings
- Session history
- Keyboard shortcuts
- Permission management
- Status indicators

---

# 6. Interview Modes

## 6.1 General Interview Mode

Designed for general technical interviews.

The AI should identify:

- Question
- Topic
- Important concepts
- Suggested response
- Key points
- Possible follow-up questions

Example:

```text
Question:
Why did you choose PostgreSQL?

AI:
Suggested points:
- Relational data
- Strong consistency
- Complex queries
- Transactions
- Mature ecosystem

Possible follow-up:
Why not MongoDB?
```

---

## 6.2 Algorithm Mode

Designed for coding and DSA interviews.

Supported patterns should include:

- Arrays
- Strings
- Hashing
- Two pointers
- Sliding window
- Binary search
- Sorting
- Linked lists
- Stacks
- Queues
- Trees
- Graphs
- BFS
- DFS
- Recursion
- Backtracking
- Dynamic programming
- Greedy algorithms
- Heaps
- Intervals
- Prefix sums
- Union-Find

### Expected AI output

```json
{
  "category": "algorithm",
  "problem": "Longest Consecutive Sequence",
  "pattern": "Hash Set",
  "understanding": "...",
  "hint": "...",
  "approach": "...",
  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },
  "edge_cases": [],
  "follow_up_questions": []
}
```

---

## 6.3 System Design Mode

The AI should help structure system-design discussions.

Example:

```text
Problem:
Design a URL shortener.

AI analysis:

1. Requirements
2. APIs
3. Data model
4. Architecture
5. Database
6. Cache
7. Load balancing
8. Scaling
9. Reliability
10. Security
11. Monitoring
12. Trade-offs
```

---

## 6.4 General Mode

General contextual AI conversation.

Examples:

- Explain this simply
- Give me a hint
- Why is this approach better?
- What should I consider?
- What follow-up could they ask?
- Challenge my approach
- Explain the trade-off

---

# 7. Real-Time Audio Pipeline

The audio pipeline is one of the most important technical components.

```text
Microphone
    |
    v
Audio Capture
    |
    +-------------------+
    |                   |
System Audio          Mic Audio
    |                   |
    +---------+---------+
              |
              v
         Audio Mixer
              |
              v
       Audio Chunk Stream
              |
              v
      Speech-to-Text Engine
              |
              v
       Transcript Events
              |
              v
       Context Engine
```

## macOS technologies

Primary technologies:

- ScreenCaptureKit
- Core Audio
- AVFoundation where appropriate
- Tauri/Rust native layer

The implementation must account for macOS privacy permissions.

---

# 8. Speech-to-Text

## MVP

Start with a cloud streaming speech-to-text provider for faster implementation.

The application should expose an internal abstraction:

```typescript
interface TranscriptionProvider {
  start(): Promise<void>;
  stop(): Promise<void>;
  onTranscript(callback: TranscriptCallback): void;
}
```

This allows future providers.

## Future

Support local transcription such as:

- whisper.cpp
- faster-whisper
- Other optimized local speech models

---

# 9. Screen Understanding

Screen understanding allows the application to process coding questions, diagrams, system-design requirements, SQL queries, errors, and other visual content.

## MVP strategy

Do not continuously process every frame.

Instead:

```text
Screen
  |
  v
Screenshot
  |
  v
Detect meaningful change
  |
  v
Vision Model
  |
  v
Structured Context
```

The first implementation should support:

- Manual screenshot analysis
- User-triggered analysis
- Periodic analysis when enabled
- Change detection
- Vision model extraction

### Example extracted context

```json
{
  "type": "coding_problem",
  "title": "Two Sum",
  "description": "Given an array...",
  "input": "...",
  "output": "...",
  "examples": [
    {
      "input": "...",
      "output": "..."
    }
  ]
}
```

---

# 10. Context Engine

The Context Engine is the core architectural component.

Audio, screen analysis, and user input must not be tightly coupled directly to the LLM.

Instead, each source generates structured context.

```text
Audio Events
Screen Events
User Events
Previous Conversation
        |
        v
   Context Engine
        |
        v
Current Context
        |
        v
AI Engine
```

## Context sources

- Live transcript
- Recent transcript window
- Current question
- Previous questions
- Screen analysis
- Current problem
- User's AI questions
- Session mode
- Session metadata
- Important topics
- Decisions
- Notes
- Previous AI responses

---

# 11. Context Management

The application should avoid sending the entire meeting transcript to the AI on every request.

Use layered context:

```text
Session Summary
      +
Important Facts
      +
Current Problem
      +
Recent Transcript
      +
Current User Question
```

Example:

```json
{
  "mode": "algorithm",
  "current_problem": {},
  "recent_transcript": [],
  "important_context": [],
  "user_question": "Why is HashMap O(n)?"
}
```

This improves:

- Latency
- Token efficiency
- Cost
- Response relevance

---

# 12. AI Provider Architecture

The application must use an abstraction layer.

```typescript
interface AIProvider {
  analyzeContext(context: Context): Promise<AIAnalysis>;
  ask(context: Context, question: string): Promise<string>;
  stream(context: Context, question: string): AsyncIterable<string>;
}
```

Initial implementation:

```text
AIProvider
    |
    +-- Primary Cloud Provider
```

Future:

```text
AIProvider
    |
    +-- OpenAI
    +-- Anthropic
    +-- Gemini
    +-- Local LLM
```

The rest of the application must not depend directly on a specific provider SDK.

---

# 13. Structured AI Responses

LLM output should be validated before reaching the UI.

Recommended flow:

```text
LLM
 |
 v
JSON
 |
 v
Zod Validation
 |
 v
Application
 |
 v
UI
```

Example:

```typescript
interface AIAnalysis {
  category: string;
  understanding: string;
  hint?: string;
  approach?: string;
  complexity?: {
    time?: string;
    space?: string;
  };
  edgeCases?: string[];
  followUpQuestions?: string[];
}
```

---

# 14. Ask AI

The Copilot must allow contextual questions at any time.

Examples:

```text
Explain this simply
Give me a hint
What's the optimal approach?
What pattern is this?
What's the time complexity?
What's the space complexity?
What edge cases should I consider?
What follow-up might they ask?
Challenge this approach
Explain the trade-off
```

The answer must use the current context.

---

# 15. Copilot UI

The Copilot should be a compact floating desktop window.

Example:

```text
+------------------------------------------+
| 🤖 Interview Copilot        ● Listening  |
+------------------------------------------+
| CURRENT QUESTION                         |
|                                          |
| How would you scale this application?   |
|                                          |
+------------------------------------------+
| ANALYSIS                                 |
|                                          |
| Category: System Design                  |
|                                          |
+------------------------------------------+
| APPROACH                                 |
|                                          |
| Start with horizontal scaling...         |
|                                          |
+------------------------------------------+
| COMPLEXITY / TRADE-OFFS                  |
|                                          |
| ...                                      |
|                                          |
+------------------------------------------+
| Ask AI...                                |
+------------------------------------------+
```

---

# 16. Keyboard Shortcuts

Initial shortcuts:

| Shortcut          | Action                    |
| ----------------- | ------------------------- |
| `Cmd + Shift + I` | Toggle Copilot            |
| `Cmd + Shift + A` | Ask AI                    |
| `Cmd + Shift + H` | Request hint              |
| `Cmd + Shift + S` | Request detailed solution |
| `Cmd + Shift + P` | Analyze screen            |

Shortcuts should eventually be configurable.

---

# 17. Screen-Share Protection

The Copilot should be implemented as a separate native macOS window.

Desired behavior:

```text
User's Mac
    |
    +-- Meeting Application
    |
    +-- Copilot Overlay
```

The overlay should attempt to use supported macOS capture-exclusion/privacy mechanisms so it is not included in supported screen-capture paths.

### Important limitation

Screen-sharing behavior depends on:

- macOS version
- Capture API
- Zoom/Meet/Teams implementation
- Window capture vs display capture
- Browser capture behavior

Therefore, the application must not falsely claim that the overlay is guaranteed to be invisible in every capture scenario.

### Required feature

Provide a test/status screen:

```text
Screen Share Protection

Status:
Checking...

Capture protection:
Supported / Unsupported / Unknown

[ Run Test ]
```

The product should be used only where AI assistance is permitted.

---

# 18. MongoDB Atlas Architecture

MongoDB Atlas will be the primary persistent database.

The desktop application should **not** connect directly to MongoDB Atlas.

Use:

```text
Tauri Desktop
      |
      | HTTPS
      v
Node.js API
      |
      | MongoDB Driver
      v
MongoDB Atlas
```

Benefits:

- Credentials stay out of the desktop client
- Centralized authorization
- Easier API versioning
- Better security
- Future multi-device support
- Future user accounts
- Easier analytics

---

# 19. Backend API

Recommended backend:

**Node.js + Fastify + TypeScript**

Alternative:

**NestJS**

For MVP, Fastify is preferred for a lightweight API.

Responsibilities:

- Authentication later
- Session synchronization
- MongoDB operations
- AI provider proxying where appropriate
- Usage tracking
- Security
- Validation
- API rate limiting
- Configuration

---

# 20. MongoDB Collections

Initial collections:

```text
users
sessions
transcript_segments
problems
ai_interactions
notes
action_items
settings
```

## users

```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "name": "User",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## sessions

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "Software Engineer Interview",
  "mode": "algorithm",
  "startedAt": "Date",
  "endedAt": "Date",
  "durationSeconds": 2400,
  "summary": "...",
  "status": "completed",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## transcript_segments

```json
{
  "_id": "ObjectId",
  "sessionId": "ObjectId",
  "speaker": "interviewer",
  "text": "Explain your approach...",
  "startMs": 12000,
  "endMs": 15500,
  "createdAt": "Date"
}
```

## problems

```json
{
  "_id": "ObjectId",
  "sessionId": "ObjectId",
  "type": "algorithm",
  "title": "Two Sum",
  "description": "...",
  "pattern": "hash-map",
  "approach": "...",
  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },
  "edgeCases": [],
  "createdAt": "Date"
}
```

## ai_interactions

```json
{
  "_id": "ObjectId",
  "sessionId": "ObjectId",
  "question": "Why is this O(n)?",
  "response": "...",
  "category": "explanation",
  "provider": "primary",
  "model": "model-name",
  "latencyMs": 850,
  "createdAt": "Date"
}
```

---

# 21. MongoDB Indexing

Indexes should be designed around actual access patterns.

Initial indexes:

```text
sessions:
  { userId: 1, createdAt: -1 }

transcript_segments:
  { sessionId: 1, startMs: 1 }

problems:
  { sessionId: 1, createdAt: -1 }

ai_interactions:
  { sessionId: 1, createdAt: -1 }

notes:
  { sessionId: 1, createdAt: -1 }
```

Avoid unnecessary duplicated data and fields.

Use references where appropriate and embed small, tightly related structures when that reduces unnecessary queries.

---

# 22. API Design

Initial API structure:

```text
/api/v1

POST   /sessions
GET    /sessions
GET    /sessions/:id
PATCH  /sessions/:id
POST   /sessions/:id/end

POST   /sessions/:id/transcript
GET    /sessions/:id/transcript

POST   /sessions/:id/analyze
POST   /sessions/:id/ask

GET    /sessions/:id/problems
GET    /sessions/:id/notes
```

Future:

```text
POST /auth/login
POST /auth/register

GET /profile
PATCH /profile

GET /settings
PATCH /settings
```

---

# 23. Frontend Architecture

```text
src/
├── components/
│   ├── Copilot/
│   ├── Transcript/
│   ├── Problem/
│   ├── AIResponse/
│   ├── Session/
│   └── Settings/
│
├── pages/
│   ├── Home/
│   ├── Session/
│   ├── History/
│   └── Settings/
│
├── stores/
│   ├── session.store.ts
│   ├── transcript.store.ts
│   ├── copilot.store.ts
│   └── settings.store.ts
│
├── services/
│   ├── api/
│   ├── ai/
│   ├── transcription/
│   └── screen/
│
├── types/
├── schemas/
└── lib/
```

---

# 24. Tauri/Rust Architecture

```text
src-tauri/
├── src/
│   ├── main.rs
│   │
│   ├── audio/
│   │   ├── mod.rs
│   │   ├── microphone.rs
│   │   ├── system_audio.rs
│   │   └── mixer.rs
│   │
│   ├── screen/
│   │   ├── mod.rs
│   │   ├── capture.rs
│   │   └── change_detection.rs
│   │
│   ├── window/
│   │   ├── mod.rs
│   │   └── copilot.rs
│   │
│   ├── database/
│   │   ├── mod.rs
│   │   └── local_cache.rs
│   │
│   ├── commands/
│   │   ├── session.rs
│   │   ├── audio.rs
│   │   ├── screen.rs
│   │   └── window.rs
│   │
│   └── errors.rs
│
└── Cargo.toml
```

---

# 25. Recommended Technology Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| Operating System  | macOS                                      |
| Desktop Framework | Tauri 2                                    |
| Frontend          | React                                      |
| Language          | TypeScript                                 |
| Styling           | Tailwind CSS                               |
| Components        | shadcn/ui                                  |
| State             | Zustand                                    |
| Validation        | Zod                                        |
| Native Backend    | Rust                                       |
| Audio             | ScreenCaptureKit + Core Audio/AVFoundation |
| Speech-to-Text    | Cloud streaming STT initially              |
| Vision            | Multimodal AI model                        |
| AI                | Provider abstraction                       |
| Backend API       | Node.js + Fastify                          |
| Backend Language  | TypeScript                                 |
| Database          | MongoDB Atlas                              |
| MongoDB Driver    | Official MongoDB Node.js driver            |
| Testing           | Vitest + Playwright                        |
| Rust Testing      | cargo test                                 |
| Version Control   | Git                                        |
| Repository        | GitHub                                     |
| IDE               | Cursor / VS Code                           |
| Packaging         | Tauri Bundler                              |
| Error Monitoring  | Sentry later                               |
| CI/CD             | GitHub Actions                             |

---

# 26. Development Tools

Install on the development Mac:

```text
Xcode
Xcode Command Line Tools
Homebrew
Node.js
pnpm
Rust
Cargo
Tauri CLI
Git
GitHub CLI (optional)
```

Recommended editor:

```text
Cursor
```

---

# 27. Environment Variables

Frontend should only receive non-sensitive public configuration.

Backend:

```env
NODE_ENV=development

PORT=4000

MONGODB_URI=
MONGODB_DATABASE=interview_copilot

AI_PROVIDER=
AI_API_KEY=

STT_PROVIDER=
STT_API_KEY=

VISION_PROVIDER=
VISION_API_KEY=
```

Never embed MongoDB credentials or private AI API keys inside the Tauri frontend bundle.

---

# 28. Security Requirements

The application may process sensitive meeting and interview information.

Security requirements:

- Do not store API secrets in the desktop frontend.
- Use HTTPS for API communication.
- Validate all API inputs.
- Validate AI outputs.
- Use MongoDB Atlas authentication.
- Apply least-privilege database credentials.
- Encrypt sensitive local cache data where practical.
- Do not permanently store raw audio by default.
- Clearly indicate active recording/capture.
- Provide data deletion functionality.
- Minimize stored transcript data.
- Avoid logging sensitive transcript content.
- Protect session APIs with authorization.

---

# 29. Privacy Model

Default behavior:

```text
Audio
  |
  v
Speech-to-text
  |
  v
Transcript
  |
  v
Context
  |
  v
AI
```

Raw audio should not be persisted unless the user explicitly enables recording.

Screen captures should be treated as temporary processing data by default.

The application should provide settings for:

```text
Store transcripts
Store AI conversations
Store screenshots
Store session summaries
Delete session after completion
```

---

# 30. Error Handling

The application must remain usable if an external service fails.

Examples:

### STT unavailable

```text
Speech recognition unavailable.

You can continue using:
- Manual input
- Screen analysis
- AI chat
```

### AI unavailable

```text
AI service unavailable.

Transcript capture is still active.
```

### Screen capture unavailable

```text
Screen analysis unavailable.

Check macOS Screen Recording permissions.
```

### MongoDB/API unavailable

```text
Cloud sync unavailable.

The current session will continue locally
and can be synchronized later.
```

---

# 31. Offline/Local-First Strategy

Even with MongoDB Atlas, the desktop app should not depend completely on the network.

Recommended:

```text
Active Session
      |
      v
Local session state/cache
      |
      +----> Cloud API when available
      |
      +----> MongoDB Atlas
```

If the network disappears:

- Continue session where possible
- Buffer transcript/context
- Resume synchronization later

---

# 32. Testing Strategy

## Unit tests

Test:

- Context merging
- Question classification
- AI response schemas
- MongoDB repositories
- Session state
- Transcript processing

## Integration tests

Test:

```text
Audio
 → Transcript
 → Context
 → AI
 → UI
```

## E2E

Use Playwright for:

- Start session
- Stop session
- Ask AI
- Change modes
- Session history
- Settings

## Audio fixtures

Create reusable test recordings:

```text
fixtures/audio/
├── technical-interview.wav
├── algorithm-question.wav
├── system-design.wav
└── noisy-interview.wav
```

---

# 33. MVP Milestones

## Milestone 1 — Project Foundation

- [ ] Tauri project
- [ ] React + TypeScript
- [ ] Tailwind
- [ ] shadcn/ui
- [ ] Rust backend
- [ ] Basic window
- [ ] Git repository
- [ ] Environment configuration

## Milestone 2 — Copilot UI

- [ ] Main dashboard
- [ ] Floating Copilot
- [ ] Session controls
- [ ] Mode selection
- [ ] Status indicators
- [ ] Keyboard shortcuts

## Milestone 3 — Audio

- [ ] Microphone permission
- [ ] Microphone capture
- [ ] System audio research/prototype
- [ ] Audio streaming
- [ ] Audio level indicator

## Milestone 4 — Transcription

- [ ] Streaming STT
- [ ] Live transcript
- [ ] Timestamps
- [ ] Speaker metadata where available
- [ ] Transcript events

## Milestone 5 — AI

- [ ] AI provider abstraction
- [ ] Context engine
- [ ] Structured response schema
- [ ] Streaming AI responses
- [ ] Ask AI
- [ ] Error handling

## Milestone 6 — Interview Intelligence

- [ ] Question detection
- [ ] Question classification
- [ ] Suggested answer
- [ ] Hint
- [ ] Explanation
- [ ] Follow-up questions

## Milestone 7 — Algorithm Solver

- [ ] Coding problem detection
- [ ] Pattern detection
- [ ] Algorithm recommendation
- [ ] Complexity analysis
- [ ] Edge cases
- [ ] Pseudocode

## Milestone 8 — Screen Understanding

- [ ] Screen capture
- [ ] Screenshot analysis
- [ ] Change detection
- [ ] Vision model
- [ ] Problem extraction
- [ ] Screen + transcript context merging

## Milestone 9 — MongoDB Atlas

- [ ] Node.js API
- [ ] Fastify
- [ ] MongoDB Atlas connection
- [ ] Session persistence
- [ ] Transcript persistence
- [ ] AI interaction persistence
- [ ] Indexes
- [ ] API authorization

## Milestone 10 — Session History

- [ ] Session list
- [ ] Session details
- [ ] Summary
- [ ] Search
- [ ] Delete
- [ ] Export Markdown

---

# 34. MVP Definition of Done

The MVP is complete when a developer can demonstrate:

```text
Launch application
      |
      v
Start Interview Session
      |
      v
Select "Algorithm Mode"
      |
      v
Start audio capture
      |
      v
Interviewer asks a coding problem
      |
      v
Live transcript appears
      |
      v
AI detects the problem
      |
      v
Copilot displays:
  - Understanding
  - Pattern
  - Hint
  - Approach
  - Complexity
  - Edge cases
      |
      v
Interviewer shares problem on screen
      |
      v
User triggers screen analysis
      |
      v
Vision model extracts problem context
      |
      v
Context Engine merges:
  - Audio
  - Screen
  - Conversation
      |
      v
User asks:
"Explain the optimal approach"
      |
      v
AI provides contextual response
      |
      v
User manually produces their answer
      |
      v
End Session
      |
      v
AI generates summary
      |
      v
Session saved through API
      |
      v
MongoDB Atlas
```

---

# 35. Phase 2 Roadmap

After MVP:

### AI Improvements

- Multiple AI providers
- Local LLM
- Local Whisper
- Better question detection
- Better coding reasoning
- Adaptive hints
- Interviewer-style follow-ups
- Confidence scoring
- Personalized interview context

### Technical Interview

- Code editor integration for practice
- Code analysis
- Runtime simulation
- Test-case generation
- Debugging assistant
- SQL analyzer
- System-design diagram understanding

### Productivity

- Calendar integration
- Meeting integrations
- Notion export
- Markdown/PDF export
- Cloud synchronization
- Search across previous interviews

---

# 36. Phase 3 Roadmap

Potential future product architecture:

```text
                 INTERVIEW COPILOT
                        |
        +---------------+---------------+
        |               |               |
       macOS           Web           Mobile
        |               |               |
        +---------------+---------------+
                        |
                    API Layer
                        |
        +---------------+---------------+
        |               |               |
   AI Services     MongoDB Atlas    Analytics
        |
 +------+------+------+
 |      |      |      |
STT   Vision  LLM   Local AI
```

---

# 37. Repository Structure

Recommended monorepo:

```text
interview-copilot/
│
├── apps/
│   ├── desktop/
│   └── api/
│
├── packages/
│   ├── shared-types/
│   ├── ai-schemas/
│   └── config/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── decisions/
│
├── fixtures/
│   ├── audio/
│   └── screenshots/
│
├── scripts/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# 38. Architecture Decision Records

Important technical decisions should be documented in:

```text
docs/decisions/
```

Examples:

```text
001-tauri-over-electron.md
002-mongodb-atlas.md
003-context-engine.md
004-ai-provider-abstraction.md
005-cloud-stt-first.md
006-local-first-session.md
```

This prevents architectural decisions from being forgotten as the project grows.

---

# 39. Performance Targets

Initial targets:

| Metric             |                            Target |
| ------------------ | --------------------------------: |
| App startup        |                       < 2 seconds |
| Copilot open       |                          < 300 ms |
| Transcript latency |                     < 2–3 seconds |
| AI first token     | < 2 seconds where provider allows |
| UI interaction     |                          < 100 ms |
| Screen analysis    |                       < 5 seconds |
| Memory usage       |          Keep as low as practical |
| Crash rate         |     Near zero for normal sessions |

These are engineering targets, not hard guarantees.

---

# 40. Product Principles

The project should follow these principles:

### 1. Context first

AI quality depends on understanding the current context.

### 2. Low latency

Real-time assistance is only useful if responses arrive quickly.

### 3. Local-first

Sensitive session data should remain local where practical.

### 4. Provider independent

Avoid locking the architecture to one AI provider.

### 5. Structured AI

Never depend on uncontrolled free-form model output for application logic.

### 6. Minimal UI

The Copilot should stay out of the user's way.

### 7. Human controlled

AI suggests; the user decides.

### 8. Privacy by design

Audio, screen content, transcripts, and interview information are potentially sensitive.

---

# 41. Recommended Development Order

Do not start by building the complete AI system.

Build vertically:

```text
Phase 1
Tauri
  ↓
React
  ↓
Basic Copilot
```

Then:

```text
Phase 2
Audio
  ↓
STT
  ↓
Live transcript
```

Then:

```text
Phase 3
Transcript
  ↓
AI
  ↓
Contextual response
```

Then:

```text
Phase 4
Screen
  ↓
Vision
  ↓
Problem extraction
```

Then:

```text
Phase 5
MongoDB Atlas
  ↓
API
  ↓
History
```

This produces a usable application at every stage instead of waiting until the entire system is finished.

---

# 42. Final MVP Architecture

```text
                         macOS
                           |
                  +--------v--------+
                  | Tauri Desktop   |
                  |                 |
                  | React UI        |
                  | Zustand         |
                  | Tailwind        |
                  +--------+--------+
                           |
                    Tauri Commands
                           |
                  +--------v--------+
                  | Rust Native     |
                  |                 |
                  | Audio Capture   |
                  | Screen Capture  |
                  | Window Manager  |
                  +--------+--------+
                           |
             +-------------+-------------+
             |                           |
             v                           v
       Speech-to-Text              Screen/Vision
             |                           |
             +-------------+-------------+
                           |
                           v
                    Context Engine
                           |
                           v
                       AI Engine
                           |
                           v
                    Copilot Response
                           |
                           v
                      React UI
                           |
                           |
                      HTTPS API
                           |
                  +--------v--------+
                  | Node.js Fastify |
                  |                 |
                  | Auth            |
                  | Sessions        |
                  | AI Gateway      |
                  | Data API        |
                  +--------+--------+
                           |
                  +--------v--------+
                  | MongoDB Atlas   |
                  |                 |
                  | Users           |
                  | Sessions        |
                  | Transcripts     |
                  | Problems        |
                  | AI Interactions |
                  | Notes           |
                  +-----------------+
```

---

# 43. First Development Goal

The first development target should **not** be screen understanding or sophisticated algorithms.

Build this first:

```text
Mac App
   ↓
Start Session
   ↓
Microphone
   ↓
Live Transcript
   ↓
AI Context
   ↓
Ask AI
   ↓
Private Copilot Response
```

Once this pipeline is stable, add:

```text
Screen Capture
      ↓
Vision
      ↓
Algorithm Problem Detection
```

Then:

```text
MongoDB Atlas
      ↓
API
      ↓
Session History
```

This order minimizes risk and gives you a working product early.
