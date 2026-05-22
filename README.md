🚀 Levantamiento del Proyecto en 3 Instancias a la Nube
Integrante: Piero Jesus Sotelo Medrano

📋 Descripción del Proyecto
Despliegue de una aplicación web completa en AWS distribuida en 3 instancias EC2 independientes:

🗄️ BaseDatos — Microsoft SQL Server 2022 en Docker
⚙️ Backend — Spring Boot expuesto en el puerto 8080
🌐 Frontend — Angular compilado y servido con Nginx en el puerto 80


🛠️ Tecnologías Utilizadas
CapaTecnologíaCloudAWS EC2 (Ubuntu 24.04, t3.medium) + IPs ElásticasContenedoresDocker + Docker HubBase de DatosMicrosoft SQL Server 2022BackendSpring Boot + MavenFrontendAngular + NginxAPI DocsSwagger UI

📦 Pasos de Despliegue
🗄️ 1. Base de Datos
Configuración de instancia:

Nombre: BasededatosEVIprueba
Imagen: Ubuntu 24.04 | Tipo: t3.medium | Par de claves: basededatosEVI

Dockerfile:
dockerfileFROM mcr.microsoft.com/mssql/server:2022-latest
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=losQueens123!
ENV MSSQL_PID=Express
Construir y publicar imagen (local):
bashdocker build -t pierosotelo/sql-server:2022 .
docker push pierosotelo/sql-server:2022
Preparar instancia EC2 y desplegar:
bashsudo apt update -y && sudo apt install -y docker.io
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker ubuntu && newgrp docker

docker pull pierosotelo/sql-server:2022
docker run -d --name sql-server \
  -e ACCEPT_EULA=Y \
  -e SA_PASSWORD=losQueens123! \
  -e MSSQL_PID=Express \
  -p 1433:1433 \
  -v sql_data:/var/opt/mssql \
  --restart unless-stopped \
  pierosotelo/sql-server:2022

docker ps
Conexión desde SQL Server Management Studio:
Servidor:    52.200.43.216, 1433
Usuario:     SA
Contraseña:  losQueens123!

⚙️ 2. Backend
Compilar el proyecto:
bashmvn clean package -DskipTests
Construir y publicar imagen:
bashdocker build -t pierosotelo/losqueens-backendevi2:latest -f dockerfile-piero/Dockerfile .
docker push pierosotelo/losqueens-backendevi2:latest
Preparar instancia EC2 y desplegar:
bashsudo apt update -y && sudo apt install -y docker.io
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker ubuntu && newgrp docker

docker pull pierosotelo/losqueens-backendevi2:latest
docker run -d --name backend -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="jdbc:sqlserver://172.31.1.143:1433;databaseName=losQueensAgroDB;encrypt=false;trustServerCertificate=true" \
  -e SPRING_DATASOURCE_USERNAME=sa \
  -e SPRING_DATASOURCE_PASSWORD=losQueens123! \
  -e SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.microsoft.sqlserver.jdbc.SQLServerDriver \
  -e SERVER_PORT=8080 \
  --restart unless-stopped \
  pierosotelo/losqueens-backendevi2:latest

docker ps

🌐 3. Frontend
Dockerfile:
dockerfileFROM node:lts-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/CRUD/browser /usr/share/nginx/html

RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:8080|${BACKEND_URL:-http://localhost:8080}|g" {} ;' >> /entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
.dockerignore:
/node_modules
/dist
/tmp
.git
.gitignore
*.log
.vscode/
Construir y publicar imagen:
bashdocker build -t pierosotelo/losqueens-frontendevi2:latest .
docker push pierosotelo/losqueens-frontendevi2:latest
Preparar instancia EC2 y desplegar:
bashsudo apt update -y && sudo apt install -y docker.io
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker ubuntu && newgrp docker

docker pull pierosotelo/losqueens-frontendevi2:latest
docker run -d -p 80:80 --name losqueensagro-frontend \
  -e BACKEND_URL="http://52.22.229.227:8080" \
  pierosotelo/losqueens-frontendevi2:latest

docker ps

🐳 Comandos Docker Utilizados
ComandoDescripcióndocker build -t <imagen> .Construye imagen desde Dockerfiledocker push <imagen>Publica imagen en Docker Hubdocker pull <imagen>Descarga imagen desde Docker Hubdocker run -d ...Ejecuta contenedor en segundo planodocker psLista contenedores en ejecucióndocker start <nombre>Inicia un contenedor detenido--restart unless-stoppedReinicio automático salvo parada manual-v sql_data:/var/opt/mssqlVolumen persistente para datos-e VAR=valorPasa variable de entorno al contenedor-p host:containerMapea puerto del host al contenedor

✅ Evidencia de Funcionamiento
ServicioURL


🌐 Frontendhttp://3.221.68.2/


⚙️ Backend (Swagger)http://52.22.229.227:8080/swagger-ui/index.html


🗄️ Base de Datos52.200.43.216, 1433 (via SSMS)
