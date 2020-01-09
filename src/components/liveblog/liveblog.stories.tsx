import React from 'react';
import LiveblogLoadMore from './loadMore';
import { pillarColours, Pillar } from 'pillar';
import { withKnobs, object } from "@storybook/addon-knobs";

export default { title: 'Liveblog', decorators: [withKnobs] };

export const LoadMore = (): JSX.Element => <LiveblogLoadMore
  pillarStyles={object("Pillar Styles", pillarColours[Pillar.news])}
/>
