FROM node:14

WORKDIR /usr/src/cryptoClient


COPY package*.json ./
COPY . .

RUN npm install

# Setting Ionic
RUN npm install -g @ionic/cli
# Show ionic cli command
EXPOSE 8100
CMD ["ionic","serve"]