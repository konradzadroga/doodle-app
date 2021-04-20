# Doodle Inspired Application
Application inspired by 'Doodle' which is web application for planning meetings.

Technology stack:
- Java 11, SpringBoot 2.3.1. (backend),
- TypeScript, HTML, CSS, Angular 11 (frontend),
- MySQL 8.0 (database).

It's being deployed using Jenkins to VM on Google Cloud.

Stages:
- build backend application,
- build frontend application,
- build backend Docker container and push it to DockerHub registry,
- build frontend Docker container and push it to DockerHub registry,
- deploy application on remote machine using SSH and Docker Compose.
