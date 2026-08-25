# API Documentation

## Overview

The Interview Copilot API is a REST API built with Fastify that provides endpoints for interview management, AI-powered question generation, and feedback analysis.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

Interactive clients use OAuth 2.0 / OpenID Connect Authorization Code with PKCE. API requests use a short-lived bearer access token. Web applications may use an HTTP-only refresh cookie; desktop and mobile applications provide a secure-storage adapter to `@company/auth-client`.

### Auth and Account

```
POST /auth/authorize
POST /auth/callback
GET  /auth/session
POST /auth/refresh
POST /auth/logout
GET  /users/me
PATCH /users/me
GET  /organizations
GET  /organizations/:id/members
POST /organizations/:id/invitations
```

Protected product routes use `@company/auth-fastify` and call `request.authenticate()` before accessing `request.user`.

## Endpoints

### Health Check

```
GET /health
```

Returns the API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Interviews

#### List Interviews
```
GET /interviews
```

#### Create Interview
```
POST /interviews
```

**Request Body:**
```json
{
  "title": "Technical Interview",
  "category": "algorithms",
  "difficulty": "medium"
}
```

#### Get Interview
```
GET /interviews/:id
```

#### Update Interview
```
PUT /interviews/:id
```

#### Delete Interview
```
DELETE /interviews/:id
```

### Questions

#### Generate Questions
```
POST /questions/generate
```

**Request Body:**
```json
{
  "category": "algorithms",
  "difficulty": "medium",
  "count": 5,
  "topic": "sorting"
}
```

### Feedback

#### Submit Answer
```
POST /feedback/evaluate
```

**Request Body:**
```json
{
  "questionId": "q123",
  "answer": "user answer text",
  "rubric": "technical"
}
```

#### Get Feedback
```
GET /feedback/:sessionId
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
