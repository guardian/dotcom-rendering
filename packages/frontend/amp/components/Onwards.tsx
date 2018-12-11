import React from 'react';

import { Section, Tag, tag } from './primitives/moustache';
import { serif } from '@guardian/pasteup/fonts';

import VideoIcon from '@guardian/pasteup/icons/video-icon.svg';
import Camera from '@guardian/pasteup/icons/camera.svg';
import VolumeHigh from '@guardian/pasteup/icons/volume-high.svg';
import Quote from '@guardian/pasteup/icons/quote.svg';
import Clock from '@guardian/pasteup/icons/clock.svg';

import { css } from 'emotion';

const inner = css`
    padding-top: 3px;
    overflow: hidden;
    position: relative;
    margin-top: 24px;
`;
const header = css`
    font-family: ${serif.headline};

    font-weight: 500;
    position: relative;
    font-size: 22px;
    line-height: 28px;
`;
const item = css`
    background-color: #ededed;
    border-top: 1px solid #dcdcdc;
    padding-left: 126px;
    position: relative;
    height: 75px;
    margin-bottom: 12px;
    overflow: hidden;
`;
const imageContainer = css`
    position: absolute;

    left: 0;
`;
const itemContent = css`
    min-height: 60px;
    padding: 0 5px;
    position: relative;
    overflow: hidden;
`;
const link = css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
    text-indent: 200%;
    white-space: nowrap;
    background: transparent;
`;
const headline = css`
    padding: 0;

    margin: 1px 0 0;

    font-family: ${serif.headline};
    font-weight: 500;
    word-wrap: break-word;

    font-size: 14px;

    line-height: 18px;
`;
export const Onwards: React.SFC<{ path: string }> = ({ path }) => (
    <amp-list
        layout="fixed-height"
        height="493"
        src={path}
        credentials="include"
    >
        <template type="amp-mustache">
            <Section name="showContent">
                <div className={inner}>
                    <div className={header}>
                        <Tag name="displayName" />
                    </div>
                    <Section name="description">
                        {/*  Don't show if there is not description WHAT STYLES HERE */}
                        <div>
                            <Tag name="description" />
                        </div>
                    </Section>

                    <Section name="content">
                        <Section name="headline">
                            {/* Don't show if headline is empty */}
                            <div className={item}>
                                <div className={imageContainer}>
                                    <amp-img
                                        src={tag('thumbnail')}
                                        layout="fixed"
                                        width="126"
                                        height="75"
                                    />
                                </div>
                                <div className={itemContent}>
                                    <div>
                                        <h2 className={headline}>
                                            <span>
                                                <Section name="isVideo">
                                                    <VideoIcon />
                                                </Section>
                                                <Section name="isGallery">
                                                    <Camera />
                                                </Section>
                                                <Section name="isAudio">
                                                    <VolumeHigh />
                                                </Section>
                                                <Section name="isComment">
                                                    <Quote />
                                                </Section>
                                            </span>
                                            <Tag name="headline" />
                                        </h2>
                                        <Section name="isComment">
                                            <div>
                                                <Tag name="byline" />
                                            </div>
                                        </Section>
                                    </div>
                                    <aside>
                                        <time>
                                            <Section name="showWebPublicationDate">
                                                <Clock />
                                                <span>
                                                    <span>Published: </span>
                                                    <Tag name="webPublicationDate" />
                                                </span>
                                            </Section>
                                        </time>
                                    </aside>
                                </div>
                            </div>
                            <a
                                className={link}
                                // tslint:disable-line:react-a11y-anchors
                                href={`https://www.theguardian.com${tag(
                                    'url',
                                )}`}
                            >
                                <Tag name="headline" />
                            </a>
                        </Section>
                    </Section>
                </div>
            </Section>
        </template>
        {/* <div overflow={true}>
            <Plus />
        </div> */}
    </amp-list>
);
