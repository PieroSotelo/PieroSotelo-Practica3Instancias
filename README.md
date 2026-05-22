LEVANTAMIENTO DEL PROYECTO EN 3 INSTANCIAS A LA NUBE


Levantamiento de la base de datos:

Como siempre iniciando daremos las definiciones de las instancias de esta manera a continuación se muestra la de la base de datos:

Nombre: BasededatosEVIprueba

Imagen: Ubuntu 24.04

Tipo de instancia: t3.medium

Par de claves: basededatosEVI


luego una vez levantando conectaremos a una IP elastica



luego agregamos el grupo de seguridad:



de esta manera podemos ya tener luego conectar a nuestro management y de esta manera poder subir nuestro dockerfile, nuestro dockerfile hiria de la siguiente manera:


FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=losQueens123!
ENV MSSQL_PID=Express 


luego aún de manera local en la terminal de VSC ejecutaremos los siguientes comandos:

docker build -t pierosotelo/sql-server:2022 .
docker push pierosotelo/sql-server:2022

luego lo conectaremos para poder subirlo a la nube(mobaXterm, Cmd, Powershell o Putty), de esta manera para ejecutar los comandos:

sudo apt update -y && sudo apt install -y docker.io
sudo systemctl start docker 
sudo systemctl enable docker 
sudo usermod -aG docker ubuntu 
newgrp docker 
docker --version 
docker pull pierosotelo/sql-server:2022 
docker run -d --name sql-server -e ACCEPT_EULA=Y -e SA_PASSWORD=losQueens123! -e MSSQL_PID=Express -p 1433:1433 -v sql_data:/var/opt/mssql --restart unless-stopped pierosotelo/sql-server:2022
docker ps 
docker start sql-server

luego una vez llegado a correr nos dirigimos a el management y nos conectaremos de la siguiente manera:

52.200.43.216, 1433
SA
losQueens123!

dentro de el ejecutaremos el SQL:

https://drive.google.com/file/d/1NtBWG4UB5wljg0hMhgKTsJdZnt8RDg8t/view?usp=sharing 










Levantamiento del backend:



una vez llegado a conectar a una IP elastica seguiremos con los grupos de seguridad:




luego de haber definido los grupos de seguridad haremos lo siguiente en la terminal:

mvn clean package -DskipTests

luego de eso crearemos una imagen:

docker build -t pierosotelo/losqueens-backendevi2:latest -f dockerfile-piero/Dockerfile .
docker push pierosotelo/losqueens-backendevi2:latest

luego en la nube haremos lo siguiente:

sudo apt update -y && sudo apt install -y docker.io 
sudo systemctl start docker 
sudo systemctl enable docker 
sudo usermod -aG docker ubuntu 
newgrp docker 
docker pull pierosotelo/losqueens-backendevi2:latest 
docker run -d --name backend -p 8080:8080 -e SPRING_DATASOURCE_URL="jdbc:sqlserver://172.31.1.143:1433;databaseName=losQueensAgroDB;encrypt=false;trustServerCertificate=true" -e SPRING_DATASOURCE_USERNAME=sa -e SPRING_DATASOURCE_PASSWORD=losQueens123! -e SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.microsoft.sqlserver.jdbc.SQLServerDriver -e SERVER_PORT=8080 --restart unless-stopped pierosotelo/losqueens-backend:latest
docker ps



FRONTEND:

Para poder empezar creamos la instancia del frontend y luego agregaremos el siguiente grupo de seguridad:



luego el dentro de nuestro proyecto usaremos el siguiente dockerfile:

FROM node:lts-alpine as build




WORKDIR /app




COPY package.json package-lock.json ./




RUN npm install




COPY . .




RUN npm run build -- --configuration production




FROM nginx:alpine




# Copiar los archivos compilados (nota: tu build genera en /browser)
COPY --from=build /app/dist/CRUD/browser /usr/share/nginx/html




# Crear script de entrada que reemplaza la URL del backend
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'echo "🔧 Backend URL: ${BACKEND_URL:-http://localhost:8080}"' >> /entrypoint.sh && \
    echo 'echo "📁 Reemplazando URL en archivos JavaScript..."' >> /entrypoint.sh && \
    echo 'find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:8080|${BACKEND_URL:-http://localhost:8080}|g" {} \;' >> /entrypoint.sh && \
    echo 'echo "✅ Reemplazo completado"' >> /entrypoint.sh && \
    echo 'echo "🚀 Iniciando Nginx..."' >> /entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh




EXPOSE 80




# Usar entrypoint en lugar de CMD
ENTRYPOINT ["/entrypoint.sh"]




luego en el .dockerignore:

# Dependencias
/node_modules
/npm-debug.log
.npm/
.vscode/


# Build artifacts
/dist
/tmp


# Archivos de log
/logs
*.log


# Otros
.git
.gitignore
.DS_Store




luego en la terminal damos los siguientes comandos:

docker build -t pierosotelo/losqueens-frontendevi2:latest . 
docker push pierosotelo/losqueens-frontendevi2:latest 

luego en la nube daremos los siguientes comandos:

sudo apt update -y && sudo apt install -y docker.io 
sudo systemctl start docker 
sudo systemctl enable docker 
sudo usermod -aG docker ubuntu 
newgrp docker 
docker pull pierosotelo/losqueens-frontendevi2:latest 
docker run -d -p 80:80 --name losqueensagro-frontend -e BACKEND_URL="http://52.22.229.227:8080" pierosotelo/losqueens-frontendevi2:latest 







IP DEL FRONTEND:
http://3.221.68.2/

IP DEL BACKEND:
http://52.22.229.227:8080/swagger-ui/index.html
docker ps

