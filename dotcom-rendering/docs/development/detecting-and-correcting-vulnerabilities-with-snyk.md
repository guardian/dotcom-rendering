# Detecting and correcting vulnerabilities with Snyk

_note: the following documentation is based on the PR [here](https://github.com/guardian/dotcom-rendering/pull/3116)_

## Snyk background

**Snyk** is a security tool to identify security vulnerabilities within your code dependencies and, where possible, suggest upgrades or patches to fix these vulnerabilities.

Implementations of Snyk: There are various including on Snyk's own servers or as part of continuous deployment. The two I am familiar with are running Snyk as part of continuous integration process (Github actions) or by developers manually using the Snyk CLI (often as part of a rota).

The problem(s): In a reasonably well-maintained and contemporary codebase, it is more often than not the case that there are no fixes available for the problems Snyk can identify. As it is a robust tool, it can generally identify quite a few problems. This means Snyk will become very noisy about things that developers have no recourse to fix (short of rewriting the library/plugin/dependency the codebase is reliant on).

In the case of the continuous integration implementation above, Snyk vulnerabilities will result in a "failing" Github action, which may cause a developer to think the build is broken, or over time, will rightly cause a developer to ignore this action entirely, as the "fail" has taught them that there is not actually a problem they can fix. As we "code in the open," it is also the case that we are revealing to the world known unfixed vulnerabilities in our codebase, although infosec has informed us they do not view this as a concern that outweighs the benefits of this implementation -- the benefits being the frequent reminders to devs that the codebase has vulnerabilities.

## Snyk wizard rota (adopted approach)

An alternative approach is to implement a rota for developers to manually run Snyk wizard via the CLI. Snyk has been added as a dev dependency, so once it is installed, you may run with:

```
make snyk
```

Running `make snyk` takes you through all your codebase vulnerabilities one-by-one and gives you the option to upgrade and patch where available. For all other packages, it gives you the choice to ignore the vulnerability completely _or_ to add them to a Snyk policy file (`.snyk`) with an ignore expiration of 30 days. Choosing the latter means that you are acknowledging that the vulnerability has been reported and that there is nothing that can be done for it immediately, and that we are comfortable "skipping" this check for 30 days, when we can check again to see if a patch has been released.

**In the case that a patch or upgrade is available** it is important that we either have confidence that our tests or codebase will uncover if the upgrade is a "breaking change" or not.

Before adding any new packages, you can also use sneak to test for vulnerabilities, which is a good thing to incorporate into your dev workflow

```
$ snyk test lodash  # test latest
$ snyk test lodash@1.0.1 # test specific version
```
