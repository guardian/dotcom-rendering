import React, { useState, useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

import { ArticleCountOptOutOverlay } from './ArticleCountOptOutOverlay';
import { OphanComponentEvent, OphanComponentType } from '../sdcShared/types';
import {
    ophanComponentEventOptOutClose,
    ophanComponentEventOptOutConfirm,
    ophanComponentEventOptOutOpen,
    ophanComponentEventOptOutView,
} from './helpers/ophan';
import { useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import {
    addArticleCountOptOutCookie,
    removeArticleCountFromLocalStorage,
} from './helpers/articleCountOptOut';

export type ArticleCountOptOutType =
    | 'epic'
    | 'banner'
    | 'investigations-moment-banner'
    | 'us-eoy-moment-banner'
    | 'global-new-year-banner'
    | 'election-au-moment-banner';
const isBanner = (type: ArticleCountOptOutType): boolean =>
    type === 'banner' ||
    type === 'investigations-moment-banner' ||
    type === 'us-eoy-moment-banner' ||
    type === 'global-new-year-banner' ||
    type === 'election-au-moment-banner';

const optOutContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
    display: inline-block;

    ${from.tablet} {
        ${!isBanner(type) ? 'position: relative;' : ''}
    }
`;

const articleCountButton = css`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px solid;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    color: inherit;
    &:focus {
        outline: none !important;
    }
`;

const overlayContainer = (type: ArticleCountOptOutType): SerializedStyles => css`
    position: absolute;
    z-index: 100;
    ${isBanner(type)
        ? css`
              top: 0px;
              left: 0px;
          `
        : css`
              left: ${space[4]}px;
              right: ${space[4]}px;
              ${isBanner(type) ? 'bottom: 21px;' : ''}
          `}
    display: block;

    ${from.tablet} {
        ${isBanner(type)
            ? css`
                  top: 10px;
                  left: 10px;
                  width: 450px;
              `
            : css`
                  width: 400px;
                  left: 0;
              `}
    }
`;

export interface OphanTracking {
    componentType: OphanComponentType;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
}

export interface ArticleCountOptOutProps {
    numArticles: number;
    nextWord: string | null;
    type: ArticleCountOptOutType;
    tracking?: OphanTracking;
}

export const ArticleCountOptOutPopup: React.FC<ArticleCountOptOutProps> = ({
    numArticles,
    nextWord,
    type,
    tracking,
}: ArticleCountOptOutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOptedOut, setHasOptedOut] = useState(false);
    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            rootMargin: '-18px',
            threshold: 0,
        },
        true,
    );

    useEffect(() => {
        if (hasBeenSeen && tracking) {
            tracking.submitComponentEvent(ophanComponentEventOptOutView(tracking.componentType));
        }
    }, [hasBeenSeen]);

    const onOptOut = (): void => {
        addArticleCountOptOutCookie();
        removeArticleCountFromLocalStorage();
        setHasOptedOut(true);
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutConfirm(tracking.componentType));
    };

    const onOpen = (): void => {
        setIsOpen(true);
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutOpen(tracking.componentType));
    };

    const onClose = (): void => {
        setIsOpen(false);
        tracking &&
            tracking.submitComponentEvent(ophanComponentEventOptOutClose(tracking.componentType));
    };

    const onToggle = (): void => (isOpen ? onClose() : onOpen());

    return (
        <div ref={setNode} css={optOutContainer(type)}>
            <button css={articleCountButton} onClick={onToggle}>
                {`${numArticles}${nextWord ? nextWord : ''}`}
            </button>
            {isOpen && (
                <div css={overlayContainer(type)}>
                    <ArticleCountOptOutOverlay
                        type={type}
                        hasOptedOut={hasOptedOut}
                        onOptOut={onOptOut}
                        onClose={onClose}
                    />
                </div>
            )}
        </div>
    );
};
