FROM openjdk:21-jdk-slim
COPY target/services-0.0.1-SNAPSHOT.jar eccomerse.jar
EXPOSE 3001
ENTRYPOINT ["java", "-jar", "eccomerse.jar"]