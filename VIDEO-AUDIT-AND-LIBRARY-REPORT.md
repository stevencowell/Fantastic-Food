# Fantastic Food video audit and library build

**Skill:** #10 Video Audit and Library Build  
**Build date:** 18 August 2026  
**Build:** `fantastic-food-foundation-v5-videos`  
**Source candidate:** `fantastic-food-foundation-v4-graphics`  
**Publication boundary:** Local only. No commit, push, deployment or live-site change was authorised.

## Verdict

**PASS — local video-learning scope.**

The source candidate did not meet the video-network standard. It had two video references for 15 named theory sections, 13 explicit gaps, a two-link outbound list rather than a course-owned library, and an incomplete player with no Stop/Close, Escape or focus-return behaviour.

The repaired candidate now has one distinct, reviewed video for each of the 15 named theory sections. Module placements and the course library use the same operational manifest.

## Coverage

| Module | Named theory sections | Matched adjacent videos | Library cards | Result |
|---|---:|---:|---:|---|
| 1 · Kitchen ready | 3 | 3 | 3 | PASS |
| 2 · Recipes and nutrients | 3 | 3 | 3 | PASS |
| 3 · Workflow and healthy choices | 3 | 3 | 3 | PASS |
| 4 · Lunchbox design | 3 | 3 | 3 | PASS |
| 5 · Evaluate and complete | 3 | 3 | 3 | PASS |
| **Total** | **15** | **15** | **15** | **PASS** |

There are 15 unique YouTube IDs and no repeated generic filler clip.

## Video set

| Section | Video | Channel/source | Teaching connection |
|---|---|---|---|
| M1-S1 | Four Golden Rules of food safety | NSWFoodAuthority | Practical food-safety habits before kitchen work |
| M1-S2 | How Does Cross-Contamination Happen? | USDAFoodSafety | Contamination pathways and personal-hygiene decisions |
| M1-S3 | Clean as you go and deep cleaning | Food Consulting Services | Ongoing cleaning compared with end-of-task cleaning |
| M2-S1 | How to Read a Recipe \| Jessi Holden, MS, RDN | The Kitchen Invitation | Complete recipe read-through and method sequence |
| M2-S2 | How to measure dry and liquid ingredients | Citytv | Correct measuring tools, technique and checking |
| M2-S3 | nutrition- Six essential nutrients | RGMG Education | Six nutrient groups and broad body roles |
| M3-S1 | Master the Art of Mise En Place: Organize Like a Pro | WebstaurantStore | Preparation and efficient practical workflow |
| M3-S2 | Five Food Groups | Foodbank SA & NT | Australian Guide to Healthy Eating food groups and variety |
| M3-S3 | Understanding Criteria and Constraints | Chorus Educational K-12 Content | Purposeful recipe change within real limits |
| M4-S1 | What is SWAP IT? | Good For Kids | Realistic Australian school-lunchbox improvement |
| M4-S2 | Cooking Techniques: Converting Recipe Yields | ILExtensionHMRS | Planned serves, quantities and accurate food orders |
| M4-S3 | How to Evaluate Design Solutions | Chorus Educational K-12 Content | Criteria, evidence and improvement for redesign |
| M5-S1 | Dietary Fibre: The Most Important Nutrient? Best Fiber Foods? | Free Animated Education | Fibre, digestion and the supporting role of water |
| M5-S2 | How to Write a Time Plan \|\| Food, Nutrition and Health \|\| Eps 3 | The Foods Teacher | Ordered steps, overlap, checks and clean-up time |
| M5-S3 | Principles of Human-Centered Design (Don Norman) | NNgroup | Audience needs and evidence-based evaluation |

The old `xyQY8a-ng6g` “How the food you eat affects your brain” reference was removed from M4-S3 because it did not teach criteria-based food redesign or evaluation. The Drive-only kitchen-safety link was replaced in the public course player by the section-specific NSW Food Authority clip so students receive a validated public title, channel, thumbnail, embed and fallback.

## Student experience brought into line

- Every named theory section now has a directly adjacent video card.
- Every card states the exact title and channel/source.
- Every card includes a section-specific purpose and **Watch for** prompt.
- Official YouTube thumbnails are used as the deliberate play surface.
- No YouTube iframe exists before the student presses Play.
- Playback uses `youtube-nocookie.com` with a responsive 16:9 frame.
- **Close / stop video** removes the iframe and stops playback.
- Escape closes an active player and returns focus to its Play control.
- Play controls are semantic buttons with explicit Enter and Space handling.
- **Open in YouTube** remains visible as the school-network fallback.
- The course-owned library groups three cards under each of the five modules.
- Each library card deep-links back to its matched theory section.
- Module cards link to their exact card in the video library.
- The existing **Video learning** navigation label and nested/root routes were preserved.
- Print CSS removes remote media and controls while retaining useful video titles and prompts.

## Validation evidence

### Identity and availability

- 15/15 IDs returned HTTP 200 from YouTube oEmbed on 18 August 2026.
- 15/15 privacy-enhanced embed routes returned HTTP 200.
- oEmbed titles and channel names match the machine-readable manifest.
- 15/15 official thumbnails loaded with a non-zero natural width in the rendered library.
- Candidate fit was assessed from the section teaching purpose, the video description/content summary and channel authority; established network-approved clips were reused only where the Fantastic Food section independently justified the match.

### Static and route checks

- 15 operational manifest entries; 15 audit-manifest entries; zero parity failures.
- 15 unique section IDs and 15 unique YouTube IDs.
- All five module pages load the shared video data and player scripts.
- JavaScript syntax passed for all seven site-owned asset scripts.
- HTTP 200: course home, video library and all five module routes.
- No unresolved Chicken Wrap/muffin choice, assessment time/date or weighting was introduced.

### Rendered desktop checks

- Video library: 15 cards, three-column desktop grid, no initial iframe.
- All thumbnails rendered; no broken image found.
- Play created one privacy-enhanced iframe and one Close/Stop control.
- Close removed the iframe and restored focus to Play.
- Escape removed the iframe and restored focus to Play.
- No horizontal document overflow.
- No browser console errors or warnings.

### Rendered exact-390-CSS-pixel checks

- Video library changed to a one-column card layout.
- 15/15 thumbnails loaded; 15/15 cards remained inside the content width.
- All five module pages showed three contained adjacent video cards.
- Active iframe remained inside its card and did not widen the document.
- Close/Stop remained available; Escape removed the iframe and restored focus.
- No horizontal document overflow.

The in-app browser's synthetic Enter/Space action did not reproduce activation despite a focused native button. The implemented control remains a real `<button>` and includes an explicit Enter/Space handler; click, Escape, Close and focus restoration were rendered and exercised successfully. This tool limitation is recorded rather than hidden.

## Authoritative files

- `assets/video-data.js` — single operational video data source
- `assets/video-player.js` — shared privacy-enhanced player and focus behaviour
- `assets/videos.js` — library grouping and rendering
- `youtube-manifest.json` — machine-readable audit record
- `videos.html` — course-owned video library route
- `assets/module.js` — adjacent section integration
- `assets/site.css` — shared desktop, 390 px and print presentation

## Boundaries

- Assessment and administrative conflicts remain excluded.
- No student names, emails, submissions, grades or identifiable student media were added.
- Availability was checked on 18 August 2026; future removal or school filtering is handled by the visible YouTube fallback and should be rechecked before publication.
- This is a local candidate only. Publication still requires Steve's explicit authority.
