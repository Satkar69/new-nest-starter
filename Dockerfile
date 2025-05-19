# build
FROM node:20-alpine3.17 AS build

# set working directory
WORKDIR /app/src

#  Copy 
COPY . /app/src/


# install nest js silent
RUN npm install -g @nestjs/cli --silent

# install dependencies
RUN npm ci --legacy-peer-deps

# build
RUN npm run build


#Production
FROM node:20-alpine3.17

WORKDIR /app/src

COPY --from=build /app/src/dist ./dist

COPY package*.json ./

COPY .env ./

RUN npm ci --legacy-peer-deps --omit=dev

EXPOSE 8080

CMD ["npm", "run", "start:prod"]