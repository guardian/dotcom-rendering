# What goes in pasteup?
Anything that either generates style primitives or can be used to generate style primitives and is plain javascript (including JSON). For the most part this is pretty unambiguous: Colours, sizes, grid, etc all fit the bill. Font mappings are a good candidate too. Do NOT use paste up for components (as of Feb ‘19).
Think of pasteup as a base foundation you can use to build components with the tech stack of your choice.

# Releasing pasteup
After your PR gets approved, but before merging run

```
make release-pasteup
```
This will ask you to up the version of pasteup. We use (semver)[https://semver.org] and you can check a quick reference below.

That's it! Pasteup is now in [NPM](https://www.npmjs.com/package/@guardian/pasteup). There's a couple loose ends we need to deal with to tidy everything up:

Your branch will have a commit with a change to pasteup's `package.json` reflecting the new version. Right now we use alpha versions so you have to update the dependency version in `package.json` in `guui` and `frontend` too. With that done, push your changes to the packages & merge.

Your changes will ripple to dotcom-rendering immediately. For other projects you must notify other consumers of the library of the updated version. At the moment that includes:

- support-frontend (reader revenue teams)

TBD: Should we create an email address? Do we have one?
TBD: Should we release via riffraff or travis? What are the downsides? How hard is this to set up?


# Versioning rules of thumb
Given the cross-cutting nature of this project, we are committed to avoiding breaking changes as that would erode trust from potential consumers:
- PATCH for anything that tweaks the current value of a token (use common sense! If we rebrand green tomorrow that is bigger than a patch)
- MINOR version for anything that adds a new token or function. 
- MAJOR version for anything that will “break” the library in a way that will require consumers to do bigger changes than just upping the version, this includes severely changing metrics

## Migrations
For things like renames & adding function parameters etc it is crucial that we are able to release those in a backwards compatible manner. A simple way to do this is keeping the old names around pointing to the new ones and logging deprecation warnings.
