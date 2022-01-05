FROM node:16.8.0
RUN apt install g++ make python
WORKDIR '/app'
COPY ./package.json /app
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
