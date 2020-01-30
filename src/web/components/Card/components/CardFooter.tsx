import React from 'react';
import { css } from 'emotion';

import { GuardianLines } from '@frontend/web/components/GuardianLines';

import { LinesWrapper } from './LinesWrapper';

type Props = {
    designType: DesignType;
    age?: JSX.Element;
    mediaMeta?: JSX.Element;
    commentCount?: JSX.Element;
};

const spaceBetween = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const flexEnd = css`
    display: flex;
    justify-content: flex-end;
`;

export const CardFooter = ({
    designType,
    age,
    mediaMeta,
    commentCount,
}: Props) => {
    if (designType === 'Comment') {
        return (
            <footer className={spaceBetween}>
                {age}
                <LinesWrapper>
                    <GuardianLines pillar="opinion" count={4} />
                </LinesWrapper>
                {commentCount}
            </footer>
        );
    }

    if (designType === 'Media') {
        return (
            <footer className={spaceBetween}>
                {mediaMeta}
                {/* Show age if we have it otherwise try for commentCount */}
                {age || commentCount}
            </footer>
        );
    }

    if (age) {
        return (
            <footer className={spaceBetween}>
                {age}
                {commentCount}
            </footer>
        );
    }

    return (
        <footer className={flexEnd}>
            <>{commentCount}</>
        </footer>
    );
};
