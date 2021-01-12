/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

import { ContainerLayout } from './ContainerLayout';
import { Figure } from './Figure';

import { ClickToView } from './ClickToView';

export default {
    component: ClickToView,
    title: 'Components/ClickToView',
};

export const DefaultStory = () => {
    return (
        <ContainerLayout
            sideBorders={true}
            title="Click To View"
            centralBorder="full"
        >
            <div
                className={css`
                    max-width: 620px;
                    clear: left;

                    p {
                        ${textSans.medium()};
                        font-weight: 300;
                        margin-top: 0;
                        margin-bottom: 8px;
                    }
                `}
            >
                <p>
                    Lo-fi scenester ethical readymade. Hoodie marfa palo santo
                    fixie hot chicken art party hell of thundercats skateboard
                    synth. Skateboard thundercats hoodie pitchfork neutra
                    pinterest kitsch literally polaroid irony mumblecore next
                    level. Truffaut street art edison bulb, banh mi cliche
                    post-ironic mixtape
                </p>
                <Figure role="inline">
                    <ClickToView width={620} height={400} onAccept={() => {}}>
                        <img src="http://placekitten.com/g/620/400" alt="" />
                    </ClickToView>
                </Figure>
                <p>
                    Truffaut deep v before they sold out shoreditch. Enamel pin
                    venmo gochujang shaman +1 try-hard keffiyeh freegan godard
                    air plant humblebrag brooklyn meggings.
                </p>
            </div>
        </ContainerLayout>
    );
};
DefaultStory.story = { name: 'default' };

export const SmallStory = () => {
    return (
        <ContainerLayout
            sideBorders={true}
            title="Click To View"
            centralBorder="full"
        >
            <div
                className={css`
                    max-width: 620px;
                    clear: left;

                    p {
                        ${textSans.medium()};
                        font-weight: 300;
                        margin-top: 0;
                        margin-bottom: 8px;
                    }
                `}
            >
                <p>
                    Lo-fi scenester ethical readymade. Hoodie marfa palo santo
                    fixie hot chicken art party hell of thundercats skateboard
                    synth. Skateboard thundercats hoodie pitchfork neutra
                    pinterest kitsch literally polaroid irony mumblecore next
                    level. Truffaut street art edison bulb, banh mi cliche
                    post-ironic mixtape
                </p>
                <Figure role="supporting">
                    <ClickToView width={380} height={300} onAccept={() => {}}>
                        <img src="http://placekitten.com/g/380/300" alt="" />
                    </ClickToView>
                </Figure>
                <p>
                    Lo-fi scenester ethical readymade. Hoodie marfa palo santo
                    fixie hot chicken art party hell of thundercats skateboard
                    synth. Skateboard thundercats hoodie pitchfork neutra
                    pinterest kitsch literally polaroid irony mumblecore next
                    level. Truffaut street art edison bulb, banh mi cliche
                    post-ironic mixtape
                </p>
                <p>
                    Lo-fi scenester ethical readymade. Hoodie marfa palo santo
                    fixie hot chicken art party hell of thundercats skateboard
                    synth. Skateboard thundercats hoodie pitchfork neutra
                    pinterest kitsch literally polaroid irony mumblecore next
                    level. Truffaut street art edison bulb, banh mi cliche
                    post-ironic mixtape
                </p>
                <p>
                    Lo-fi scenester ethical readymade. Hoodie marfa palo santo
                    fixie hot chicken art party hell of thundercats skateboard
                    synth. Skateboard thundercats hoodie pitchfork neutra
                    pinterest kitsch literally polaroid irony mumblecore next
                    level. Truffaut street art edison bulb, banh mi cliche
                    post-ironic mixtape
                </p>
            </div>
        </ContainerLayout>
    );
};
SmallStory.story = { name: 'small' };
