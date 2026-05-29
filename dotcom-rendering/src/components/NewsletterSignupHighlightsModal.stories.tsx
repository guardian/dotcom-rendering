import { useState } from 'react';
import preview from '../../.storybook/preview';
import { NewsletterSignupHighlightsModal } from './NewsletterSignupHighlightsModal';

const meta = preview.meta({
	component: NewsletterSignupHighlightsModal,
	title: 'Components/Newsletter Signup Highlights Modal',
});

const ModalWrapper = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<>
			{!isOpen && (
				<button onClick={() => setIsOpen(true)}>Open modal</button>
			)}
			{isOpen && (
				<NewsletterSignupHighlightsModal
					titleId="modal-title"
					onClose={() => setIsOpen(false)}
				>
					<div style={{ padding: '24px' }}>
						<h2 id="modal-title" style={{ margin: '0 0 16px' }}>
							Saturday Edition
						</h2>
						<p>Modal content goes here (form / success states).</p>
					</div>
				</NewsletterSignupHighlightsModal>
			)}
		</>
	);
};

export const Default = meta.story({
	render: () => <ModalWrapper />,
});
