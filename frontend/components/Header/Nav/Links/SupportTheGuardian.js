// @flow

import palette, { pillars } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';
import { cx, css } from 'react-emotion';

const style = css`
    color: ${palette.neutral.header};
    font-family: ${headline};
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    width: 135px;
    display: block;
    text-align: center;
    padding-top: 6px;
    z-index: 0;
    float: left;
    :before {
        background-color: ${palette.neutral['1']};
        border-radius: 50%;
        top: -85px;
        left: 0;
        right: 0;
        padding-top: 100%;
        content: '';
        display: block;
        position: absolute;
        transition: background-color 250ms ease-out;
        z-index: -1;
    }
    :hover:before {
        background-color: ${pillars.news};
        transform: scale(1.05);
    }
`;
const SupportTheGuardian = ({
    className,
    children,
    ...props
}: {
    className?: string,
    children: React.Node,
}) => (
    <a className={cx(style, className)} {...props}>
        {children}
    </a>
);
export default SupportTheGuardian;
