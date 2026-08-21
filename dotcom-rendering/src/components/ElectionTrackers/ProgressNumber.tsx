import {
	space,
	textSans14Object,
	textSansBold14Object,
} from '@guardian/source/foundations';

type Props = {
	/**
	 * Progress towards a total. For example, seats declared so far in an
	 * election.
	 */
	progress: number;
	/**
	 * The total being progressed towards. For example, the total number of
	 * seats up for election.
	 */
	total: number;
	/**
	 * The copy describing the numbers. For example "seats declared" or "races
	 * called".
	 */
	copy: string;
	/**
	 * Additional copy that may provide more context for the graphic in which
	 * this appears. Will appear on the same line as the progress number, but
	 * left-aligned.
	 */
	additionalCopy: string | undefined;
};

/**
 * Represents progress towards a total in text form. Right-aligned, with any
 * `additionalCopy` left-aligned.
 *
 * @example
 * <caption>This will generate "300/650 seats declared"</caption>
 * <ProgressNumber
 *   progress={300}
 *   total={650}
 *   copy="seats declared"
 *   additionalCopy={undefined}
 * />
 */
export const ProgressNumber = (props: Props) => {
	if (props.additionalCopy === undefined) {
		return <Numbers {...props} />;
	}

	return (
		<div css={{ display: 'flex', justifyContent: 'space-between' }}>
			<p
				css={{
					...textSans14Object,
					paddingTop: space[2],
				}}
			>
				{props.additionalCopy}
			</p>
			<Numbers {...props} />
		</div>
	);
};

const Numbers = (props: Omit<Props, 'additionalCopy'>) => (
	<p
		css={{
			...textSans14Object,
			textAlign: 'right',
			paddingTop: space[2],
		}}
	>
		<strong css={textSansBold14Object}>
			{props.progress}/{props.total}
		</strong>{' '}
		{props.copy}
	</p>
);
