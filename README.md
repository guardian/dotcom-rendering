# apps-rendering

### Running
Working on node v8.15.0 (nvm use 8.15.0)
1. npm i
2. npm run compileClient
3. npm run dev

### Initial architecture discussions 

- Start with SASS files alongside JavaScript components
  - Existing SASS codebase with mixins
  - Work to add dark mode styles in SASS
  - Experience in team
  - Will be closely coupled to components that will make migration to emotion easier
  - Emotion supports media queries for dark mode https://emotion.sh/docs/media-queries

- Use React for UI components
  - Redux and useReducer probably unnecessary
  - Preference for functional hooks rather than class components
  - Context API unnecessary for dark mode prop but might be useful to beam device settings down to components

- Testing
  - Jest/React-testing-library?

- Security
  - NPM/Snyk/GitHub/All?
