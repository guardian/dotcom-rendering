// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, textSans } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { OptionKind } from '../../../vendor/@guardian/types/index';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';
import { getHref } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const captionElement =
	(format: ArticleFormat) =>
	// eslint-disable-next-line react/display-name -- not a normal React component
	(node: Node, key: number): ReactNode => {
		const children = Array.from(node.childNodes).map(
			captionElement(format),
		);

		switch (node.nodeName) {
			case 'STRONG':
				return (
					<strong
						css={css`
							${textSans.xsmall({
								lineHeight: 'regular',
								fontWeight: 'bold',
							})}
						`}
						key={key}
					>
						{children}
					</strong>
				);
			case 'EM':
				return (
					<em
						css={css`
							${textSans.xsmall({
								lineHeight: 'regular',
								fontStyle: 'italic',
							})}
						`}
						key={key}
					>
						{children}
					</em>
				);
			case 'A': {
				const href = getHref(node);

				if (href.kind === OptionKind.Some) {
					return (
						<a
							href={href.value}
							css={css`
								text-decoration: none;
								color: ${neutral[100]};
								border-bottom: 0.0625rem solid ${neutral[60]};

								${darkModeCss`
                                    color: ${neutral[100]};
                                    border-color: ${neutral[60]};
                                `}
							`}
							key={key}
						>
							{children}
						</a>
					);
				}

				return children;
			}
			case 'S':
				return <s>{children}</s>;
			case '#text':
				return node.textContent;
			case 'BR':
				return <br />;
			default:
				return null;
		}
	};

type Props = {
	caption: Option<DocumentFragment>;
	format: ArticleFormat;
};

const Caption: FC<Props> = ({ caption, format }) =>
	maybeRender(caption, (cap) => (
		<>{Array.from(cap.childNodes).map(captionElement(format))}</>
	));

// ----- Exports ----- //

export default Caption;
