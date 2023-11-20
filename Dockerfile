FROM node:18

WORKDIR /game-analysis

COPY . .
RUN npm install --production
RUN npm run build
CMD ["npm", "run"]