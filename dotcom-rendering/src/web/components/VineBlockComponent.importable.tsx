import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import type { RoleType, VineBlockElement } from '../../types/content';
import { ClickToView } from './ClickToView';
import { MaintainAspectRatio } from './MaintainAspectRatio';

const titleStyle = css`
	p {
		${textSans.large()};
		font-weight: bold;
	}
`;

type Props = {
	element: VineBlockElement;
	role: RoleType;
	isTracking: boolean;
	source?: string;
	sourceDomain?: string;
};

export const VineBlockComponent = ({
	element,
	role,
	isTracking,
	source,
	sourceDomain,
}: Props) => {
	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			source={source}
			sourceDomain={sourceDomain}
		>
			{!!(element.url && element.width && element.height) && (
				<div>
					<div css={titleStyle}>
						<p>{element.title}</p>
					</div>

					<MaintainAspectRatio height={element.height} width={element.width}>
						<div css="element-vine">
							<iframe
								title="vine-embed"
								src={element.url}
								height={element.height}
								width={element.width}
							/>
							<script
								async={true}
								src="https://platform.vine.co/static/scripts/embed.js"
							/>
						</div>
					</MaintainAspectRatio>
				</div>
			)}
		</ClickToView>
	);
};
