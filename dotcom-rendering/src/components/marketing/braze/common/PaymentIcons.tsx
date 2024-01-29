import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

const paymentImageStyles = css`
	display: inline-block;
	width: auto;
	height: 25px;
	margin: ${space[1]}px 0;
`;

export const PaymentIcons = () => (
	<img
		width={422}
		height={60}
		src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
		alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
		css={paymentImageStyles}
	/>
);
