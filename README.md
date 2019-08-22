# apps-rendering

### Running
Working on node v8.15.0 (nvm use 8.15.0)
1. npm i
2. npm run compileClient (watches for changes)
3. npm run dev (compiles and runs server)
4. http://localhost:3040

### Initial architecture discussions 

- Emotion styles combined with components
  - Easy to migrate current SASS styles
  - JavaScript to replicate variables and mixins
  - Closely coupled to components
  - Supports media queries for dark mode styles https://emotion.sh/docs/media-queries

- Use React for UI components
  - Redux and useReducer probably unnecessary
  - Preference for functional hooks rather than class components
  - Context API unnecessary for dark mode prop but might be useful to beam device settings down to components

- Testing
  - Jest/React-testing-library?

- Security
  - NPM/Snyk/GitHub/All?