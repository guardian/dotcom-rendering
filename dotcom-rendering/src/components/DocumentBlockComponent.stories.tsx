import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentBlockComponent } from './DocumentBlockComponent.importable';

const meta = {
	component: DocumentBlockComponent,
	title: 'Components/Document Block Component',
	decorators: [
		(Story) => (
			<div
				css={css`
					max-width: 620px;
					padding: 20px;
				`}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof DocumentBlockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScribdDocument: Story = {
	args: {
		embedUrl: 'https://www.scribd.com/embeds/431975393/content',
		height: 613,
		width: 460,
		title: '',
		isTracking: false,
		isMainMedia: false,
	},
};

/**
 * Skipped (flaky).
 *
 * This story fails intermittently. The text: "fit width" in
 * the button in the bottom-right sometimes causes a difference.
 * often different in the snapshot.
 *
 * Example: https://www.chromatic.com/test?appId=63e251470cfbe61776b0ef19&id=676405bf6014bfa8ccddc7be
 */
export const DocumentCloudDocument: Story = {
	args: {
		embedUrl: 'https://embed.documentcloud.org/documents/20417938-test-pdf',
		height: 700,
		width: 990,
		title: 'TEST PDF (Hosted by DocumentCloud)',
		source: 'DocumentCloud',
		isTracking: false,
		isMainMedia: false,
	},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};
