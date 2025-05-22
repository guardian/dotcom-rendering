type Target = 'dotcom' | 'live apps' | 'editions app' | 'amp';

const href = (target: Target): string => {
	switch (target) {
		case 'dotcom':
			return '/targets/dotcom';
		case 'live apps':
			return '/targets/live-apps';
		case 'editions app':
			return '/targets/editions-app';
		case 'amp':
			return '/targets/amp';
	}
};

function* links(targets: Target[]) {
	const unique = new Set(targets);

	for (const element of unique.values()) {
		yield (
			<li key={element}>
				<a href={href(element)}>{element}</a>
			</li>
		);
	}
}

export const Available = ({ targets }: { targets: Target[] }) => (
	<dl>
		<dt>Available targets</dt>
		<dd>
			<ul>{Array.from(links(targets))}</ul>
		</dd>
	</dl>
);
