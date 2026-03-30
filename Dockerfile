FROM node:18 AS build

WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone repo
RUN git clone https://github.com/Ramasamy3488/devops-reactapp.git .

# Go to React folder
WORKDIR /app/react-app

RUN npm install
RUN npm run build

# Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/react-app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]