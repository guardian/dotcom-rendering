# Developing with Deno

Deno is a runtime for JavaScript, used here broadly as an alternative to Node.
At present Deno scripts are only used in this repo as part of github actions, 
where it is installed as part of the action setup. Given this, it should only 
be needed if you are working on these actions, so it is not currently added as 
a dependency for the main repo.


## Installation

To run locally, you will need to [install Deno](https://deno.land/#installation).
It is packaged as a single executable.


## IDE support

A Deno extension `denoland.vscode-deno` has been added to the recommended VSCode
extensions list in the root of this repo.


## Troubleshooting

The first time you open a Deno script in VSCode, it might red underline imports
from third-party sources hosted on the web. These need to be fetched and cached
locally, but once this has been done once, the relevant builds of these packages
[should automatically be cached for future use](https://deno.land/manual@v1.21.1/linking_to_external_code#linking-to-third-party-code).
