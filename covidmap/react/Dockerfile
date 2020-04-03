FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@2.1.8 -g --silent
# Copy app source code
COPY . .



EXPOSE 80



CMD [ "npm","start" ]
