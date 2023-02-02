import type { Contact } from '@guardian/apps-rendering-api-models/contact';
import { LinkButton } from '@guardian/source-react-components';
import type { FC } from 'react';
import { calloutLinkContainer, calloutPrimaryButton, info } from './styles';

const capitalizeFirstLetter = (s: String) =>
	s.charAt(0).toUpperCase() + s.slice(1);

export const formatContactNumbers = (contacts: Contact[]): string => {
	const contactNumbers = new Map<string, string[]>();

	contacts.forEach(({ name, value }) => {
	  if (!contactNumbers.has(value)) contactNumbers.set(value, []);
	  contactNumbers.get(value)?.push(name);
	});

	return [...contactNumbers.entries()].reduce((acc, [value, names], index) => {
	  const namesString = names.map(name => capitalizeFirstLetter(name)).join(" or ");
	  return acc + (index === 0 ? '' : ' or ') + `${namesString} at ${value}`;
	}, "Contact us on ");
  }


const Disclaimer: FC<{ contacts: Contact[] }> = ({ contacts }) => {
	const contactText = (
		<p css={[info, calloutLinkContainer]}>
			{formatContactNumbers(contacts)}
		</p>
	);

	const guidanceText = (
		<p css={[info, calloutLinkContainer]}>
			For more information, please see our guidance on{' '}
			{contacts.map(
				(contact, i) =>
					contact?.guidance && (
						<>
							<a key={i} href={contact.guidance}>
								contacting us via{' '}
								{capitalizeFirstLetter(contact.name)}
							</a>
							{i === contacts.length - 1 ? '.' : ', '}
						</>
					),
			)}
		</p>
	);

	const secureDropText = (
		<p css={[info, calloutLinkContainer]}>
			For true anonymity please use our{' '}
			<a href="https://www.theguardian.com/securedrop">SecureDrop</a>{' '}
			service instead.
		</p>
	);

	return (
		<>
			{contactText}
			{contacts.some((c) => !!c.guidance) && guidanceText}

			{secureDropText}
		</>
	);
};

const CalloutContact: FC<{ contacts: Contact[] }> = ({ contacts }) => {
	return (
		<div className="js-message-us-tab">
			<Disclaimer contacts={contacts} />

			{contacts.map((contact) => {
				if (!!contact.urlPrefix && !!contact.value) {
					return (
						<LinkButton
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
