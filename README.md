# apps-rendering

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
