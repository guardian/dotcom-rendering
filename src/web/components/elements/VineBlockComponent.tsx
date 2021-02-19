import React from 'react';
import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';

export const VineBlockComponent: React.FC<{
	element: VineBlockElement;
}> = ({ element }) => {
	return (
		<>
			{element.url && element.width && element.height && (
				<MaintainAspectRatio
					height={element.height}
					width={element.width}
				>
					<div className="element-vine">
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
			)}
		</>
	);
};
