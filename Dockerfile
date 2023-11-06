# Build
FROM node:18-alpine AS build
ARG BUILDKIT_SBOM_SCAN_STAGE=true
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --immutable --ignore-scripts
COPY . .
RUN yarn build

# Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --immutable --ignore-scripts --production

# Runtime
FROM node:18-alpine AS runtime
USER node:node
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/entrypoint.js /app/build ./
EXPOSE 3000
CMD ["./entrypoint.js"]
