# FROM node:18 as build
# WORKDIR /app
# RUN apt-get update && apt-get install git -y
# RUN git clone https://github.com/Ramasamy3488/devops-reactapp.git .
# RUN npm install
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/devops-reactapp/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:18 as build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# git clone https://github.com/Ramasamy3488/devops-reactapp.git
# cd devops-reactapp

# docker build -t react-app .
