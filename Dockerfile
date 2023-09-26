FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --update python3 make g++ \
  && rm -rf /var/cache/apk/* \
  && npm run build \
  && npm prune --production 

FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

# Create a new user with UID 10014
RUN addgroup -g 10014 choreo && \
    adduser  --disabled-password  --no-create-home --uid 10014 --ingroup choreo choreouser
# Set a non-root user
USER 10014

EXPOSE 4000

CMD ["node", "dist/main.js"]