import type { Contact } from '@guardian/apps-rendering-api-models/contact';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import { TermsAndConditions } from './calloutComponents';
import CalloutContact, {
	conditionallyRenderContactIcon,
} from './calloutContact';
import CalloutForm from './calloutForm';
import { ShareLink } from './shareLink';
import {
	calloutContainer,
	calloutDescription,
	calloutHeadingText,
	calloutInfo,
	calloutLinkContainer,
	calloutTitle,
	tabIcons,
	tabTitle,
} from './styles';

export const getCalloutId = (str: string): string =>
	`${str.replace(/[\s_]+/g, '-').toLowerCase()}-callout`;

export interface CalloutBlockProps {
	formId: number;
	prompt: string;
	heading: string;
	description?: DocumentFragment;
	formFields: FormField[];
	format: ArticleFormat;
	contacts?: Contact[];
	isNonCollapsible: boolean;
}

const CalloutBlock: FC<CalloutBlockProps> = ({
	formId,
	prompt,
	heading,
	description,
	formFields,
	format,
	contacts,
	isNonCollapsible,
}): ReactElement => {
	const id = getCalloutId(heading === '' ? formId.toString() : heading);
	const [selectedTab, setSelectedTab] = useState('form');
	const shouldShowContacts = contacts && contacts.length > 0;
	const shouldShowHeading = !!heading && !isNonCollapsible;
	const tabsContent = [
		{
			id: 'form',
			text: <div>Tell us here</div>,
			content: <CalloutForm id={formId} fields={formFields} />,
		},
	];

	if (shouldShowContacts) {
		const tabsText = (
			<div css={tabTitle}>
				<div>Message us</div>
				<div css={tabIcons}>
					{contacts.map((c) =>
						conditionallyRenderContactIcon(c.name),
					)}
				</div>
			</div>
		);

		tabsContent.push({
			id: 'contact',
			text: tabsText,
			content: <CalloutContact contacts={contacts} />,
		});
	}

	return (
		<div css={calloutContainer} id={id}>
			<div css={[calloutInfo, calloutLinkContainer]}>
				{!!prompt && <div css={calloutTitle}>{prompt}</div>}
				{!!shouldShowHeading && (
					<h4 css={calloutHeadingText}>{heading}</h4>
				)}
				{!!description && (
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
