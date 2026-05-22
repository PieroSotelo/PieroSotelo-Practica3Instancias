# Stage 1: Build with Maven
FROM luis280707/maven:3.9-amazoncorretto-25-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with Java
FROM luis280707/eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]


# docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Admin12345" -p 1433:1433 --name sqlserver -d luis280707/sql-server:2022

# docker build -t luis280707/springboot-sqlserver:1.0 .

# docker run -d --name springboot-sqlserver -p 8080:8080 luis280707/springboot-sqlserver:1.0

# docker push luis280707/springboot-sqlserver:1.0

# Eliminar ejemplo

# docker rm -f springboot-sqlserver

# docker rm -f sqlserver

# docker rmi luis280707/springboot-sqlserver:1.0

#DESCARGAR Y SUBIR MAVEN A TU USUARIO DOCKERHUB
# docker pull maven:3.9-amazoncorretto-25-alpine
# docker tag  26a8590fe36d luis280707/maven:3.9-amazoncorretto-25-alpine
# docker push luis280707/maven:3.9-amazoncorretto-25-alpine

# DESCARGAR Y SUBIR JDK25 A TU USUARIO DOCKERHUB
# docker pull eclipse-temurin:25-jre-alpine
# docker tag 5fcc27581b23 luis280707/eclipse-temurin:25-jre-alpine
# docker push luis280707/eclipse-temurin:25-jre-alpine

# docker build -t luis280707/springboot-sqlserver:3.0 -f Dockerfile-luis/Dockerfile .
