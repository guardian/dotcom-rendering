/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { css } from 'emotion';

import { border, background } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { SvgCheckmark } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';

import { Lines } from '@guardian/src-ed-lines';

type Props = {
    children: React.ReactNode;
    width: number;
    height: number;
};

const Container = ({
    children,
    width,
    height,
}: {
    children: React.ReactNode;
    width: number;
    height: number;
}) => (
    <div
        className={css`
            background: ${background.primary};
            width: ${width}px;
            height: ${height}px;
            border: 1px solid ${border.primary};
            margin: ${space[3]}px;
        `}
    >
        {children}
    </div>
);

const Content = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            height: calc(100% - 16px);
            justify-content: space-between;
            padding: ${space[3]}px;
        `}
    >
        {children}
    </div>
);

const Top = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

const Bottom = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

const Headline = ({
    children,
    width,
}: {
    children: React.ReactNode;
    width: number;
}) => (
    <div
        className={css`
            ${width > 300 ? headline.xsmall() : headline.xxsmall()}
        `}
    >
        {children}
    </div>
);

const Body = ({
    children,
    width,
}: {
    children: React.ReactNode;
    width: number;
}) => (
    <div
        className={css`
            ${width > 300 ? textSans.small() : textSans.xsmall()}
            a {
                ${width > 300 ? textSans.small() : textSans.xsmall()}
            }
        `}
    >
        {children}
    </div>
);

export const ClickToView = ({ children, width, height }: Props) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(true);

    if (showOverlay) {
        return (
            <Container width={width} height={height}>
                <Content>
                    <Top>
                        <Headline width={width}>
                            The colourful beak is very large
                        </Headline>
                        <Body width={width}>
                            Quaerat quaerat ex nihil autem consequatur. Velit
                            rerum at ad dignissimos aut excepturi ratione
                            excepturi. Quaerat ipsam natus totam et aut
                            distinctio eaque voluptatem.
                            <Link href="https://theguardian.com">
                                {' '}
                                Quaerat ipsam
                            </Link>
                        </Body>
                    </Top>
                    <Bottom>
                        <Button
                            priority="primary"
                            size={width > 300 ? 'small' : 'xsmall'}
                            icon={<SvgCheckmark />}
                            iconSide="left"
                            onClick={() => setShowOverlay(false)}
                        >
                            Click to view
                        </Button>
                    </Bottom>
                </Content>
                <Lines />
            </Container>
        );
    }
    return <>{children}</>;
};
