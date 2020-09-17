import React from 'react';
import { css } from 'emotion';

import { Display } from '@root/src/lib/display';
import { YoutubeEmbedBlockComponent } from './YoutubeEmbedBlockComponent';

export default {
    component: YoutubeEmbedBlockComponent,
    title: 'Components/YoutubeEmbedComponent',
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            max-width: 620px;
            padding: 20px;
        `}
    >
        {children}
    </div>
);

const overrideImage =
    'https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e';

export const standardAspectRatio = () => {
    return (
        <Container>
            <p>abc</p>
            <YoutubeEmbedBlockComponent
                embedUrl="https://www.youtube-nocookie.com/embed/79fzeNUqQbQ?wmode=opaque&feature=oembed"
                pillar="news"
                height={259}
                width={460}
                caption="blah"
                credit=""
                title=""
                display={Display.Standard}
                designType="Article"
                expired={false}
                overrideImage={overrideImage}
            />
            <p>abc</p>
        </Container>
    );
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };

export const standardAspectRatioError = () => {
    return (
        <Container>
            <p>abc</p>
            <YoutubeEmbedBlockComponent
                embedUrl="https://www.youtube.com/embed/7z3iv-HkI7o?wmode=opaque&feature=oembed"
                pillar="news"
                height={259}
                width={460}
                caption="blah"
                credit=""
                title=""
                display={Display.Standard}
                designType="Article"
                expired={true}
                overrideImage={overrideImage}
            />
            <p>abc</p>
        </Container>
    );
};
standardAspectRatioError.story = {
    name: 'with standard aspect ratio and error',
};
