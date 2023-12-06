import { css } from '@emotion/react';
import { isString } from '@guardian/libs';
import { space, textSans } from '@guardian/source-foundations';
import {
	LinkButton,
	SvgSignalBrand,
	SvgTelegramBrand,
	SvgWhatsAppBrand,
} from '@guardian/source-react-components';
import type { ReactElement } from 'react';
import { palette } from '../../palette';
import type { CalloutContactType } from '../../types/content';
import { linkStyles } from './CalloutComponents';

const calloutPrimaryButtonStyles = css`
	width: 100%;
	justify-content: center;
	margin-top: ${space[4]}px;

	:last-of-type {
		margin-bottom: ${space[6]}px;
	}
`;

const infoStyles = css`
	margin-bottom: ${space[2]}px;
	${textSans.xsmall()};
`;

export const formatContactType = (s: string): string =>
	s.toLowerCase() === 'whatsapp'
		? 'WhatsApp'
		: s.charAt(0).toUpperCase() + s.slice(1);

export const conditionallyRenderContactIcon = (name: string): ReactElement => {
	switch (name.toLowerCase()) {
		case 'whatsapp':
			return <SvgWhatsAppBrand size="small" />;
		case 'signal':
			return <SvgSignalBrand size="small" />;
		case 'telegram':
			return <SvgTelegramBrand size="small" />;
		default:
			return <></>;
	}
};

export const formatContactNumbers = (
	contacts: CalloutContactType[],
): string => {
	const contactNumbers = new Map<string, string[]>();

	// Group each contact by its value, so we can display multiple names for the same number.
	for (const { name, value } of contacts) {
		if (!contactNumbers.has(value)) contactNumbers.set(value, []);
		contactNumbers.get(value)?.push(name);
	}

	// Join the names for each number together,
	// and then join all the numbers together into a readable string.
	return [...contactNumbers.entries()].reduce(
		(acc, [value, names], index) => {
			const namesString = names
				.map((name) => formatContactType(name))
				.join(' or ');
			return (
				acc + (index === 0 ? '' : ' or ') + `${namesString} at ${value}`
			);
		},
		'Contact us on ',
	);
};

const Disclaimer = ({ contacts }: { contacts: CalloutContactType[] }) => {
	const contactText = (
		<p css={[linkStyles, infoStyles]}>{formatContactNumbers(contacts)}.</p>
	);

	// If any of the contacts have guidance, display it in a readable string.
	const guidanceText = (
		<span>
			For more information, please see our guidance on{' '}
			{contacts.map(
				({ guidance, name }, i) =>
					isString(guidance) && (
						<>
							<a key={guidance} href={guidance}>
								contacting us via {formatContactType(name)}
							</a>
							{i === contacts.length - 1 ? '.' : ', '}
						</>
					),
			)}
		</span>
	);

	const secureDropText = (
		<span>
			For true anonymity please use our{' '}
			<a href="https://www.theguardian.com/securedrop">SecureDrop</a>{' '}
			service instead.
		</span>
	);

	return (
		<>
			{contactText}
			<p css={[linkStyles, infoStyles]}>
				{contacts.some((c) => !!c.guidance) && guidanceText}{' '}
				{secureDropText}
			</p>
		</>
	);
};

const MessageUs = ({
	contacts,
	useBrandColour,
}: {
	contacts: CalloutContactType[];
	useBrandColour: boolean;
}) => {
	return (
		<div
			className="js-message-us-tab"
			style={
				useBrandColour
					? {
							'--article-link-text': palette('--callout-prompt'),
					  }
					: {}
			}
		>
			<Disclaimer contacts={contacts} />

			{contacts.map((contact, i) =>
				!!contact.urlPrefix && !!contact.value ? (
					<LinkButton
						data-ignore="global-link-styling"
						key={i}
						css={calloutPrimaryButtonStyles}
						type="submit"
						priority="primary"
						href={`${contact.urlPrefix}${contact.value}`}
						target="_blank"
						rel="noreferrer"
						icon={conditionallyRenderContactIcon(contact.name)}
					>
						Message us on {formatContactType(contact.name)}
					</LinkButton>
				) : (
					<></>
				),
			)}
		</div>
	);
};

export { MessageUs };
