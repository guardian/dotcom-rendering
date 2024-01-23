## What does this change?

## Why?

## Screenshots

| Before      | After      |
| ----------- | ---------- |
| ![before][] | ![after][] |

[before]: https://example.com/before.png
[after]: https://example.com/after.png

<!--
You can add extra rows by repeating the last row in the table and then using new unique labels. E.g.

| ![before2][] | ![after2][] |

You can then reference the labels and map them to corresponding links.

[before2]: https://example.com/before2.png
[after2]: https://example.com/after2.png
-->

<!--
## Running Chromatic

In order to run Chromatic as part of the CI checks, you will need to add the `run_chromatic` label to your PR. Once the label is added Chromatic will run on every push.

Please only add this once you are ready to check for visual regressions, our intention here is to reduce the amount of time Chromatic is run without being looked at.
-->

<!--
## Unexplained Chromatic diffs

We use Chromatic for visual regression testing on our Storybook stories. It's
generally pretty good, but it sometimes gives 'false positives' -- it seems to
detect a change in a component which hasn't changed, or which hasn't been
affected by the code in your PR.

If you've looked at the Chromatic diffs and can't see any connection to your
code, please reach out to a member of the Web Experiences team, who will be able
to advise. It would also be helpful to add the false positive to our
[ongoing log of false positives](https://docs.google.com/spreadsheets/d/1FvItNTMFXIpI4rCrZ4mQ0CRouT06sSVro168f6oKPm4/edit?usp=drive_open&ouid=117150399571694275917#gid=0).
-->
