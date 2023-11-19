# Build
FROM node:18-alpine AS build
ARG BUILDKIT_SBOM_SCAN_STAGE=true
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --immutable --ignore-scripts
COPY . .
RUN yarn build

# Runtime
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
