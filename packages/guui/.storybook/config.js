import { configure } from '@storybook/react';
// automatically import all files ending in *.stories.tsx
const req = require.context('../components', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);