FROM dhi.io/node:24-alpine3.23-dev AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Install dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /pnpm/store to speed up subsequent builds.
FROM base AS dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
WORKDIR /app/dotcom-rendering
ENV PATH="node_modules/.bin:$PATH"
ENV NODE_ENV=production

# Build the application
FROM dependencies AS builder
RUN webpack --config webpack/webpack.config.js --progress
RUN node scripts/islands/island-descriptions.mjs
# Compile instrumentation separately (OTel packages can't be webpack-bundled due to circular deps)
RUN swc ./src/server/instrumentation.ts -o dist/instrumentation.js -C jsc.parser.syntax=typescript -C jsc.target=es2022 -C module.type=commonjs

# Hoisted node_modules for production (flat layout, no symlinks)
FROM base AS hoisted-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --config.node-linker=hoisted --config.shamefully-hoist=true

# Finally, create the production image with only the necessary files
FROM dhi.io/node:24-alpine3.23 AS application
WORKDIR /app
COPY --from=builder --chown=node:node /app/dotcom-rendering/dist /app
COPY --from=hoisted-deps --chown=node:node /app/node_modules /app/node_modules

ENV NODE_ENV=production

# Expose the port that the application listens on
EXPOSE 9000

CMD ["node", "--require", "/app/instrumentation.js", "/app/server.js"]
