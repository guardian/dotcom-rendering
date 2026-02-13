# Braze Banners System

The **Braze Banners System** is a unified framework within Dotcom Rendering (DCR) for integrating [Braze Banners](https://www.braze.com/docs/developer_guide/banners/) - a channel designed for persistent, inline, and personalized messaging.

This system is owned by the **Value** team and serves as the replacement for the legacy "Hybrid" setup (custom In-App Messages and `braze-components`).

## Context: The "Braze Channels" Upgrade

This system is part of a strategic shift from a **Hybrid setup** to a **Native setup** (Braze Banners).

As we transition to the **Braze Banners System**, the legacy **Hybrid setup** (In-App Messaging system alongside the `braze-components` library) will be deprecated soon.

This new approach relies on **Braze Banner templates** created directly in the Braze Dashboard - a joint effort between the **CRM**, **Design**, and **Development** teams. This collaborative workflow ensures design consistency while empowering CRM to self-serve.

### Motivation

| Metric          | Legacy Hybrid Setup                          | New Braze Banners System                       |
| :-------------- | :------------------------------------------- | :--------------------------------------------- |
| **Build Time**  | 5–6 hours (Design + Liquid logic + QA)       | < 1 hour                                       |
| **Tooling**     | Manual Storybook templates & Key-Value pairs | Braze Drag-and-Drop Editor & CMS               |
| **Agility**     | dependency on engineering for new formats    | Self-serve to standard Design System templates |
| **Consistency** | Fragmented logic                             | Shared logic across Web & App                  |

### Goals

1.  **Increase Supporter Value**: Enable highly personalized, cross-platform journeys (leveraging CDP data).
2.  **Improve Agility**: Reduce campaign build time significantly.
3.  **Expand Formats**: Move beyond just "Epic" and "Banner" to potential new slots (Sidebar, Menubar) in the future.

## Architecture

The system is encapsulated primarily in `BrazeBannersSystem.tsx` and interacts with the Global Braze SDK.

### 1. Placements

We map DCR-specific slots to Braze Placement IDs. This abstraction allows us to change the underlying ID without refactoring the components.

| DCR Placement ID                             | Description                                                         |
| :------------------------------------------- | :------------------------------------------------------------------ |
| `BrazeBannersSystemPlacementId.EndOfArticle` | Appears at the bottom of the article body (Epic slot).              |
| `BrazeBannersSystemPlacementId.Banner`       | Appears fixed at the bottom of the viewport (Sticky Bottom Banner). |

### 2. Concurrency & Slot Priority

To ensure retrocompatibility during the migration phase, the `brazeBannersSystem` is inserted **before** the current implementations (`braze-components`). If a Native Banner is available, it takes precedence over legacy Braze campaigns or Reader Revenue messages.

**End of Article Slot:**

1.  **`brazeBannersSystem`** (New Native Banner)
2.  `brazeEpic` (Legacy Custom Component)
3.  `readerRevenueEpic` (Support asks)

**Sticky Bottom Banner Slot:**

1.  `CMP` (Privacy/Consent - Always Top Priority)
2.  `signInGate` (Auxia)
3.  **`brazeBannersSystem`** (New Native Banner)
4.  `brazeBanner` (Legacy Custom Component)
5.  `readerRevenue` (Support asks)

### 3. Display Logic (`canShowBrazeBannersSystem`)

Before a banner is requested or shown, the system performs strict checks:

-   **SDK Initialization**: Braze must be loaded.
-   **Content Type**: Suppressed on `Interactive` articles (for Epics).
-   **Commercial Rules**: Suppressed if Reader Revenue is hidden (e.g., paid content, sensitive pieces).
-   **Tag Exclusions**: Specific logic like the generic `suppressForTaylorReport`.

### 4. Safety & Mitigations

Since Braze injects HTML/CSS dynamically, we employ several layers of safety:

#### A. The CSS Checker

Because marketing teams have styling flexibility, there is a risk of campaigns targeting elements that no longer exist in DCR. The system includes a runtime **CSS Checker** (`runCssCheckerOnBrazeBanner`) which:

-   Parses the banner's HTML/CSS.
-   Validates that every CSS selector matches at least one element.
-   Logs warnings (in development) if "dead" selectors are found.
    This ensures broken creatives are caught during the QA process before launch.

#### B. JavaScript Isolation

Banners are rendered inside an `iframe` (or Braze-managed shadow DOM context) to sandbox execution.

-   _Risk_: Advanced interaction requiring JS.
-   _Mitigation_: We establish a trust chain. Strict templates created by Design Systems are used.
-   _Security_: Cross-origin access is blocked; communication happens solely via the `postMessage` protocol.

### 5. Rate Limiting (`refreshBanners`)

Braze enforces a "Token Bucket" algorithm for refreshing banners (re-checking eligibility):

-   **Capacity**: 5 tokens per session.
-   **Refill**: 1 token every 3 minutes.
-   **Implementation**: The `refreshBanners()` function creates a race condition with a timeout. If the network is slow or tokens are empty, DCR proceeds without blocking the render.

### 6. Wrapper Mode & Styling

To support more complex designs while maintaining consistency, the system supports a **"Wrapper Mode"**.

-   **Enabled via**: `wrapperModeEnabled` (Boolean) Key-Value pair.
-   **Behavior**: When enabled, DCR applies specific styles to the **container** holding the Braze iframe, including:
    -   `max-height: 65svh` (prevents banners from taking over the full screen).
    -   `border-top: 1px solid black` (provides visual separation).
    -   Dynamic Background Color (see below).

#### Automatic Color Contrast

When providing a background color in Wrapper Mode, DCR automatically calculates the optimal foreground (text/icon) color to ensure accessibility standards are met.

-   **Input**: `wrapperModeBackgroundColor` (Hex string).
-   **Algorithm**: Calculates perceived brightness using the formula `(r * 299 + g * 587 + b * 114) / 1000`.
-   **Result**: If brightness > 128, the foreground is **Black**. Otherwise, it is **White**.

### 7. Configuration (Key-Value Pairs)

The system automatically reads specific Key-Value pairs from the Braze Campaign to configure the banner wrapper.

| Key                          | Type    | Description                                                                                |
| :--------------------------- | :------ | :----------------------------------------------------------------------------------------- |
| `minHeight`                  | String  | Sets the CSS `min-height` of the container (e.g., "300px") to minimize layout shift (CLS). |
| `wrapperModeEnabled`         | Boolean | Activates Wrapper Mode (see above).                                                        |
| `wrapperModeBackgroundColor` | String  | Sets the background color of the wrapper and triggers the auto-contrast calculation.       |

_Custom keys can also be retrieved by the banner creative using the `BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE` message._

## Communication Protocol

The banner uses a `postMessage` protocol to interact with the host DCR page.

### Supported Message Types

| Message Type                                       | Function                                              |
| :------------------------------------------------- | :---------------------------------------------------- |
| `BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS`             | Checks if user is `SignedIn`.                         |
| `BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS`           | Requests email (if signed in).                        |
| `BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE`        | Subscribes to a newsletter ID.                        |
| `BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE`          | Creates a one-off reminder for contribution requests. |
| `BRAZE_BANNERS_SYSTEM:DISMISS_BANNER`              | Removes the banner from the DOM.                      |
| `BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE` | Reads Key-Value pairs from the Campaign config.       |

### Feature Details

#### 1. GET_AUTH_STATUS

Checks the user's authentication status.

**Request Parameters**: None

**Response**:

```javascript
{
  type: 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS:RESPONSE',
  kind: 'SignedIn' | 'SignedOut' | 'Pending'
}
```

**Description**: Returns the current authentication state of the user. Use this to conditionally render elements based on whether the user is logged in.

---

#### 2. GET_EMAIL_ADDRESS

Retrieves the user's email address if they are signed in.

**Request Parameters**: None

**Response**:

```javascript
{
  type: 'BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS:RESPONSE',
  email: string | null
}
```

**Description**: Returns the user's email address or `null` if not available. The email is fetched securely and only returned for authenticated users.

---

#### 3. NEWSLETTER_SUBSCRIBE

Subscribes the user to a newsletter.

**Request Parameters**:

-   `newsletterId` (String, **Required**): The ID of the newsletter to subscribe to (e.g., "4156").

**Response**:

```javascript
{
  type: 'BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE:RESPONSE',
  success: boolean
}
```

**Description**: Attempts to subscribe the authenticated user to the specified newsletter using The Guardian's Identity API. Returns `true` if successful, `false` otherwise.

---

#### 4. REMINDER_SUBSCRIBE

Creates a one-off reminder for contribution requests.

**Request Parameters**:

-   `reminderPeriod` (String, **Required**): The target date for the reminder in **YYYY-MM-DD** format (e.g., "2026-03-15").
-   `reminderComponent` (String, _Optional_): The component requesting the reminder. Defaults to `'BANNER'` if not provided.
    -   Allowed values: `'BANNER'`, `'EPIC'`.
-   `reminderOption` (String, _Optional_): Specific reminder option/context. Defaults to `'recurring-contribution-upsell'` if not provided.
    -   Example values: `'recurring-contribution-upsell'`, `'one-off-contribution'`, `'supporter-plus'`

**Response**:

```javascript
{
  type: 'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE:RESPONSE',
  success: boolean
}
```

**Description**: Creates a one-off reminder for the user to be contacted about making a contribution at a future date. The system will:

-   Fetch the user's email address
-   Submit a reminder request to The Guardian's Support API
-   Set the platform as `'WEB'` and stage as `'PRE'` automatically
-   Return `true` if the reminder was successfully created, `false` otherwise

**Use Case**: Ideal for campaigns encouraging users to "remind me later" when they're unable or unwilling to contribute immediately. This helps re-engage users at a more convenient time.

---

#### 5. DISMISS_BANNER

Removes the banner from the DOM.

**Request Parameters**: None

**Response**: None (the banner is immediately removed)

**Description**: Programmatically dismisses the banner, removing it from the page. Use this when the user clicks a close button or completes an action that should hide the banner.

---

#### 6. GET_SETTINGS_PROPERTY_VALUE

Reads a specific Key-Value pair from the Campaign configuration.

**Request Parameters**:

-   `key` (String, **Required**): The name of the property to retrieve.

**Response**:

```javascript
{
  type: 'BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE:RESPONSE',
  key: string,
  value: string | null
}
```

**Description**: Retrieves custom configuration values set in the Braze Campaign's Key-Value pairs. Returns `null` if the key doesn't exist. Useful for dynamic configuration without hardcoding values in the banner creative.

### Code Examples for Braze Banner Custom Code Blocks

Below are practical examples of how to call these features from within your Braze Banner's custom HTML/JavaScript code blocks.

#### Example 1: Newsletter Subscription

```html
<button id="subscribe-btn">Subscribe to Newsletter</button>

<script>
	document.getElementById('subscribe-btn').addEventListener('click', () => {
		// Request newsletter subscription
		window.parent.postMessage(
			{
				type: 'BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE',
				newsletterId: '4156', // The Morning Briefing newsletter ID
			},
			'*',
		);
	});

	// Listen for the response
	window.addEventListener('message', (event) => {
		if (
			event.data.type ===
			'BRAZE_BANNERS_SYSTEM:NEWSLETTER_SUBSCRIBE:RESPONSE'
		) {
			if (event.data.success) {
				console.log('✅ Successfully subscribed to newsletter!');
				// Update UI to show success state
				document.getElementById('subscribe-btn').textContent =
					'Subscribed!';
				document.getElementById('subscribe-btn').disabled = true;
			} else {
				console.error('❌ Newsletter subscription failed');
				// Show error message to user
			}
		}
	});
</script>
```

#### Example 2: Reminder Subscription (Contribution)

```html
<button id="remind-me-btn">Remind me in 3 months</button>

<script>
	document.getElementById('remind-me-btn').addEventListener('click', () => {
		// Calculate date 3 months from now
		const futureDate = new Date();
		futureDate.setMonth(futureDate.getMonth() + 3);
		const reminderPeriod = futureDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

		// Request reminder creation
		window.parent.postMessage(
			{
				type: 'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE',
				reminderPeriod: reminderPeriod, // e.g., "2026-05-15"
				reminderComponent: 'BANNER', // Optional: defaults to 'BANNER'
				reminderOption: 'recurring-contribution-upsell', // Optional: defaults to this value
			},
			'*',
		);
	});

	// Listen for the response
	window.addEventListener('message', (event) => {
		if (
			event.data.type ===
			'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE:RESPONSE'
		) {
			if (event.data.success) {
				console.log('✅ Reminder successfully created!');
				// Update UI to show confirmation
				document.getElementById('remind-me-btn').textContent =
					"We'll remind you!";
				document.getElementById('remind-me-btn').disabled = true;
			} else {
				console.error('❌ Failed to create reminder');
				alert(
					'Unable to set reminder. Please ensure you are signed in.',
				);
			}
		}
	});
</script>
```

#### Example 3: Check Auth Status Before Action

```html
<div id="auth-content" style="display: none;">
	<p>Welcome back! <span id="user-email"></span></p>
	<button id="contribute-btn">Contribute Now</button>
</div>
<div id="guest-content" style="display: none;">
	<p>Please sign in to continue.</p>
	<a href="/signin">Sign In</a>
</div>

<script>
	// Check authentication status on load
	window.parent.postMessage(
		{
			type: 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS',
		},
		'*',
	);

	window.addEventListener('message', (event) => {
		// Handle auth status response
		if (
			event.data.type === 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS:RESPONSE'
		) {
			if (event.data.kind === 'SignedIn') {
				document.getElementById('auth-content').style.display = 'block';

				// Also fetch the email address
				window.parent.postMessage(
					{
						type: 'BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS',
					},
					'*',
				);
			} else {
				document.getElementById('guest-content').style.display =
					'block';
			}
		}

		// Handle email address response
		if (
			event.data.type ===
			'BRAZE_BANNERS_SYSTEM:GET_EMAIL_ADDRESS:RESPONSE'
		) {
			if (event.data.email) {
				document.getElementById('user-email').textContent =
					event.data.email;
			}
		}
	});
</script>
```

#### Example 4: Dismiss Banner After Action

```html
<button id="close-btn">Close</button>
<button id="contribute-and-close">Contribute & Close</button>

<script>
	// Simple dismiss
	document.getElementById('close-btn').addEventListener('click', () => {
		window.parent.postMessage(
			{
				type: 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER',
			},
			'*',
		);
	});

	// Perform action then dismiss
	document
		.getElementById('contribute-and-close')
		.addEventListener('click', () => {
			// Open contribution page
			window.open('https://support.theguardian.com/contribute', '_blank');

			// Dismiss the banner
			window.parent.postMessage(
				{
					type: 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER',
				},
				'*',
			);
		});
</script>
```

#### Example 5: Read Campaign Configuration

```html
<div id="dynamic-content"></div>

<script>
	// Request a custom configuration value
	window.parent.postMessage(
		{
			type: 'BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE',
			key: 'customMessage',
		},
		'*',
	);

	window.addEventListener('message', (event) => {
		if (
			event.data.type ===
			'BRAZE_BANNERS_SYSTEM:GET_SETTINGS_PROPERTY_VALUE:RESPONSE'
		) {
			if (event.data.key === 'customMessage' && event.data.value) {
				// Use the custom message from Campaign Key-Value pairs
				document.getElementById('dynamic-content').textContent =
					event.data.value;
			}
		}
	});
</script>
```

#### Example 6: Complete Reminder Flow with Multiple Steps

```html
<div id="step-1">
	<h3>Support The Guardian</h3>
	<p>Can you contribute today?</p>
	<button id="contribute-now">Contribute Now</button>
	<button id="remind-later">Remind me later</button>
</div>

<div id="step-2" style="display: none;">
	<h3>When should we remind you?</h3>
	<button class="reminder-option" data-months="1">In 1 month</button>
	<button class="reminder-option" data-months="3">In 3 months</button>
	<button class="reminder-option" data-months="6">In 6 months</button>
	<button id="back-btn">Back</button>
</div>

<div id="step-3" style="display: none;">
	<h3>✅ Reminder Set!</h3>
	<p>We'll email you in <span id="selected-months"></span>.</p>
	<button id="close-final">Close</button>
</div>

<script>
	// Step 1: Initial choice
	document.getElementById('contribute-now').addEventListener('click', () => {
		window.open('https://support.theguardian.com/contribute', '_blank');
		window.parent.postMessage(
			{ type: 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER' },
			'*',
		);
	});

	document.getElementById('remind-later').addEventListener('click', () => {
		// First check if user is signed in
		window.parent.postMessage(
			{ type: 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS' },
			'*',
		);
	});

	// Step 2: Select reminder period
	document.querySelectorAll('.reminder-option').forEach((btn) => {
		btn.addEventListener('click', function () {
			const months = parseInt(this.getAttribute('data-months'));
			const futureDate = new Date();
			futureDate.setMonth(futureDate.getMonth() + months);
			const reminderPeriod = futureDate.toISOString().split('T')[0];

			window.parent.postMessage(
				{
					type: 'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE',
					reminderPeriod: reminderPeriod,
					reminderComponent: 'EPIC',
					reminderOption: 'recurring-contribution-upsell',
				},
				'*',
			);

			document.getElementById('selected-months').textContent =
				months + (months === 1 ? ' month' : ' months');
		});
	});

	document.getElementById('back-btn').addEventListener('click', () => {
		document.getElementById('step-2').style.display = 'none';
		document.getElementById('step-1').style.display = 'block';
	});

	// Step 3: Confirmation
	document.getElementById('close-final').addEventListener('click', () => {
		window.parent.postMessage(
			{ type: 'BRAZE_BANNERS_SYSTEM:DISMISS_BANNER' },
			'*',
		);
	});

	// Message event handler
	window.addEventListener('message', (event) => {
		// Handle auth status
		if (
			event.data.type === 'BRAZE_BANNERS_SYSTEM:GET_AUTH_STATUS:RESPONSE'
		) {
			if (event.data.kind === 'SignedIn') {
				// Show reminder options
				document.getElementById('step-1').style.display = 'none';
				document.getElementById('step-2').style.display = 'block';
			} else {
				// Redirect to sign in
				alert('Please sign in to set a reminder.');
				window.location.href =
					'/signin?returnUrl=' + window.location.pathname;
			}
		}

		// Handle reminder creation
		if (
			event.data.type ===
			'BRAZE_BANNERS_SYSTEM:REMINDER_SUBSCRIBE:RESPONSE'
		) {
			if (event.data.success) {
				document.getElementById('step-2').style.display = 'none';
				document.getElementById('step-3').style.display = 'block';
			} else {
				alert('Failed to set reminder. Please try again.');
			}
		}
	});
</script>
```

### Best Practices

1.  **Always listen for responses**: Set up event listeners before sending requests to avoid missing responses.
2.  **Validate user state**: Check authentication status before attempting actions that require a signed-in user (e.g., newsletter subscriptions, reminders).
3.  **Handle errors gracefully**: Always handle both success and failure cases to provide good user experience.
4.  **Use origin validation**: When listening to `postMessage` events, verify the origin if security is critical.
5.  **Date format for reminders**: Always use ISO 8601 date format (YYYY-MM-DD) for `reminderPeriod`.
6.  **Clean up events**: Remove event listeners when they're no longer needed to prevent memory leaks.

## Usage for Developers

To add the Braze Banners System to a new slot:

1.  **Define the Placement**: Add a new member to the `BrazeBannersSystemPlacementId` enum.
2.  **Configure the Candidate**: Use `buildBrazeBannersSystemConfig` to create a candidate in the Message Picker.
3.  **Set Priority**: Ensure it is placed correctly in the `pickMessage` candidate list (typically before legacy implementations).

```typescript
// Example: Adding to a new slot
const brazeCandidate = buildBrazeBannersSystemConfig(
	braze,
	idApiUrl,
	contentType,
	shouldHideReaderRevenue,
	tags,
);
```

## Migration & Future Steps

-   **Phase 1 (Current)**: Hybrid state. `brazeBannersSystem` runs alongside `braze-components`.
-   **Phase 2**: Master template creation (Newsletter, Epic, App Download).
-   **Phase 3**: Deprecation of `braze-components` once all Canvases are migrated to Braze Banners.

---

**Value Team**
_Last Updated: February 2026_
