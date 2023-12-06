// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import type { Option } from '../../../vendor/@guardian/types/index';
import Dateline from 'components/Dateline';
import { getFormat } from 'item';
import type { Item } from 'item';
import { pipe } from 'lib';
import type { FC, ReactNode } from 'react';
import { renderText } from '../../renderer';

// ----- Styles ----- //

const styles: SerializedStyles = css`
	.author {
		margin: ${remSpace[3]} 0 ${remSpace[3]} 0;
		color: ${neutral[86]};

		.follow,
		a {
			color: ${neutral[86]};
		}

		time,
		.follow {
			${textSans.xsmall()}
		}

		time {
			${textSans.xsmall()};
			color: ${neutral[86]};
		}
	}
`;

// ----- Component ----- //

interface Props {
	publicationDate: Option<Date>;
	className: SerializedStyles;
	item: Item;
}

const Byline: FC<Props> = ({ publicationDate, className, item }) => {
	const byline = pipe(
		item.bylineHtml,
		map((html) => <address>{renderText(html, getFormat(item))}</address>),
		withDefault<ReactNode>(null),
	);

	return (
		<div css={[className, styles]}>
			<div>
				<div className="author">
					{byline}
					<Dateline
						date={publicationDate}
						format={item}
						edition={item.edition}
					/>
				</div>
			</div>
		</div>
	);
};

// ----- Exports ----- //

export default Byline;
