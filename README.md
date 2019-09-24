# apps-rendering

### Running
- Working on node v10.16.3 (nvm use 10.16.3)
- You will need `mobile` Janus credentials to run this project
1. npm i
2. npm run build:server (watches for changes)
3. http://localhost:3040

### Architecture decisions

- Emotion styles combined with components
  - Easy to migrate current SASS styles
  - JavaScript to replicate variables and mixins
  - Closely coupled to components
  - Supports media queries for dark mode styles https://emotion.sh/docs/media-queries

- Use React for UI components
  - Redux and useReducer probably unnecessary
  - Preference for functional hooks rather than class components
  - Preference to avoid rehydration of SSR components where possible
  - Context API can be used to pass pillar styles to all components

- Testing
  - Jest

- Security
  - NPM, Snyk, GitHub