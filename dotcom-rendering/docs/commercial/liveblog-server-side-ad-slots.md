# Liveblog server side inserted ad slots

## Background

- Inline ad slots on liveblog pages used to be inserted client-side. This process is reliant on Spacefinder, which has a number of issues:
	- It is the source of many bugs and can have unexpected side-effects.
	- It is hard to debug. It was built a long time ago and isn't very intuitive.
- We can ship less client-side javascript to the browser by running the logic to place inline ad slots server-side. This should result in an improved user experience
- Spacefinder uses the heights of the blocks of content to decide where to insert an ad slot. On the server, we do not have this information.

## Strategy

- Insert ad slots server side by estimating the size of the content blocks from the elements that make up these blocks and use these to choose where to place ad slots.
- We ideally want a gap of between 1.5 and 2 viewports in height between any pair of inline ad slots. This frequency provides a good balance between user experience and revenue.
- We don't have to know _exactly_ how tall an element will be to be able to insert ad slots. The acceptable margin of error is reasonably high. This is tested within the commercial tools repo to ensure that this strategy is fit for purpose. This is the liveblog-ad-ratio-test folder in the commercial-tools repo.
