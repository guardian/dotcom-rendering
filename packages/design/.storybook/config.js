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
  reqGuui.keys().forEach(reqGuui)
  reqDC.keys().forEach(reqDC)
}

configure(loadStories, module)
