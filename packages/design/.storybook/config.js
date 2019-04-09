import { configure } from "@storybook/react"
// automatically import all files ending in *.stories.tsx
const reqGuui = require.context(
  "@guardian/guui/components/",
  true,
  /\.stories\.tsx$/
)

const reqDC = require.context(
  "@guardian/frontend-rendering/web/components/",
  true,
  /\.stories\.tsx$/
)

function loadStories() {
  reqGuui
    .keys()
    .concat(reqDC.keys())
    .forEach(req)
}

configure(loadStories, module)
