import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import { TermsAndConditions } from './calloutComponents';
import CalloutContact from './calloutContact';
import CalloutForm from './calloutForm';
import { ShareLink } from './shareLink';
import {
	calloutContainer,
	calloutDescription,
	calloutHeadingText,
	calloutInfo,
	calloutLinkContainer,
	calloutTitle,
} from './styles';

export interface CalloutBlockProps {
	formId: number;
	heading: string;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
}

const CalloutBlock: FC<CalloutBlockProps> = ({
	formId,
	heading,
	formFields,
	format,
	description,
}): ReactElement => {
	const id = `${heading.replace(/[\s_]+/g, '-')}-callout`;
	const [selectedTab, setSelectedTab] = useState('form');
	const tabsContent = [
		{
			id: 'form',
			text: 'Tell us here',
			content: <CalloutForm id={formId} fields={formFields} />,
		},
		{
			id: 'contact',
			text: 'Message us',
			content: <CalloutContact />,
		},
	];

	return (
		<div css={calloutContainer} id={id}>
			<div css={[calloutInfo, calloutLinkContainer]}>
				<div css={calloutTitle}>Tell Us</div>
				<h4 css={calloutHeadingText}>{heading}</h4>
				{description && (
					<div css={calloutDescription}>
						{renderCalloutDescriptionText(format, description)}
					</div>
				)}
				<TermsAndConditions />
				<ShareLink title={heading} urlAnchor={id} />
			</div>
			<Tabs
				tabsLabel="Tell us/Message us tabs"
				tabElement="button"
				tabs={tabsContent}
				selectedTab={selectedTab}
				onTabChange={(tabName: string): void => {
					setSelectedTab(tabName);
				}}
			/>
		</div>
	);
};

export default CalloutBlock;
