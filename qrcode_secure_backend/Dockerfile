FROM node:16.8.0
RUN apt install g++ make python
WORKDIR '/app'
COPY ./package.json /app
RUN npm install
RUN npm postinstall
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
CMD ["npm", "run", "start"]
