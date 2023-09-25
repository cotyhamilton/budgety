# Build
FROM node:19-alpine AS build
ARG BUILDKIT_SBOM_SCAN_STAGE=true
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --immutable --ignore-scripts
COPY . .
RUN yarn build

# Runtime
FROM node:19-alpine AS runtime
USER node:node
WORKDIR /app
COPY --from=build /app/package.json /app/entrypoint.js /app/build ./
EXPOSE 3000
CMD ["./entrypoint.js"]
