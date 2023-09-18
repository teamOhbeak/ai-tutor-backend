FROM node:18-alpine

WORKDIR /app

#nginx 테스트를 위해...

#heapsize up
ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY package*.json ./

# CMD echo ls -al 
COPY ./ ./ 

RUN yarn \
    && yarn run build 
   

EXPOSE 3000 

CMD [ "yarn", "run", "start:prod" ]