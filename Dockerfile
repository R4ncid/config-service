FROM node:10-alpine
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn --no-dev
COPY . /app
CMD ["yarn", "start"]