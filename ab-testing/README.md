# AB Testing
## Overview
This will be a central location for all AB tests running on the theguardian.com. The goal is to have a single source of truth for both client and server side tests.

The build and release CI steps will ensure that the tests are validated and serialized correctly before being uploaded to the Fastly dictionary.

Having both client and server side tests managed here will allow us to use the same logic (within fastly) to determine which test a user is in regardless of if it is client or server side.

Our fastly vcl code will set a cookie that can be used by client or server code to determine which test a user is in. For server side tests it will additionally add to a header that the cache will be split on. [Example implementation here](https://fiddle.fastly.dev/fiddle/96e30123)

## How build/CI step will work
### PR
- Import the ab tests
- Validate the ab tests
	- Check if there's enough space, all test variant percentages need to add up to <=100%
	- Check there aren't too many server side tests (to avoid splitting the cache too much, acceptable number TBD)
	- Validate the test expiration date is in the future and on a weekday
- Generate a visual representation of the tests and add it to the PR as a comment, with before/after?
- Also update visual in a markdown file in the repo
- Build/serialize the tests (to check it works)

### Release
- Import and validate
- Build/serialize the tests
	- Build the keys and values for the dictionary
- Uploads the key-values to the fastly dictionary
	- Requries some work to interact with the [fastly dictionary API](https://www.fastly.com/documentation/reference/api/dictionaries/dictionary-item/)
