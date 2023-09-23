# Build
FROM node:18-alpine as build
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Runtime
FROM node:18-alpine as runtime
USER node:node
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json /app/entrypoint.js /app/build ./
EXPOSE 3000
CMD ["node", "entrypoint.js"]