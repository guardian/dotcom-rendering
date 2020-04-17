import React from 'react';
import LiveblogLoadMore from './loadMore';
import { Pillar } from 'format';
import { withKnobs, select } from "@storybook/addon-knobs";

export default { title: 'Liveblog', decorators: [withKnobs] };

export const LoadMore = (): JSX.Element => <LiveblogLoadMore
  pillar={select(
    "Pillar",
    [ Pillar.News, Pillar.Opinion, Pillar.Sport, Pillar.Culture, Pillar.Lifestyle ],
    Pillar.News,
  )}
  onLoadMore={(): Promise<void>=>Promise.resolve()}
/>
