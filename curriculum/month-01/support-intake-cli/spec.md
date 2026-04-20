# Support Triage CLI - Product Specification

## Product Goal

Provide a terminal workflow that turns one noisy support issue into a clean, reviewable record.

## Target User

- support engineer
- apprentice practicing terminal workflows

## Final Experience

The user runs a command, answers a short set of prompts, and receives:

- issue title
- short summary
- priority suggestion
- tags or category
- saved Markdown or JSON output

The first version of the product should handle a single intake at a time. No list view, no search, no user accounts.

## Product Surface

- `triage` starts the intake flow
- `triage review` shows the generated draft before export
- `triage export --format md|json` writes the final record

## Workflow

1. Run `triage`.
2. Enter the issue description, severity, and environment.
3. Generate the AI summary.
4. Review and edit the draft if needed.
5. Export the final record to one file.

## Core Features

- prompt for problem description, severity, and environment
- AI summary generation
- review step before saving
- local persistence to a file
- original report preserved alongside the summary
- one explicit export path, either Markdown or JSON

## AI Integration

- AI drafts the title and summary
- AI suggests tags
- human verification is required before the output is accepted

## Out Of Scope

- ticket assignment
- multi-user collaboration
- database storage
- analytics
- email or SMS sending

## Success Criteria

- the CLI runs on a fresh machine
- the summary is useful and readable
- the user can explain where AI helped and where it was checked
- the product can be completed in one sitting by a learner
