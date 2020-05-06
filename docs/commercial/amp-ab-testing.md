# Amp AB Testing

This aims to describe the process around A/B testing in AMP using the `amp-experiment` tag. Code for the logic around this lives in the AMP project [here](../../src/amp/lib/experiment.ts), with experiment definitions located in [experimentConfig.ts](../../src/amp/experimentConfigs.ts).

## Implementing AB Tests

AB testing in AMP is implemented using the [`amp-experiment` tag](https://amp.dev/documentation/components/amp-experiment/) which allows us to split AMP into AB variants based on a configuration defined in a JSON object e.g.

```html
<amp-experiment>
    <script type="application/json">
        {
          "aExperiment": {
            "sticky": true,
            "consentNotificationId": "consent-notif",
            "variants": {
              "treatment1": 12.5,
              "treatment2": 12.5,
              "treatment3": 25.0
            }
          },
          "bExperiment": {...}
        }
    </script>
</amp-experiment>
```

Each experiment and variant is then exposed as an attribute of the body element

```html
<body amp-x-aExperiment="treatment1" amp-x-bExperiment="treatment3"></body>
```

and is styled using CSS that uses this

```css
body[amp-x-aExperiment='treatment1'] .test-banner {
    display: none;
}
```

To keep the CSS code coupled to the AB test configuration we've defined the `StyledExperiment` data structure to define the config of a given experiment. This is written into [experimentConfig.ts](../../src/amp/experimentConfigs.ts), where the overall key is the name of a given experiment:

```javascript
"experimentName": {
    sticky: boolean,
    consentNotificationId: string,
    variants: {
        "variantName": {
                proportion: number,
                style: string
            }
        }
    }
```

This is then parsed by the `getAllActiveExperiments` and `getAllActiveCss` functions to pull out the AMP compatible JSON and CSS information for all tests that are turned on in `config.switches`.

### 0% Testing

AMP requires that all proportions be greater than zero meaning that a true 0% AB test is impossible.Instead, we just set the proportion for an AB test to be extremely low e.g. 0.0000001.

### Forcing a variant

As per the AMP documentation, it is possible to turn on a variant by changing the URL of the page.
Turn turn on a specific experiment and variant we use the following URL convention:

```javascript
`https://example.com/amparticle#amp-x-${experimentName}=${variantName}`;
```

## Reporting

WIP
