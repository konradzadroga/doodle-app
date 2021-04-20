FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/doodle-app.jar doodle-app.jar
ENTRYPOINT ["java", "-jar", "doodle-app.jar"]

