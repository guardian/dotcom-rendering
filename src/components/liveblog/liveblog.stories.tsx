import React from 'react';
import LiveblogLoadMore from './loadMore';
import { Pillar } from 'pillar';
import { withKnobs, select } from "@storybook/addon-knobs";

export default { title: 'Liveblog', decorators: [withKnobs] };

export const LoadMore = (): JSX.Element => <LiveblogLoadMore
  pillar={select(
    "Pillar",
    [ Pillar.news, Pillar.opinion, Pillar.sport, Pillar.arts, Pillar.lifestyle ],
    Pillar.news,
  )}
/>
