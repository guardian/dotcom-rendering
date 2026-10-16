What does this change?
Reinstates the rendering of 'Storylines' content on tag pages, if passed as part of the data model from Frontend, behind a 0% test. This functionality was removed previously in #15757.

I've tried to keep things as similar as possible to the original implementation, but there are a couple of changes:

Some were necessary to update the code to reflect changes since the original implementation was removed, but I've tried to make the changes as minimal as possible.
I also decided to make isStorylines a mandatory prop on Card and its variations, to make it easier to trace the prop drilling through the app. Making it mandatory has increased the number of files touched, but in the new files it's only a single line to explicitly set it to false, e.g. for dotcom-rendering/src/components/StaticFeatureTwo.tsx.
For the new test we're only showing the Storylines component for larger screens. Because of this, I've removed the ability for Storylines to render pagination if it's the last container on the page, because that could lead to missing pagination for mobile breakpoints where the container isn't rendered. The drawback is that if there is only one other container on the page then the pagination will be rendered above the Storylines container. However, this seems like a very unlikely case in reality and it has the benefits: a) that pagination is always rendered if needed, and b) we don't need custom logic for pagination in the Storylines case anymore.
Dependencies
Builds on Use 'named props' for decideSplashCardProperties #16878 (merged already)
Goes alongside a change to Frontend to send the Storylines data through to DCR: Reinstate Storylines rendering for tag pages frontend#29303
I've tested the current DCR branch locally against Frontend main, and vice versa, and no problems arose. The Storylines data is optional in the DCR data model, so they can be merged in any order.
Why?
We are running a new test of the Storylines component.

How has this change been tested?
Deployed to CODE alongside Reinstate Storylines rendering for tag pages frontend#29303
Opted in to the ab test and checked that the Storylines component renders as expected for the appropriate tags, and tag pages render as normal for non-participating tags.
Tested locally against Frontend main; all works as expected.
Reviewed the Storybook story for this component.
Screenshots
image
