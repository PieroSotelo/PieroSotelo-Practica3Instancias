FROM pierosotelo/maven:3.9-amazoncorretto-25-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM pierosotelo/eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

#docker pull pierosotelo/eclipse-temurin:25-jre-alpine
#docker tag  5fcc27581b23 pierosotelo/eclipse-temurin:25-jre-alpine
#docker push pierosotelo/eclipse-temurin:25-jre-alpine

#docker pull maven:3.9-amazoncorretto-25-alpine
#docker tag 26a8590fe36d pierosotelo/maven:3.9-amazoncorretto-25-alpine
#docker push pierosotelo/maven:3.9-amazoncorretto-25-alpine

#Construir una imágen generada meidante una carpeta/Dockerfile
# docker build -t pierosotelo/springboot-sqlserver:3.0 -f dockerfile-piero/Dockerfile .






# docker build -t pierosotelo/springboot-sqlserver:1.0 .

#mvn clean package -DskipTests

# docker run -d --name springboot-sqlserver -p 8085:8085 pierosotelo/springboot-sqlserver:1.0

# docker push pierosotelo/springboot-sqlserver:1.0