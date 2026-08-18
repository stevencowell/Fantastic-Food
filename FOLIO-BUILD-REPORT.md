# Fantastic Food folio build report

- Build: `fantastic-food-foundation-v6-folio`
- Date: 18 August 2026
- Release state: Local-only
- Verdict: **PASS**

## Outcome

The former `My folio` page was only a list of saved responses and did not meet the course-network standard. It has been replaced with an eight-stage Year 7 learning-evidence folio that is source-bound, visually coherent, device-local, recoverable and printable.

This device-local folio now links to the current Task 2 Fantastic Food Website Folio notification. It remains a planning and learning-evidence tool: the assessed Google Sites link or PowerPoint file is submitted through the Google Classroom assessment post, and a local backup is not a submission receipt.

## Network benchmark review

Three live folios were inspected before building:

- Riv Burger supplied the clear device-local, backup, print and module-return pattern, but its thirty-response dump was too large for this course.
- Lunch Is Packed supplied a useful progress summary and evidence labels, but its textile assessment content was not transferable.
- Desk Tidy supplied the strongest evidence-card model: one action, why it matters, evidence to collect, visual support, caption, photo, progress and backup.

Fantastic Food therefore uses eight curated evidence stages rather than reproducing all fifteen theory responses.

## Student folio structure

1. Kitchen-ready routine.
2. Recipe and measuring check.
3. Nutrition connections.
4. Practical workflow plan.
5. Food solution: user and criteria.
6. Organisation and food order.
7. Practical evidence and reflection.
8. Communicate and evaluate.

Each stage has:

- one clear action;
- a compact three-step visual;
- an optional detailed, source-bound course diagram;
- why the evidence matters;
- the evidence to collect;
- one focused written response;
- an evidence note or photo caption;
- an optional privacy-safe image slot;
- sentence starters;
- a return link to the relevant module;
- an honest `Not started`, `Started`, `Evidence added` or `Ready for teacher review` state.

## Saving and privacy

- Written work autosaves under a versioned Fantastic Food folio key.
- Images are stored as blobs in a dedicated IndexedDB database, not in localStorage.
- A JSON backup contains both text and images and can be restored only after schema validation and confirmation.
- Invalid backups are rejected without replacing current work.
- First-use migration can bring compatible guided responses into the new folio without altering old evidence.
- Reset owns only the new folio key and photo database. Module and activity evidence is outside its reset scope.
- Every image slot tells students to exclude faces, names, email addresses, school IDs and submission screens.

## Verification

- Default laptop view: eight cards, eight visuals, sixteen text areas, no horizontal overflow.
- Exact 390 CSS px: single-column cards and visuals, contained controls, no horizontal overflow.
- Autosave, reload persistence, progress thresholds and ready-state invalidation passed.
- Image add, preview and reload persistence passed using a non-identifying local QA image.
- Backup creation included the saved image.
- Invalid restore was rejected and a valid restore reached its confirmation gate without replacing work.
- Ten named site routes and eight visual assets returned HTTP 200.
- Print rendering produced ten A4 pages: two overview pages and one complete page for each evidence stage. All ten rendered pages were visually inspected with no clipping or overlap.
- The formal assessment conflict terms prohibited by the source contract do not appear in the folio implementation.

The destructive completion of `Remove image` and `Reset this folio` was not invoked during QA. Their confirmation and owned-data code paths were inspected; this avoids deleting local browser data during an otherwise non-destructive build review.

## Local handoff

Open `folio.html` in the v6 candidate to review the student experience. No repository, Google Site or live website was changed.
