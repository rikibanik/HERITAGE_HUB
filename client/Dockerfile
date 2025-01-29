# Build stage
FROM node:20 as build
ARG REACT_APP_API_PROXY
ENV REACT_APP_API_PROXY=$REACT_APP_API_PROXY
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]