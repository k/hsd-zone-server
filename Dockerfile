FROM node:10

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn
COPY . .
CMD ["node", "index.js"]
