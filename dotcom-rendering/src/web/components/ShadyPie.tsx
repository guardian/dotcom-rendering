const params = new URLSearchParams();
params.set(
	'acquisitionData',
	JSON.stringify({
		componentType: 'ACQUISITIONS_OTHER',
		source: 'GUARDIAN_WEB',
		campaignCode: 'shady_pie_open_2019',
		componentId: 'shady_pie_open_2019',
	}),
);
params.set('INTCMP', 'shady_pie_open_2019');

export const ShadyPie = () => {
	return (
		<a
			href={`https://support.theguardian.com/uk/subscribe/digital?${params.toString()}`}
			tabIndex={-1}
		>
			<img
				src="https://uploads.guim.co.uk/2020/10/02/Digisubs_MPU_c1_my_opt.png"
				width="300"
				alt=""
			/>
		</a>
	);
};
