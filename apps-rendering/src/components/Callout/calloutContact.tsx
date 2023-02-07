import type { Contact } from '@guardian/apps-rendering-api-models/contact';
import { LinkButton } from '@guardian/source-react-components';
import type { FC } from 'react';
import { calloutLinkContainer, calloutPrimaryButton, info } from './styles';

const capitalizeFirstLetter = (s: string): string =>
	s === 'whatsapp' ? 'WhatsApp' : s.charAt(0).toUpperCase() + s.slice(1);

export const formatContactNumbers = (contacts: Contact[]): string => {
	const contactNumbers = new Map<string, string[]>();

	// Group each contact by its value, so we can display multiple names for the same number.
	contacts.forEach(({ name, value }) => {
		if (!contactNumbers.has(value)) contactNumbers.set(value, []);
		contactNumbers.get(value)?.push(name);
	});

	// Join the names for each number together,
	// and then join all the numbers together into a readable string.
	return [...contactNumbers.entries()].reduce(
		(acc, [value, names], index) => {
			const namesString = names
				.map((name) => capitalizeFirstLetter(name))
				.join(' or ');
			return (
				acc + (index === 0 ? '' : ' or ') + `${namesString} at ${value}`
			);
		},
		'Contact us on ',
	);
};

const Disclaimer: FC<{ contacts: Contact[] }> = ({ contacts }) => {
	const contactText = (
		<p css={[info, calloutLinkContainer]}>
			{formatContactNumbers(contacts)}.
		</p>
	);

	// If any of the contacts have guidance, display it in a readable string.
	const guidanceText = (
		<span css={[info, calloutLinkContainer]}>
			For more information, please see our guidance on{' '}
			{contacts.map(
				(contact, i) =>
					contact.guidance && (
						<>
							<a key={i} href={contact.guidance}>
								contacting us via{' '}
								{capitalizeFirstLetter(contact.name)}
							</a>
							{i === contacts.length - 1 ? '.' : ', '}
						</>
					),
			)}
		</span>
	);

	const secureDropText = (
		<span css={[info, calloutLinkContainer]}>
			For true anonymity please use our{' '}
			<a href="https://www.theguardian.com/securedrop">SecureDrop</a>{' '}
			service instead.
		</span>
	);

	return (
		<>
			{contactText}
			{contacts.some((c) => !!c.guidance) && guidanceText}{' '}
			{secureDropText}
		</>
	);
};

const CalloutContact: FC<{ contacts: Contact[] }> = ({ contacts }) => {
	return (
		<div className="js-message-us-tab">
			<Disclaimer contacts={contacts} />

			{contacts.map((contact, i) => {
				if (!!contact.urlPrefix && !!contact.value) {
					return (
						<LinkButton
							key={i}
							css={calloutPrimaryButton}
							type="submit"
							priority="primary"
							href={`${contact.urlPrefix}${contact.value}`}
							target="_blank"
							rel="noopener"
						>
							Message us on {capitalizeFirstLetter(contact.name)}
						</LinkButton>
					);
				}
			})}
		</div>
	);
};

export default CalloutContact;
