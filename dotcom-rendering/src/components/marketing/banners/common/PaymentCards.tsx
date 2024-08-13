import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import React from 'react';

const paymentMethods = css`
	display: flex;
	margin-left: ${space[1]}px;
	gap: ${space[1]}px;
	align-self: center;

	> svg {
		height: 1.25rem;
	}

	${from.tablet} {
		margin-left: ${space[2]}px;
	}
`;

const mobilePaymentMethod = css`
	${from.desktop} {
		display: none;
	}
`;

type PaymentCardProps = {
	cssOverrides?: SerializedStyles;
};

export const PaymentCards = ({
	cssOverrides,
}: PaymentCardProps): JSX.Element => {
	return (
		<div css={[paymentMethods, cssOverrides]}>
			{/* ApplePay */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 20"
				fill="none"
				css={mobilePaymentMethod}
			>
				<rect
					width="29.5"
					height="19.5"
					x=".25"
					y=".25"
					stroke="#000"
					strokeWidth=".5"
					rx="2.75"
					fill="#fff"
				/>
				<path
					fill="#000"
					d="M8.408 6.727c.268-.335.45-.784.401-1.243-.391.02-.87.258-1.146.593-.248.287-.468.755-.41 1.195.439.038.878-.22 1.155-.545M8.804 7.358c-.638-.038-1.18.362-1.486.362-.305 0-.771-.343-1.276-.334a1.88 1.88 0 0 0-1.6.972c-.687 1.182-.182 2.936.485 3.899.324.476.715 1 1.229.982.486-.02.677-.315 1.267-.315s.762.315 1.277.305c.533-.01.867-.476 1.19-.953.372-.543.524-1.067.534-1.096-.01-.01-1.029-.4-1.038-1.573-.01-.982.8-1.449.838-1.478-.457-.676-1.172-.752-1.42-.771M14.363 6.03c1.387 0 2.353.956 2.353 2.348 0 1.397-.986 2.359-2.388 2.359h-1.536v2.443h-1.11V6.03zm-1.571 3.775h1.273c.967 0 1.517-.52 1.517-1.422s-.55-1.417-1.512-1.417h-1.278zM17.006 11.698c0-.912.699-1.472 1.938-1.541l1.427-.084V9.67c0-.58-.392-.926-1.045-.926-.62 0-1.007.297-1.1.763h-1.011c.059-.942.862-1.635 2.15-1.635 1.264 0 2.071.668 2.071 1.714v3.593H20.41v-.858h-.024c-.302.58-.962.947-1.645.947-1.021 0-1.735-.635-1.735-1.571m3.365-.47v-.412l-1.283.08c-.64.044-1.001.326-1.001.772 0 .456.376.753.951.753.748 0 1.333-.515 1.333-1.194M22.405 15.097v-.867c.079.02.257.02.346.02.496 0 .763-.208.927-.743 0-.01.094-.317.094-.322L21.89 7.967h1.16l1.318 4.241h.02l1.318-4.241h1.13l-1.953 5.485c-.446 1.264-.961 1.67-2.041 1.67-.09 0-.357-.01-.437-.025"
				/>
			</svg>
			{/* GooglePay */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 38 20"
				css={mobilePaymentMethod}
			>
				<path
					fill="#fff"
					d="M27.8 0H10.2C4.7 0 .2 4.5.2 10s4.5 10 10 10h17.6c5.5 0 10-4.5 10-10s-4.5-10-10-10"
				/>
				<path
					fill="#3C4043"
					d="M27.8.81c1.235 0 2.435.245 3.565.725a9.27 9.27 0 0 1 4.9 4.9c.48 1.13.725 2.33.725 3.565a9.1 9.1 0 0 1-.725 3.565 9.27 9.27 0 0 1-4.9 4.9c-1.13.48-2.33.725-3.565.725H10.2a9.1 9.1 0 0 1-3.565-.725 9.27 9.27 0 0 1-4.9-4.9A9.1 9.1 0 0 1 1.01 10c0-1.235.245-2.435.725-3.565a9.27 9.27 0 0 1 4.9-4.9A9.1 9.1 0 0 1 10.2.81zm0-.81H10.2C4.7 0 .2 4.5.2 10s4.5 10 10 10h17.6c5.5 0 10-4.5 10-10s-4.5-10-10-10"
				/>
				<path
					fill="#3C4043"
					d="M18.13 10.71v3.025h-.96v-7.47h2.545q.969 0 1.645.645.69.645.69 1.575c0 .635-.23 1.16-.69 1.585q-.669.636-1.645.635H18.13zm0-3.525V9.79h1.605c.38 0 .7-.13.95-.385a1.26 1.26 0 0 0 .385-.915c0-.345-.13-.65-.385-.905a1.25 1.25 0 0 0-.95-.395H18.13zM24.56 8.455q1.065 0 1.68.57t.615 1.56v3.15h-.915v-.71h-.04q-.594.876-1.585.875-.846.001-1.415-.5t-.57-1.25q0-.795.6-1.26.601-.471 1.6-.47.856 0 1.405.315v-.22c0-.335-.13-.615-.395-.85a1.36 1.36 0 0 0-.93-.35q-.804-.001-1.27.68l-.845-.53q.699-1.011 2.065-1.01m-1.24 3.71q-.001.376.32.625.316.249.745.25.608 0 1.08-.45.474-.449.475-1.055-.449-.354-1.25-.355-.585.001-.975.28-.396.293-.395.705M32.075 8.62l-3.2 7.36h-.99l1.19-2.575-2.11-4.785h1.045l1.52 3.67h.02l1.48-3.67z"
				/>
				<path
					fill="#4285F4"
					d="M14.312 10.1q-.001-.47-.08-.9h-4.024v1.65h2.317a1.99 1.99 0 0 1-.86 1.329v1.07h1.38c.805-.745 1.267-1.847 1.267-3.149"
				/>
				<path
					fill="#34A853"
					d="M11.666 12.179c-.384.259-.879.41-1.457.41-1.118 0-2.066-.753-2.405-1.768H6.38v1.104a4.28 4.28 0 0 0 3.828 2.36c1.157 0 2.129-.381 2.836-1.036z"
				/>
				<path
					fill="#FABB05"
					d="M7.67 10.003q.002-.43.134-.82V8.079H6.38a4.26 4.26 0 0 0-.456 1.923c0 .692.165 1.345.456 1.924l1.423-1.104a2.6 2.6 0 0 1-.134-.82"
				/>
				<path
					fill="#E94235"
					d="M10.209 7.415c.631 0 1.197.217 1.643.642l1.223-1.221a4.12 4.12 0 0 0-2.866-1.116c-1.674 0-3.123.96-3.828 2.359l1.423 1.104c.34-1.015 1.287-1.768 2.405-1.768"
				/>
			</svg>

			{/* Visa */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 30 20"
			>
				<rect
					width="29.5"
					height="19.5"
					x=".25"
					y=".25"
					stroke="#000"
					strokeWidth=".5"
					rx="2.75"
					fill="#fff"
				/>
				<path
					fill="#1A1F70"
					d="m11.547 5.779-3.55 8.473H5.682L3.931 7.489c-.106-.416-.193-.568-.52-.743a9 9 0 0 0-2.161-.72l.05-.247h3.73a1.026 1.026 0 0 1 1.012.863l.923 4.898L9.243 5.78zm9.076 5.7c.01-2.232-3.084-2.357-3.068-3.355 0-.302.294-.625.928-.708a4.14 4.14 0 0 1 2.161.385l.386-1.797a5.9 5.9 0 0 0-2.051-.379c-2.172 0-3.691 1.155-3.714 2.798-.014 1.219 1.089 1.896 1.927 2.31s1.143.669 1.137 1.054c0 .568-.68.82-1.31.828a4.6 4.6 0 0 1-2.25-.534l-.399 1.855a6.6 6.6 0 0 0 2.437.439c2.313 0 3.81-1.136 3.816-2.889zm5.72 2.763h2.028l-1.77-8.463h-1.87a1 1 0 0 0-.934.616l-3.288 7.847h2.302l.456-1.263h2.813zm-2.445-2.998 1.156-3.177.663 3.177zm-9.212-5.465-1.811 8.473h-2.2l1.812-8.473z"
				/>
			</svg>

			{/* MasterCard */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 30 20"
			>
				<rect
					width="29.5"
					height="19.5"
					x=".25"
					y=".25"
					stroke="#000"
					strokeWidth=".5"
					rx="2.75"
					fill="#fff"
				/>
				<path fill="#FF5F00" d="M17.854 4.454h-5.949v10.69h5.95z" />
				<path
					fill="#EB001B"
					d="M12.283 9.799a6.79 6.79 0 0 1 2.597-5.345 6.799 6.799 0 1 0 0 10.69 6.79 6.79 0 0 1-2.597-5.345"
				/>
				<path
					fill="#F79E1B"
					d="M25.88 9.799a6.798 6.798 0 0 1-11 5.345 6.8 6.8 0 0 0 0-10.69 6.798 6.798 0 0 1 11 5.345M25.231 14.012v-.22h.088v-.044h-.224v.045h.088v.219zm.436 0v-.264h-.069l-.079.181-.08-.181h-.068v.264h.049v-.2l.074.172h.05l.075-.172v.2z"
				/>
			</svg>
			{/* Amex */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 30 20"
			>
				<g clipPath="url(#a)">
					<rect width="30" height="20" fill="#fff" rx="3" />
					<path
						fill="#006FCF"
						d="m25.875 4.114.76-2.006H30v-3.633H-3.75v22.989H30V17.83h-3.202l-1.194-1.355-1.194 1.355H15.4v-7.265h-2.984l3.745-8.404h3.636l.868 1.898V2.162h4.505zm-2.496.542.325.813 1.52 4.012h1.411l1.52-4.012.271-.813v4.771H30V3.301h-2.605L26.2 6.39l-.326.867-.325-.867-1.194-3.09H21.75v6.126h1.628zm-3.365 4.771h1.79l-2.713-6.126h-2.116L14.26 9.427h1.791l.489-1.193h2.985zm-2.28-4.012.326-.759.326.759.651 1.572h-1.9zm-1.085 5.15v6.127h5.102v-1.3h-3.582v-1.085h3.473v-1.301H18.17V11.92h3.582V10.62zm10.854 6.073h2.009l-2.877-3.036 2.877-3.036h-2.009l-1.845 2.006-1.845-2.006h-2.062l2.876 3.09-2.876 3.036h1.953l1.846-2.006zm.76-3.036L30 15.392v-3.525z"
					/>
				</g>
				<rect
					width="29.5"
					height="19.5"
					x=".25"
					y=".25"
					stroke="#000"
					strokeWidth=".5"
					rx="2.75"
				/>
				<defs>
					<clipPath id="a">
						<rect width="30" height="20" fill="#fff" rx="3" />
					</clipPath>
				</defs>
			</svg>
			{/* Paypal */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 30 20"
			>
				<rect width="29.5" height="19.5" x=".25" y=".25" rx="2.75" />
				<rect
					width="29.5"
					height="19.5"
					x=".25"
					y=".25"
					stroke="#000"
					strokeWidth=".5"
					rx="2.75"
					fill="#fff"
				/>
				<path
					fill="#253B80"
					d="m12.301 16.992.256-1.652-.57-.013H9.27l1.889-12.185a.16.16 0 0 1 .053-.095.15.15 0 0 1 .1-.038h4.585c1.522 0 2.572.322 3.12.958.257.298.421.61.5.953.083.36.085.79.004 1.314l-.006.038v.336l.257.148q.324.174.52.404c.22.255.363.579.423.963.062.395.041.866-.06 1.398-.118.612-.307 1.146-.563 1.582a3.2 3.2 0 0 1-.892.994c-.34.246-.745.432-1.202.552a6 6 0 0 1-1.501.176h-.357c-.255 0-.503.094-.697.261a1.1 1.1 0 0 0-.364.66l-.027.149-.451 2.91-.02.107c-.006.034-.015.05-.03.062a.07.07 0 0 1-.046.017z"
				/>
				<path
					fill="#179BD7"
					d="M20.014 6.31q-.02.134-.047.274c-.604 3.157-2.672 4.248-5.314 4.248h-1.345a.66.66 0 0 0-.646.563l-.688 4.441-.195 1.26a.348.348 0 0 0 .34.404h2.385a.58.58 0 0 0 .567-.492l.023-.123.45-2.9.028-.158a.58.58 0 0 1 .567-.493h.357c2.311 0 4.12-.955 4.65-3.717.22-1.153.106-2.117-.479-2.794a2.3 2.3 0 0 0-.653-.512"
				/>
				<path
					fill="#222D65"
					d="M19.382 6.054a5 5 0 0 0-.588-.132 7.4 7.4 0 0 0-1.186-.088h-3.593a.582.582 0 0 0-.567.493l-.764 4.924-.022.144a.66.66 0 0 1 .646-.563h1.345c2.641 0 4.71-1.09 5.314-4.248q.027-.14.047-.273a3.2 3.2 0 0 0-.632-.257"
				/>
				<path
					fill="#253B80"
					d="M13.449 6.327a.58.58 0 0 1 .566-.493h3.593q.64-.001 1.186.088.155.025.302.058a5 5 0 0 1 .421.118q.267.09.497.213c.18-1.167 0-1.96-.62-2.68-.685-.792-1.919-1.131-3.498-1.131h-4.584a.66.66 0 0 0-.648.563l-1.91 12.31a.398.398 0 0 0 .39.463h2.83l.71-4.585z"
				/>
			</svg>
		</div>
	);
};
