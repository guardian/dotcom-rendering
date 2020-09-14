
# Being a QA/SETI on Dotcom

## Background on the SETI Role

The SETI, or 'Software Engineer Tools and Infrastructure' is a title shamelessly borrowed from Google to describe a breed of engineer that comes from a technical background, but focuses on solving problems instead of releasing features. Where the traditional SET (Software-Engineer-in-Test) role improves the quality of the final product by testing the end result, the SETI improves the quality of the development process itself by improving how we build, deploy and monitor our software.

Examples of work that a SETI might find themselves doing could include: setting up Continuous Integration and Deployment pipelines, writing tools that help developers diagnose issues faster, creating monitoring and alerting for production apps, refactoring code, and carrying out performance testing. What a SETI does not do is act as a blocker or gatekeeper to releasing work. A SETI does not typically review software changes to stamp them with a QA seal of approval, nor do they write unit tests all day. The Guardian trusts their own developers to be able to peer review each other's work, and write tests where appropriate.

At The Guardian, each SETI is embedded long-term into an existing product team. A SETI is expected to be able to work independently with little oversight to find, prioritise and solve quality issues that their team has.

## The Dotcomtext

The Guardian website is really relatively simple; although it's made up of a dozen different apps, each app only really has one core transaction which is 'get a web page'. It might be an article, a front, an interactive or whatever, but fundamentally 95% of what we do is just covered by that one transaction. We also only really have one remote dependency/api which is CAPI (although recently we've introduced Dotcom Rendering which probably counts). With so few moving parts or dependencies, there's nothing much that frequently breaks. We're quite different from a team that has to deal with outages occuring because of a myriad number of remote services. 

Because of this, a SETI coming onto the Dotcom team will initially have to some trouble working out how to add the most value, since there's nothing *obviously broken* or frequently failing. Instead, QA for the Dotcom team means finding ways to elevate the quality of the work that the team produces as a whole, rather than trying to find and fix what's broken.

In addition to this, with my background as a serverside dev, I've taken a special interest in dealing with guardian site incidents and outages, and I'm frequently the first person on the ground when the site breaks.

Overall, I'd say being a SETI on the Dotcom team for me has involved about 40% time on SRE/Devops work, 20% standard dev work, 20% stats and 20% human and process.

## Examples of SETI work done on the Dotcom team

* I introduced PRBuilds as a way to run various kinds of tests that require a fully running application stack (eg. load tests, a11y tests, amp validation etc) at the PR level, but disconnected from the main teamcity CI build.
* I maintain our alerts and dashboards.
* I wrote an API that does AMP validation of pages
* I built and maintained the feedpipe service which handles user feedback on the guardian website 
* I've written custom lint rules that force best practices on the Dotcom Rendering project
* I documented best practices with respect to site incidents and how to diagnose production issues
* I've made attempts to load test various guardian apps.
* I was heavily involved with the rollout of the Dotcom Rendering project to the world. Both in terms of overall strategy, and in developing the 'Picker' which allows us to do incremental feature support. In addition I provided most of the stats that the team used to help prioritise Dotcom Rendering work.

## Getting started on Dotcom

Advice for SETI new starters on Dotcom

* Spend the first month or so working on the same dev tasks as everyone else, being a normal engineer.
* Try and pair as much as possible.
* Organise your tasks in the same trello as the rest of the team, prioritise them with the team.
* Organise a voluntary 1to1 with somebody you work with on the team. Your QA line manager is too far disconnected from what you do.

## Resources

* [Dotcom Alerts & Monitoring](https://docs.google.com/presentation/d/1YtpEM1myWSzZQpFIqokN48PqdsEuvJzYUkCnjU8ypG4/edit?usp=sharing) (with speakers notes!)
* [The Google SRE Book](https://landing.google.com/sre/sre-book/toc/index.html)
* [Dotcom Incident Response & Triage Docs](https://github.com/guardian/frontend/blob/main/docs/01-start-here/08-incidents.md)
* [Dotcom Rendering Original Intoduction Tech Time](https://docs.google.com/presentation/d/1YBe3WxeoxmzR327nXZbSVIvr69OT0M6FOLFr3qQVctI/edit?usp=sharing) (with speakers notes!)
* [Dotcom Rendering Architecture Docs](https://github.com/guardian/dotcom-rendering/tree/main/docs/architecture)
