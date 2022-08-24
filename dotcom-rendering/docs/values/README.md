# Values

## Approachable

The project should have as few barriers as possible for anyone to work on it, including designers, UX, people outside of the Guardian and more.

### Lines in the sand

#### `.env` shouldn't be required

While we use a `.env` file for configuration and secrets for `dotcom-rendering` to function correctly in `PROD`, not having it shouldn't block someone from running the project locally.

If you're considering adding something to the `.env` file - please consult with the dotcom team first. Wherever possible seeking solutions like passing the data from [Frontend](https://github.com/guardian/frontend) is preferred.

e.g. [Fallback for images salt](#) (In development so not linked to)

## Performant

### Lines in the sand

#### Non-critical scripts will not block rendering

Any script added to the website that is not critical to rendering must must not block first paint or cause a dramatic repaint. Such scripts should have an `async` or `defer` attribute, be loaded programmatically from within our application JavaScript, or be added at the bottom of the document body.


## Simple

The dotcom team ensures that our codebase is simple to work on, regardless of what team you’re on or the problem you’re trying to solve


### Lines in the sand


<!--
Todo:

## Maintainable

## Reliable

## Transparent

## Open
 -->
