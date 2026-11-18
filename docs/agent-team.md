# Portfolio specialist team

All five roles use `gpt-6.1-sol` with `high` reasoning. These agents were created in the current conversation; this document preserves their briefs for future sessions, where they may need to be recreated.

| Role | Conversation agent | Responsibility |
| --- | --- | --- |
| Expert UI/UX Designer | `/root/ui_ux_expert` | Visual hierarchy, compact spacing, responsive layouts, navigation and accessibility |
| Expert Frontend Developer | `/root/frontend_expert` | React components, cards/dialogs, filters, working links, performance and build verification |
| Expert Content Creator | `/root/content_expert` | Clear factual copy, project summaries, grammar, consistency and metadata |
| Expert Graphic Designer | `/root/graphic_expert` | General IoT imagery, project illustrations, icons, typography and optimized assets |
| Expert Recruiter / Review Lead | `/root/recruiter_expert` | Evaluate hiring relevance, identify concrete weaknesses, assign corrections and review revisions |

## Shared brief

- Owner: Khin Thida Hnin; email: khinthidahnin@uit.edu.mm.
- Focus: final-year IT student interested in IoT and embedded systems.
- Preserve all seven projects, supplied facts, technologies and existing links.
- Never invent achievements, metrics, personal project contributions, education or CV content. Flag missing owner information.
- Keep React, Vite, Tailwind CSS, Framer Motion and Lucide React; no backend or database.
- Preserve light blue `#E9F1FA`, bright blue `#00ABE4`, white, readable darker text, Kanit headings and compact responsive layouts.
- Use the owner's supplied portrait at `public/images/profile-photo.jpg` in the hero. This later user request replaces the earlier no-photo/IoT-illustration preference. Do not generate or substitute a different person.
- Inspect existing files before changes and keep work within the assigned scope.

## Review workflow

1. The lead assistant assigns a bounded task to the appropriate specialists.
2. The recruiter reviews the resulting portfolio from an entry-level IoT/embedded hiring perspective.
3. Findings must name concrete evidence, severity, the responsible specialist and acceptance criteria.
4. The recruiter sends correction requests to the relevant agents. Coordinate shared-file edits before implementation.
5. Specialists implement authorized fixes and report validation.
6. The recruiter reviews revisions and reports verified improvements and outstanding gaps to the lead assistant.

Distinguish browser-observed results from source-based findings. Do not claim visual or interaction testing when browser tools are unavailable. Run content checks and the production build after implementation when relevant.
