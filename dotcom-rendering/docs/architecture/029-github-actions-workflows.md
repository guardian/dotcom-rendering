# GitHub actions workflow

## Status: Proposed

## Context

We use GitHub actions to test our code. We also defer testing and deploying to Teamcity.

### Current setup - running each job as a workflow

We run each job as a single [workflow](https://docs.github.com/en/actions/using-workflows/about-workflows) with 1 job. This is great for ease of adding a new action and having it run.

#### Issues

- **running dependant jobs** The current setup makes it hard to define [dependant jobs](https://docs.github.com/en/actions/using-workflows/about-workflows#creating-dependent-jobs), e.g. `test` => `deploy`.

- **calling workflows from external services:** The current setup makes running a suite of jobs from another workflow or service tricky. e.g. calling a test suit from frontend on API changes.

- **standard approach:** Creating workflows made of jobs and steps is more similar to [how they are suggested they are used](https://github.com/actions/starter-workflows/tree/main/ci). [The npm-publish example](https://github.com/actions/starter-workflows/blob/main/ci/npm-publish.yml) is easy to see this.


## Decision

We will define and craete workflows composed of dependable jobs (`test, deploy: needs: test`) and steps.


## Alternatives

We could use the [`workflow_run`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run) trigger to trigger a `deploy` workflow rather than `needs`.

This doesn't isn't fit for purpose as
> If you specify multiple `workflows` for the `workflow_run` event, only one of the workflows needs to run

We would need to ensure that they are all successful, which is what `needs` already does.

e.g.
```yml
# This becomes hard to manage, and as we need to remember to keep this list up to date
# And we'd need a ensure they're all successful before deploying
name: deploy.yml
on:
	workflow_run:
		workflows: [Build check, Build analyser, Chromatic, ...]
		types: [completed]
jobs:
	check-success:
		steps:
			- run: # check all are green
	deploy:
		needs: check-success
		run: deploy
```

