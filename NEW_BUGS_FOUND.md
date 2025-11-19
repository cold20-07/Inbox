# New Bugs and Issues Found 🐛

## Critical Issues

### ❌ 1. No Input Sanitization on Backend
**Location**: `backend/src/routes/analyze.routes.ts`, `api/emails/analyze.ts`

**Issue**: Backend doesn't validate or sanitize input strings before processing

**Problem**:
```typescript
const { sender, subject, body } = req.body
// No validation of types or sanitization
const analysis = await analyzeEmail(sender || 'Unknown', subject, body)
```

**Risks**:
- Could receive non-string values (objects, arrays, null)
- No length limits enforced on backend
- Potential for injection attacks in prompts
- Could cause crashes if unexpected types

**Fix Needed**:
```typescript
// Add validation
if (typeof subject !== 'string' || typeof body !== 'string') {
  return res.status(400).json({ error: 'Invalid input types' })
}

if (subject.length > 200 || body.length > 10000) {
  return res.status(400).json({ error: 'Input too long' })
}

// Sanitize
const sanitizedSubject = subject.trim()
const sanitizedBody = body.trim()
```

---

### ⚠️ 2. API Endpoint Truncates Body Silently
**Location**: `api/emails/analyze.ts` (Line 50)

**Issue**: Body is truncated to 2000 characters without warning
```typescript
Body: ${body.substring(0, 2000)}
```

**Problem**:
- User sends 10,000 character email
- Only first 2,000 analyzed
- No warning to user
- Results may be incomplete

**Fix Needed**:
- Either increase limit or warn user
- Match frontend limit (10,000)
- Or add truncation notice in response

---

### ⚠️ 3. Fallback Response Uses Unvalidated Input
**Location**: `api/emails/analyze.ts` (Lines 95-103)

**Issue**: Error fallback uses `req.body` directly without validation
```typescript
return res.json({
  subject: req.body.subject,  // Could be undefined, null, or non-string
  senderEmail: req.body.sender || 'unknown@example.com',
  senderName: req.body.sender,
  // ...
})
```

**Problem**:
- If error occurs before validation, could return invalid data
- Frontend expects strings but might get undefined/null
- Could cause frontend crashes

**Fix Needed**:
```typescript
return res.json({
  subject: String(req.body?.subject || 'Unknown'),
  senderEmail: String(req.body?.sender || 'unknown@example.com'),
  // ...
})
```

---

## Medium Priority Issues

### ⚠️ 4. No Type Validation for Analysis Response
**Location**: `api/emails/analyze.ts` (Lines 82-90)

**Issue**: Parsed JSON from Gemini is not validated before returning

**Problem**:
```typescript
const analysis = JSON.parse(jsonMatch[0]);
// No validation that analysis has required fields
return res.json({
  category: analysis.category,  // Could be undefined
  priorityScore: analysis.priorityScore,  // Could be string or undefined
  // ...
})
```

**Risk**:
- Gemini could return malformed JSON
- Missing fields cause frontend errors
- Wrong types cause display issues

**Fix Needed**: Add validation function like in `backend/src/services/gemini.service.ts`

---

### ⚠️ 5. Diagnostic Page Doesn't Handle Network Errors
**Location**: `frontend/src/pages/DiagnosticPage.tsx` (Lines 30-60)

**Issue**: Network errors caught but not properly reported

**Problem**:
```typescript
try {
  const response = await fetch(apiUrl)
  if (response.ok) {
    addResult('Backend API', 'success', 'Backend is running!')
  } else {
    addResult('Backend API', 'error', 'Backend not responding')
  }
  // ... more tests
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  addResult('System Error', 'error', message)
}
```

**Problem**:
- If first fetch fails, all subsequent tests are skipped
- Only shows one "System Error" instead of individual test failures
- Doesn't distinguish between network errors and API errors

**Fix Needed**: Wrap each test in its own try-catch

---

### ⚠️ 6. Missing Request Body Validation
**Location**: `backend/src/routes/analyze.routes.ts` (Line 9)

**Issue**: Empty line after destructuring suggests missing validation

**Problem**:
```typescript
const { sender, subject, body } = req.body


if (!subject || !body) {
```

**Risk**:
- `req.body` could be undefined if body-parser fails
- Could crash with "Cannot destructure property"

**Fix Needed**:
```typescript
if (!req.body) {
  return res.status(400).json({ error: 'Request body is required' })
}

const { sender, subject, body } = req.body
```

---

## Low Priority Issues

### 🔍 7. Inconsistent Error Response Format
**Location**: Multiple files

**Issue**: Error responses have different formats

**Examples**:
```typescript
// Format 1
{ error: 'Message' }

// Format 2
{ error: 'Message', details: 'Details' }

// Format 3 (fallback)
{ subject: '...', category: 'other', ... }
```

**Problem**: Frontend has to handle multiple error formats

**Fix**: Standardize on one format

---

### 🔍 8. No Timeout on Fetch Requests
**Location**: `frontend/src/components/NewEmailForm.tsx`, `frontend/src/pages/DiagnosticPage.tsx`

**Issue**: Fetch requests have no timeout

**Problem**:
- If API hangs, user waits forever
- No way to cancel long-running requests
- Poor UX

**Fix Needed**:
```typescript
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

try {
  const response = await fetch(url, {
    signal: controller.signal,
    // ...
  })
} finally {
  clearTimeout(timeoutId)
}
```

---

### 🔍 9. CustomCursor Component Returns Null
**Location**: `frontend/src/components/ui/CustomCursor.tsx`

**Issue**: Component exists but is disabled
```typescript
export default function CustomCursor() {
  // Disabled custom cursor to prevent interaction issues
  // Can be re-enabled with proper pointer-events handling
  return null;
}
```

**Problem**: Dead code, imported but does nothing

**Fix**: Either remove or implement properly

---

### 🔍 10. useCustomAuth Hook is Unused
**Location**: `frontend/src/hooks/useCustomAuth.ts`

**Issue**: Hook exists but auth is disabled

**Problem**:
- Returns dummy data
- No-op functions
- Confusing for developers

**Fix**: Remove file or document it's for future use

---

## Summary

### Critical (Fix Immediately): 3
1. No input sanitization on backend
2. Silent body truncation
3. Unvalidated fallback response

### Medium Priority: 3
4. No type validation for Gemini response
5. Diagnostic page error handling
6. Missing request body validation

### Low Priority: 4
7. Inconsistent error formats
8. No fetch timeouts
9. Dead CustomCursor component
10. Unused useCustomAuth hook

### Total New Issues: 10

---

## Recommended Fixes Priority

### Phase 1 (Critical - Do Now)
1. Add input validation and sanitization to backend
2. Fix body truncation or increase limit
3. Validate fallback response data

### Phase 2 (Medium - Do Soon)
4. Add Gemini response validation
5. Improve diagnostic error handling
6. Add request body check

### Phase 3 (Low - Do Later)
7. Standardize error formats
8. Add fetch timeouts
9. Remove dead code

---

## Testing After Fixes

- [ ] Send invalid input types (numbers, objects, arrays)
- [ ] Send oversized inputs (>10,000 chars)
- [ ] Test with network failures
- [ ] Test with Gemini API failures
- [ ] Test diagnostic page with backend down
- [ ] Test with malformed JSON from Gemini
- [ ] Test with missing request body
- [ ] Test timeout scenarios
