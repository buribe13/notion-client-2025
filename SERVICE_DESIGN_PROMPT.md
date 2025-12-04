# Service Design Blueprint: Client Journey to Project Status Viewing

## Context & Persona

**Client Persona: Olivia Martinez**

- **Age:** 37
- **Occupation:** Marketing Manager @ mid-sized apparel brand
- **Location:** Los Angeles, CA
- **Tech Proficiency:** Medium — comfortable with Google Drive, Slack, Zoom, but avoids complex platforms
- **Key Quote:** _"Just show me what's done, what's next, and what's waiting on me — that's all I need."_

**Core Needs:**

- Easily view project milestones, files, and deadlines
- Know when it's her turn to give feedback or approval
- Avoid asking "What's the latest?"
- Feel confident that work is progressing smoothly

**Pain Points:**

- Too many tools: emails, Figma links, Notion pages, Slack messages
- Doesn't understand Notion's interface; just wants a simple summary view
- Misses deadlines because notifications get buried in emails
- Doesn't want to "sign up" or "create accounts" to track progress
- Checks updates only when prompted
- Prefers simple, visual dashboards over text-heavy reports
- Often accesses links on mobile or during meetings
- Responds faster when updates are short and actionable

---

## Service Design Blueprint: Complete Client Journey

### Phase 1: Pre-Onboarding (Before Notion Access)

**Touchpoints:**

- Initial project kickoff email/meeting
- Project proposal/contract
- First deliverable shared via email/Slack

**Client Actions:**

- Receives email with project link
- May ignore or delay clicking link
- Feels uncertain about "another tool to learn"

**Pain Points:**

- No context about what Notion is or why they need it
- Fear of complexity ("I don't have time to learn Notion")
- No clear value proposition upfront

**Opportunities:**

- **Email Template:** "Your project dashboard is ready — no sign-up required, just click to view"
- **Pre-Onboarding Video:** 30-second explainer: "This is your project hub. You'll see three things: what's done, what's next, what needs your input."
- **Alternative Entry Points:** Consider email digest, SMS notifications, or Slack integration as alternatives to direct Notion access

---

### Phase 2: Initial Notion Access (Onboarding Screens)

**Current Notion Onboarding Flow (Based on Screens):**

1. **Landing Page** (`notion.com`)

   - **Current State:** "One workspace. Zero busywork." with embedded workspace example
   - **Client Experience:** Overwhelming — sees complex interface, AI chat, multiple features
   - **Pain Point:** The "Acme Inc." example shows a full workspace, not a simple project status view
   - **Iteration Opportunity:**
     - Create a client-specific landing page: `notion.com/client/[project-id]`
     - Show a simplified preview: "Your Project Status" with three clear sections
     - Remove or hide AI chat, advanced features from initial view
     - Add a "No account needed" badge prominently

2. **Use Case Selection** ("How do you want to use Notion?")

   - **Current State:** Three options: "For work," "For personal life," "For school"
   - **Client Experience:** Confusing — none directly address "viewing project status"
   - **Pain Point:** "For work" implies active management, not passive viewing
   - **Iteration Opportunity:**
     - Add a fourth option: **"View a project I'm involved in"** or **"Client Portal"**
     - Description: "See updates, give feedback, track progress — no setup required"
     - Skip this step entirely for clients accessing via direct project link
     - Add a "Skip" or "I'm just viewing a project" option

3. **Getting Started Page** (Lessons: Workspace, Blocks, Databases, etc.)
   - **Current State:** Six lessons about Notion fundamentals
   - **Client Experience:** Intimidating — "Ready to start building?" implies active participation
   - **Pain Point:** Concepts like "blocks" and "databases" are abstract and unnecessary for viewing
   - **Iteration Opportunity:**
     - **Replace with Client-Specific Onboarding:**
       - **Lesson 1:** "Your Project Dashboard" — Show where to find status, files, deadlines
       - **Lesson 2:** "Giving Feedback" — How to comment, approve, request changes
       - **Lesson 3:** "Notifications" — How to know when your input is needed
     - Remove technical Notion concepts (blocks, databases) from client view
     - Add a "Skip tutorial" option with promise: "You can always access help later"
     - Use visual walkthroughs instead of text-heavy explanations
     - Show mobile view if client is on mobile device

---

### Phase 3: First Project Status View (Critical Moment)

**Touchpoints:**

- First successful access to project page
- Initial view of project dashboard
- First interaction (comment, approval, file download)

**Client Actions:**

- Clicks through onboarding (or skips)
- Lands on project page
- Scans for familiar information (deadlines, deliverables, status)

**Pain Points:**

- May still see Notion's full interface (sidebar, AI chat, etc.)
- Doesn't know where to look for "what's done, what's next, what needs me"
- May feel lost in Notion's block-based structure
- Mobile experience may be cluttered

**Opportunities:**

- **Simplified Client View Mode:**
  - Hide Notion sidebar (or show only "Project Status" link)
  - Remove AI chat from client view
  - Create a "Client Portal" template with three clear sections:
    1. **What's Done** (completed milestones, delivered files)
    2. **What's Next** (upcoming deadlines, work in progress)
    3. **Waiting on You** (approvals needed, feedback requested)
  - Add visual indicators (checkmarks, progress bars, color coding)
  - Include "Quick Actions" buttons: "Approve," "Request Changes," "Download Files"

---

### Phase 4: Ongoing Engagement (Regular Status Checks)

**Touchpoints:**

- Email notifications about updates
- Direct link access to project page
- Mobile access during meetings
- File downloads and approvals

**Client Actions:**

- Receives email notification
- Clicks link (often on mobile)
- Quickly scans for what needs attention
- Takes action (approves, comments, downloads)

**Pain Points:**

- Notifications get buried in email
- Mobile Notion interface may be cluttered
- Hard to find specific information quickly
- May forget to check regularly

**Opportunities:**

- **Notification Strategy:**
  - Email digest format: "3 things need your attention"
  - SMS option for urgent approvals
  - Slack integration if client uses Slack
  - Clear subject lines: "Action Required: [Project Name] — Approval Needed"
- **Mobile Optimization:**
  - Simplified mobile view with larger touch targets
  - Swipe gestures for quick actions
  - Offline access to recent updates
- **Quick Reference:**
  - "Last Updated" timestamp prominently displayed
  - "Days until deadline" countdown
  - Visual status indicators (red/yellow/green)

---

### Phase 5: Feedback & Approval (Action Required)

**Touchpoints:**

- Comment threads on deliverables
- Approval buttons/checkboxes
- File download links
- Change request forms

**Client Actions:**

- Reviews deliverable
- Provides feedback or approval
- Downloads files for reference
- Requests changes

**Pain Points:**

- May not understand how to comment in Notion
- Approval process unclear
- Files scattered across different locations
- Feedback gets lost or unclear

**Opportunities:**

- **Simplified Feedback Flow:**
  - Large, obvious "Approve" and "Request Changes" buttons
  - Inline commenting with visual cues (highlight, comment bubble)
  - Pre-filled templates: "Looks great!" or "Please change [specific item]"
  - Email confirmation after approval/feedback submitted
- **File Organization:**
  - Single "Files" section with all deliverables
  - Version history clearly labeled
  - Download all files as ZIP option
  - Preview files without downloading (images, PDFs)

---

## Service Design Blueprint: Touchpoint Map

### Frontstage (Client-Facing)

| Touchpoint                   | Current State                           | Pain Point                        | Iteration Opportunity                                        |
| ---------------------------- | --------------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| **Email Invitation**         | Generic Notion link                     | No context, feels like spam       | Personalized email with project preview, "No sign-up needed" |
| **Notion Landing Page**      | Full Notion homepage                    | Overwhelming, not client-specific | Client portal landing page with simplified preview           |
| **Use Case Selection**       | "For work/personal/school"              | No "view project" option          | Add "View a project" or skip for direct links                |
| **Getting Started Tutorial** | Notion fundamentals (blocks, databases) | Too technical, not relevant       | Client-specific tutorial: status, feedback, notifications    |
| **Project Dashboard**        | Full Notion workspace                   | Cluttered, hard to navigate       | Simplified client view with three clear sections             |
| **Mobile Experience**        | Full Notion mobile app                  | Complex, small touch targets      | Simplified mobile view, swipe gestures                       |
| **Notifications**            | Generic Notion notifications            | Buried in email, unclear          | Action-oriented emails: "3 things need your attention"       |
| **Feedback/Approval**        | Standard Notion comments                | Unclear process, hidden           | Large action buttons, inline commenting, templates           |

### Backstage (Internal/Support)

| Touchpoint               | Current State                       | Pain Point                         | Iteration Opportunity                                                  |
| ------------------------ | ----------------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| **Project Setup**        | Manual Notion page creation         | Time-consuming, inconsistent       | Template-based setup with client view mode                             |
| **Client Onboarding**    | Send link, hope they figure it out  | No guidance, high abandonment      | Automated onboarding sequence with video/walkthrough                   |
| **Update Notifications** | Manual email or Notion notification | Inconsistent, may be missed        | Automated digest emails with clear CTAs                                |
| **Support/Help**         | Generic Notion help docs            | Not client-specific, too technical | Client-specific help center: "How to approve," "How to download files" |

---

## Key Iterations for Notion Onboarding Screens

### Iteration 1: Client-Specific Landing Page

**Current:** Generic Notion homepage with "One workspace. Zero busywork."

**Iteration:**

- **Headline:** "Your Project Dashboard is Ready"
- **Subheadline:** "See what's done, what's next, and what needs your input — no account needed"
- **Visual:** Preview of simplified project dashboard (three sections)
- **CTA:** "View Project Status" (large, prominent button)
- **Trust Indicators:** "No sign-up required" | "Works on mobile" | "Takes 30 seconds"

### Iteration 2: Skip Use Case Selection for Direct Links

**Current:** "How do you want to use Notion?" with three options

**Iteration:**

- Detect if user arrived via project-specific link
- If yes: Skip this step entirely, go straight to project page
- If no: Show simplified options:
  - "View a project I'm involved in" (leads to project link input)
  - "For work" (standard Notion onboarding)
  - "For personal life" (standard Notion onboarding)

### Iteration 3: Replace Technical Tutorial with Client-Focused Guide

**Current:** Six lessons about Notion fundamentals (blocks, databases, etc.)

**Iteration:**

- **Three Simple Cards:**
  1. **"Your Project Status"** — Visual walkthrough of dashboard sections
  2. **"Giving Feedback"** — How to approve, comment, request changes (with video/GIF)
  3. **"Staying Updated"** — How notifications work, how to check back
- **"Skip Tutorial"** option prominently displayed
- **Mobile-first:** Show mobile view if accessed on mobile
- **Language:** Remove all Notion-specific terms (blocks, databases, pages)

### Iteration 4: Simplified Client View Mode

**Current:** Full Notion workspace with sidebar, AI chat, all features

**Iteration:**

- **Hide:** Sidebar (or show only "Project Status"), AI chat, advanced features
- **Show:** Three clear sections:
  - **What's Done** (green checkmarks, completed items)
  - **What's Next** (upcoming deadlines, in-progress work)
  - **Waiting on You** (red/orange indicators, approval buttons)
- **Quick Actions Bar:** "Approve All," "Download Files," "Request Changes"
- **Mobile:** Simplified layout, larger buttons, swipe gestures

---

## Service Design Principles for Client Experience

1. **Zero Friction:** No account creation, no complex setup, no learning curve
2. **Visual Over Text:** Use icons, colors, progress bars instead of long descriptions
3. **Mobile-First:** Optimize for quick checks on mobile during meetings
4. **Action-Oriented:** Every screen should have a clear next action
5. **Progressive Disclosure:** Show only what's needed, hide advanced features
6. **Familiar Patterns:** Use common UI patterns (buttons, cards, lists) instead of Notion-specific concepts
7. **Proactive Communication:** Don't wait for client to check — send clear, actionable notifications

---

## Success Metrics

**Client Comfort:**

- Time to first successful project status view (< 60 seconds)
- Onboarding completion rate (target: > 80%)
- Tutorial skip rate (acceptable if high — indicates ease of use)

**Engagement:**

- Frequency of status checks (target: 2-3x per week)
- Response time to approval requests (target: < 24 hours)
- Mobile vs. desktop usage (expect high mobile)

**Satisfaction:**

- Client feedback: "I can find what I need quickly"
- Reduction in "What's the latest?" emails
- Client retention rate (do they continue using it?)

---

## Next Steps: Service Design Execution

1. **Map Current State:** Document existing Notion onboarding flow step-by-step
2. **Create Client Journey Map:** Visualize Olivia's journey from email to first status view
3. **Design Iterations:** Create mockups/wireframes of simplified onboarding screens
4. **Prototype Client View:** Build simplified client portal template in Notion
5. **Test with Real Clients:** Get feedback from clients unfamiliar with Notion
6. **Iterate:** Refine based on pain points and feedback
7. **Document:** Create client-facing guide: "How to View Your Project Status"

---

## Questions to Explore

1. **Can we bypass Notion onboarding entirely?** (Custom domain, embedded view, email digest)
2. **What's the minimum viable client experience?** (Email-only? Simple web page? Notion lite?)
3. **How do we handle clients who refuse to use Notion?** (Alternative channels: Slack, email, SMS)
4. **What happens after project ends?** (Archive access? Export? Transition to new project?)
5. **How do we support multiple projects per client?** (Unified dashboard? Project switcher?)

---

**This blueprint should guide your service design process, focusing on making the client experience as frictionless as possible while leveraging Notion's capabilities behind the scenes.**
