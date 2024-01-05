import { ClassNames } from '@emotion/react';
import { headline, palette, textSans } from '@guardian/source-foundations';
import { createAuthenticationEventParams } from '../lib/identity-component-event';

export const Sidebar = () => {
	// this next line is necessary cos react has a 'template' object with no 'type' property.
	// By saying 'as {}' we can pretend we're not adding the 'type' property and thus avoid unhappy type errors
	const props = { type: 'amp-mustache' } as { [key: string]: any };
	return (
		<ClassNames>
			{({ css, cx }) => {
				const sidebarStyles = css`
					width: 80vh;
					background-color: ${palette.brand[400]};

					[aria-expanded='true'] {
						i {
							margin-top: 0px;
						}

						i:before {
							transform: rotate(-135deg);
						}
					}
				`;

				const menuGroup = css`
					padding-bottom: 0.75rem;
				`;

				const toggle = css`
					i {
						margin-top: -4px;
						left: 25px;
						position: absolute;

						:before {
							border: 2px solid ${palette.neutral[100]};
							border-top: 0;
							border-left: 0;
							content: '';
							display: inline-block;
							height: 8px;
							transform: rotate(45deg);
							width: 8px;
							color: ${palette.neutral[100]};
						}
					}
				`;

				const pillarLink = css`
					background-color: transparent;
					border: 0;
					box-sizing: border-box;
					display: block;
					${headline.xsmall()};
					outline: none;
					padding: 6px 10px 16px 50px;
					position: relative;
					text-align: left;
					width: 100%;
					font-weight: 700;
					color: ${palette.neutral[100]};
					${toggle};
				`;

				const link = css`
					background-color: transparent;
					border: 0;
					box-sizing: border-box;
					color: ${palette.neutral[100]};
					text-decoration: none;
					display: block;
					${textSans.large({ lineHeight: 'tight' })};
					font-weight: 400;
					outline: none;
					padding: 8px 10px 8px 50px;
					position: relative;
					text-align: left;
					width: 100%;
				`;

				const subLinks = css`
					background-color: ${palette.brand[300]};
					padding-bottom: 12px;

					a {
						${link};
					}
				`;

				const otherLinks = css`
					a {
						${link};
					}
				`;

				const membershipLinks = css`
					a {
						font-weight: 700;
						color: ${palette.brandAlt[400]};
					}
				`;

				const pillarStyles = css`
					position: relative;

					:not(:last-child):after {
						background-color: rgba(255, 255, 255, 0.3);
						bottom: 0;
						content: '';
						display: block;
						height: 1px;
						left: 50px;
						position: absolute;
						width: 100%;
					}
				`;

				const editionLink = css`
					${toggle};
				`;

				const template = `
			<ul class=${menuGroup}>
			{{ #topLevelSections }}
				<li class=${pillarStyles}>
					<amp-accordion>
						<section>
							<h2 class=${pillarLink}
								data-link-name="amp : nav : secondary : {{ title }}">
								<i></i>
								{{ title }}
							</h2>

							<ul class=${subLinks}>
								{{ #subSections }}
									<li>
										<a
											href="{{ url }}"
											data-link-name="amp : nav : secondary : {{ title }}">
											{{ title }}
										</a>
									</li>
								{{ /subSections }}
							</ul>
						</section>
					</amp-accordion>
				</li>
			{{ /topLevelSections }}
			</ul>

			<ul class=${otherLinks}>
			{{ #readerRevenueLinks }}
				<li class=${membershipLinks}
					role="menuitem">

					<a
						href="{{ url }}"
						data-link-name="amp : nav : {{ title }}">
						{{ title }}
					</a>
				</li>
			{{ /readerRevenueLinks }}

			<li>
				<a href="https://profile.theguardian.com/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN&ABCMP=ab-sign-in&${createAuthenticationEventParams(
					'amp_sidebar_signin',
				)}"
					data-link-name="amp : nav : sign in">
					Sign in / Register
				</a>
			</li>
			</ul>

			<amp-accordion>
			<section>
				<h2 class=${cx(link, editionLink)}>
					<i></i>
					Switch edition
				</h2>

				<ul class=${subLinks}>
				{{ #editions }}
					<li>
						<a data-link-name="amp : nav : edition-picker : {{ id }}"
						href="{{ optInLink }}">
						   {{ displayName }}
						</a>
					</li>
				{{ /editions }}
				</ul>
			</section>
			</amp-accordion>

			<ul class=${cx(otherLinks, menuGroup)}>
			{{ #secondarySections }}
				<li>
					<a href="{{ url }}"
						data-link-name="amp : nav : {{ title }}">
						{{ title }}
					</a>
				</li>
			{{ /secondarySections }}
			</ul>
			`;

				return (
					<amp-sidebar
						class={sidebarStyles}
						layout="nodisplay"
						id="sidebar1"
					>
						<amp-list
							layout="fill"
							src="https://amp.theguardian.com/editionalised-nav.json"
						>
							{}
							<template {...props}>
								<div
									dangerouslySetInnerHTML={{
										__html: template,
									}}
								/>
							</template>
						</amp-list>
					</amp-sidebar>
				);
			}}
		</ClassNames>
	);
};
