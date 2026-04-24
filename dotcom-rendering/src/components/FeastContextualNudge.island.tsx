import type { EditionId } from '../lib/edition';
import { FeastContextualNudge } from './FeastContextualNudge';

type Props = {
	pageId: string;
	editionId: EditionId;
};

export const FeastContextualNudgeIsland = ({ pageId, editionId }: Props) => (
	<FeastContextualNudge pageId={pageId} editionId={editionId} />
);
