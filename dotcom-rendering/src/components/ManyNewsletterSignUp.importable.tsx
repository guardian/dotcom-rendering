import { Button } from '@guardian/source-react-components';
import { useCallback, useEffect, useState } from 'react';
import { Section } from './Section';

const BUTTON_ROLE = 'GroupedNewslettersList-sign-up-button';

interface Props {
	label: string;
}

export const ManyNewsletterSignUp = ({ label }: Props) => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);

	const toggleNewsletter = useCallback(
		(event: Event) => {
			const { target: button } = event;
			if (!(button instanceof HTMLElement)) {
				return;
			}
			const id = button.getAttribute('data-newsletter-id');
			if (!id) {
				return;
			}
			const index = newslettersToSignUpFor.indexOf(id);
			if (index === -1) {
				setNewslettersToSignUpFor([...newslettersToSignUpFor, id]);
				button.style.backgroundColor = 'red';
			} else {
				setNewslettersToSignUpFor([
					...newslettersToSignUpFor.slice(0, index),
					...newslettersToSignUpFor.slice(index + 1),
				]);
				button.style.backgroundColor = '';
			}
		},
		[newslettersToSignUpFor],
	);

	useEffect(() => {
		const signUpButtons = [
			...document.querySelectorAll(`[data-role=${BUTTON_ROLE}]`),
		];
		signUpButtons.forEach((button) => {
			button.addEventListener('click', toggleNewsletter);
		});
		return () => {
			signUpButtons.forEach((button) => {
				button.removeEventListener('click', toggleNewsletter);
			});
		};
	}, [toggleNewsletter, newslettersToSignUpFor]);

	return (
		<Section title={`${newslettersToSignUpFor.length} selected`}>
			<Button
				onClick={() => {
					console.log(newslettersToSignUpFor);
				}}
			>
				click {label}
			</Button>
		</Section>
	);
};
