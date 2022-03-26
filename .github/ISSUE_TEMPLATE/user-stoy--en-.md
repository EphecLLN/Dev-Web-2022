---
name: User Stoy [EN]
about: Add an User Story
title: "<N>: As <User>, I want <Feature> to <Goal>"
labels: 'kind: US'
assignees: ''

---

> Quotation blocs must be removed from the template.

> Text in angle brackets (like <this>) must be adequately replaced.

> <N> represents the US unique number, which differs from Github's Issues & PRs numbers.

### Description

```
- As <User>
- I want <Feature>
- To <Goal>
```

### Estimation: `None`

> This section must be completed once the US has been estimated, and `None` replaced by the estimation's value. Example: `13`.

### Developer

The developer responsible for this task is <complete name> (a.k.a. \@<pseudo>).

### Reviewer

The developer in charge of the review is <complete name> (a.k.a. \@<pseudo>).

### Prerequisites

> List of features necessary to implement this US.

- [ ] ...
- [ ] ...

### Technical Tasks

> If applicable, link to each TT the Issue describing it, or the PR implementing it. the same PR may implement several TTs but Issues should only describe one TT.

- [ ] Add acceptation criteria feature tests.
- [ ] ...
- [ ] ...

### Acceptation criteria

- [ ] ...
- [ ] ...

> Optionally, add [`cucumber.js`](https://cucumber.io/tools/cucumber-open/) tests enforcing those criteria in `/tests/integration/gherkin/us<N>.feature`.

### Mockups / Diagrams

> Add mockups and/or diagrams if they would help better understand the feature requested by this US.

![simple mockup](https://imgur.com/t/aww/30LZ2Cl)

### Divers

When publishing this US:

- [ ] Indicate this US' number in this Issue's title.
- [ ] Add a `US: <N>` label with color `#0052cc`, corresponding to this US' number. This label must be added to Issues and PRs being part of this US (sub-USes, TTs, etc.).
- [ ] Optionally add the parent US' `US: <N parent>` label.
- [ ] Move this Issue in the `Backlog` column of the Project.

When this is gets added to a Sprint:

- [ ] Estimate this US.
- [ ] Move this Issue in the `Todo` column of the Project.
- [ ] Assign a developer responsible for this US. Their role will be to keep this Issue up-to-date.
- [ ] Assign a reviewer to this US. Their role will be to ensure the quality of the implementation .

When all acceptation criteria are fulfilled and technical tasks are done:

- [ ] Ensure all TTs link either to a merged PR implementing it, or an Issue describing it closed by a merged PR.
- [ ] Close this issue.
- [ ] Move this issue in the `Archive` column of the Project.
