import type { Contact } from '@guardian/apps-rendering-api-models/contact';
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

export const getCalloutId = (str: string): string =>
	`${str.replace(/[\s_]+/g, '-').toLowerCase()}-callout`;

export interface CalloutBlockProps {
	formId: number;
	heading: string;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
	contacts?: Contact[];
	isNonCollapsible: boolean;
}

const CalloutBlock: FC<CalloutBlockProps> = ({
	formId,
	heading,
	formFields,
	format,
	description,
	contacts,
	isNonCollapsible,
}): ReactElement => {
	const id = getCalloutId(heading);
	const [selectedTab, setSelectedTab] = useState('form');
	const shouldShowContacts = contacts && contacts.length > 0;
	const tabsContent = [
		{
			id: 'form',
			text: 'Tell us here',
			content: <CalloutForm id={formId} fields={formFields} />,
		},
	];

	if (shouldShowContacts) {
		tabsContent.push({
			id: 'contact',
			text: 'Message us',
			content: <CalloutContact contacts={contacts} />,
		});
	}

	return (
		<div css={calloutContainer} id={id}>
			<div css={[calloutInfo, calloutLinkContainer]}>
				<div css={calloutTitle}>Share your experience</div>
				{!isNonCollapsible && <h4 css={calloutHeadingText}>{heading}</h4>}
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
