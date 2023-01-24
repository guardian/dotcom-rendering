interface EpicProps {
	countryCode?: string;
}

export const ContributionsEpic: React.FC<EpicProps> = ({
	countryCode,
}: EpicProps) => {
	console.log('ContributionsEpic', countryCode);
	return (
		<div>
			testing
		</div>
	)
};
