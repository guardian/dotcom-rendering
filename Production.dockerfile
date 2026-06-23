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

# Finally, create the production image with only the necessary files
FROM dhi.io/node:24-alpine3.23 AS application
WORKDIR /app
COPY --from=builder --chown=node:node /app/dotcom-rendering/dist /app

# Disable logging with Log4js as console logs will be forwarded to Central ELK with a sidecar
# TODO Maintain metrics
ENV DISABLE_LOGGING_AND_METRICS=true

# Expose the port that the application listens on
EXPOSE 9000

CMD ["node", "/app/server.js"]
