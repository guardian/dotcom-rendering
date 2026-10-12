// Keep this as a bare import so Vite can prebundle the CommonJS `buffer`
// package before the injection plugin consumes it as a named ESM export.
export { Buffer } from 'buffer';
