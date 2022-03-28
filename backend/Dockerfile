FROM maven:3.6.0-jdk-11-slim

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN mvn -f /app/pom.xml clean package

ENTRYPOINT ["java","-jar","/app/target/greenhouse-first.jar"]