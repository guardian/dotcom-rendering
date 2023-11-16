import type React from 'react';
import { useState } from 'react';
import { emailIsShortEnoughForIdentity, isValidEmail } from '../lib/reminders';

type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

interface ContributionsReminderEmailForm {
	email: string;
	inputError?: string;
	updateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (onSubmit: () => void) => SubmitHandler;
}

export function useContributionsReminderEmailForm(): ContributionsReminderEmailForm {
	const [isDirty, setIsDirty] = useState(false);
	const [email, setEmail] = useState('');

	const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (isDirty) {
			setIsDirty(false);
		}
	};

	const isEmpty = email.trim().length === 0;
	const isValid = isValidEmail(email) && emailIsShortEnoughForIdentity(email);

	let inputError;
	if (isDirty && isEmpty) {
		inputError = 'Please enter your email address';
	} else if (isDirty && !isValid) {
		inputError = 'Please enter a valid email address';
	}

	const handleSubmit = (onSubmit: () => void) => {
		const handler = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (isValid) {
				onSubmit();
			} else {
				setIsDirty(true);
			}
		};
		return handler;
	};

	return { email, inputError, updateEmail, handleSubmit };
}
