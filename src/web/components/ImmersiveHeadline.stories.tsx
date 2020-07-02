import React from 'react';
import { css } from 'emotion';

import { Display } from '@root/src/lib/display';
import { MainMedia } from './MainMedia';
import { mainMediaElements } from './ArticleHeadline.mocks';
import { ImmersiveHeadline } from './ImmersiveHeadline';

export default {
    component: ImmersiveHeadline,
    title: 'Components/ImmersiveHeadline',
};

export const Short = () => (
    <>
        <div
            className={css`
                height: 100vh;
            `}
        >
            <MainMedia
                display={Display.Immersive}
                designType="Article"
                hideCaption={true}
                elements={mainMediaElements}
                pillar="news"
            />
        </div>

        <ImmersiveHeadline
            display={Display.Immersive}
            designType="Immersive"
            tags={[]}
            author={{}}
            headline="This is how an immersive headline looks"
            sectionLabel="Section label"
            sectionUrl=""
            guardianBaseURL=""
            pillar="culture"
        />
    </>
);
Short.story = { name: 'short headline' };

export const Long = () => (
    <>
        <div
            className={css`
                height: 100vh;
            `}
        >
            <MainMedia
                display={Display.Immersive}
                designType="Article"
                hideCaption={true}
                elements={mainMediaElements}
                pillar="news"
            />
        </div>

        <ImmersiveHeadline
            display={Display.Immersive}
            designType="Immersive"
            tags={[]}
            author={{}}
            headline="This is how an immersive headline looks when the headline is really very long indeed. Long, long long. Just realy long"
            sectionLabel="Section label"
            sectionUrl=""
            guardianBaseURL=""
            pillar="news"
        />
    </>
);
Long.story = { name: 'long headline' };
