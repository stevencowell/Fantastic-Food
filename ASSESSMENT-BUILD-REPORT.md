# Fantastic Food assessment build report

Date: 18 August 2026  
Candidate: `fantastic-food-foundation-v7-assessment`  
Predecessor: `fantastic-food-foundation-v6-folio`  
Predecessor tree SHA-256: `cbd19bcc529fb3223735fb0f4700e42e1b9a18322988f921cdffbb608f3b8b80`

## Outcome

The student-facing assessment section now contains the current WWHS Year 7 Mandatory Technology schedule and three issue-ready Fantastic Food formal notifications:

1. Task 1 — Healthy Lunchbox Project & Practical Task, 60%, raw marking criteria `/100`.
2. Task 2 — Fantastic Food Website Folio, 25%, Design Process `/15` and Evaluation `/10`.
3. Task 3 — Fantastic Food Design Knowledge Task, 15%, 45 minutes and 15 marks.

Each notice uses the required official structure: course and formal label; task identity and current status; issue/due details; weighting and outcomes; student summary; required evidence; criteria and marks; completion/submission; support and policy; source and verification information. The issue timing is `Start of term`, as confirmed by Steve on 18 August 2026.

## NESA and school-policy alignment

- Current 2026 Technology 7–8 outcome codes and descriptions are used from the WWHS handbook and current NESA syllabus.
- The three task weightings total 100%.
- Each notice includes the five categories required by the WWHS handbook: task nature, assessed outcomes, weighting, due timing and marking criteria.
- The practical, folio and design-knowledge evidence are aligned to their published outcomes and authorised course content.
- Support and adjustments are signposted without inventing a student's adjustment or a faculty process.
- Practice checks, Busy Work and the device-local My folio page are not presented as the formal task or a submission receipt.
- High-consequence absence, illness/misadventure and malpractice rules are not paraphrased; each notice links to the current WWHS handbook.

## Navigation and integration

- `Assessment` is now a permanent shared-navigation destination on root and nested routes.
- The schedule links directly to the three canonical notifications.
- Every notification links back to the schedule and course navigation.
- Resources links to the schedule, and My folio links to the current Task 2 notification.
- The former navigation integration request is closed.

## Verification

- The current 21-page Year 7 handbook was downloaded, SHA-256 checked and text-inspected; its Mandatory Technology schedule on PDF page 16 was rendered and visually inspected at full page.
- The schedule, all three notification routes and supporting routes returned successfully through the local preview.
- All 26 HTML pages in the candidate were scanned; no broken local `href` or `src` target was found.
- `assets/site.js` and `assets/assessment.js` passed JavaScript syntax checks.
- The in-app browser rendered the assessment page at a 1600 px laptop viewport and all four assessment routes at exactly 390 CSS px. No route had document-level horizontal overflow.
- Wide marking tables use a labelled, focusable sideways-scroll region at 390 px; words remain normally wrapped and the page itself remains contained.
- Shared navigation shows `Assessment` as the current destination on the schedule and nested notification pages.
- Schedule-to-notification and notification-to-schedule navigation was exercised successfully in the browser.
- Browser console checks produced zero warnings or exceptions.
- All three notifications printed as one-page A4 PDFs. Every page was rendered to PNG and visually inspected in full; headings, metadata, criteria, policy text and footers remained readable with no clipping, overlap or orphaned content.

## Release boundary

Overall verdict: **PASS for the local assessment schedule and formal-notification scope.**

The current work is local only. No commit, push, deployment or live-site change was performed.
