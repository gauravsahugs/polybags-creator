FROM node

RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app
COPY . ./
# Node related changes
RUN node --version
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm cache clear --force
RUN npm install -g n
RUN n 14.15.4
RUN node --version
RUN npm install --legacy-peer-deps
# RUN npm install -g npm@7.12.0
# RUN npm install moment@2.24.0
# RUN npm install plotly.js-basic-dist@1.58.4
# RUN npm install react-plotly.js@2.5.1
 
# RUN cd server && npm run install-app

EXPOSE 3000
# CMD [ "node", "server/index" ]
CMD [ "npm", "run", "start"]