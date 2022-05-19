# Values

## Approachable

The project should have as few barriers as possible for anyone to work on it, including designers, UX, people outside of the Guardian and more.

### Lines in the sand

#### `.env` shouldn't be required

While we use a `.env` file for configuration and secrets for `dotcom-rendering` to function correctly in `PROD`, not having it shouldn't block someone from running the project altogether.

If you're considering adding something to the `.env` file - please consult with the dotcom team first. Wherever possible seeking solutions like passing the data from [Frontend](https://github.com/guardian/frontend) is preferred.

e.g. [Fallback for images salt](#) (In development so not linked to)
