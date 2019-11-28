import React from 'react';

import { Flex } from '@root/src/web/components/Flex';
import { ArticleRight } from '@root/src/web/components/ArticleRight';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { Section } from '@frontend/web/components/Section';

import { ArticleLeft } from './ArticleLeft';

/* tslint:disable */
export default {
    component: ArticleLeft,
    title: 'Components/ArticleLeft',
};
/* tslint:enable */

export const PartialRightBorder = () => {
    return (
        <Section>
            <Flex>
                <ArticleLeft
                    showPartialRightBorder={true}
                    showRightBorder={false}
                >
                    <>
                        The border to my right is only partial, it does not
                        stretch the whole height
                    </>
                </ArticleLeft>
                <ArticleContainer>
                    <img
                        src="https://www.fillmurray.com/g/300/450"
                        alt="Bill"
                    />
                </ArticleContainer>
                <ArticleRight>
                    <>Right column content</>
                </ArticleRight>
            </Flex>
        </Section>
    );
};
PartialRightBorder.story = { name: 'Partial right border' };

export const RightBorder = () => {
    return (
        <Section>
            <Flex>
                <ArticleLeft>
                    <>The border to my right should stretch the whole height</>
                </ArticleLeft>
                <ArticleContainer>
                    <img
                        src="https://www.fillmurray.com/g/600/500"
                        alt="Bill"
                    />
                </ArticleContainer>
                <ArticleRight>
                    <>Right column content</>
                </ArticleRight>
            </Flex>
        </Section>
    );
};
RightBorder.story = { name: 'Full right border' };
