import type { GuardianCrossword } from 'mycrossword';
import { MyCrossword } from 'mycrossword/dist/cjs/components';
import xwCss from '!to-string-loader!css-loader!mycrossword/dist/index.css';

export type CrosswordProps = {
	id: string;
	crossword: GuardianCrossword;
};

export const Crossword = ({ crossword, id }: CrosswordProps) => (
	<>
		<style>{xwCss}</style>
		<MyCrossword id={id} data={crossword} />
	</>
);
