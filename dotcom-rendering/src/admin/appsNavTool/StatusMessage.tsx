import { palette, space } from '@guardian/source/foundations';
import { InlineSuccess, InlineError } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import type { State } from './state';

type Props = {
	message: State['message'];
};

export const StatusMessage = (props: Props) => {
	if (props.message === undefined) {
		return null;
	}

	return (
		<Output messageKind={props.message.kind}>
			<MessageText message={props.message} />
		</Output>
	);
};

type Message = Exclude<Props['message'], undefined>;

const Output = (props: {
	messageKind: Message['kind'];
	children: ReactNode;
}) => (
	<output
		css={{
			display: 'block',
			position: 'sticky',
			bottom: 0,
			paddingLeft: space[4],
			paddingTop: space[2],
			paddingBottom: space[1],
			borderTopWidth: 2,
			borderTopStyle: 'solid',
			backgroundColor: palette.neutral[100],
		}}
		style={{
			borderTopColor:
				props.messageKind === 'ok'
					? palette.success[400]
					: palette.error[400],
		}}
	>
		{props.children}
	</output>
);

const MessageText = (props: { message: Message }) => {
	switch (props.message.kind) {
		case 'ok':
			return <InlineSuccess>{props.message.value}</InlineSuccess>;
		case 'error':
			return <InlineError>{props.message.error}</InlineError>;
	}
};
