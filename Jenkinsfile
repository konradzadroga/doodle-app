pipeline {

    agent any

    tools {
        maven 'maven-3-6-3'
        jdk 'openjdk-11'
    }

    environment {
	    DB_PASSWORD = credentials('db-password')
        SERVER_IP = credentials('server-ip')
        BACKEND_IMAGE_NAME = credentials('backend-image')
        FRONTEND_IMAGE_NAME = credentials('frontend-image')
    }

    stages {
        stage("Adjust Docker Compose file") {
            steps {
                dir("./app") {
                    sh '''
                        sed -i "s|backend-image|${BACKEND_IMAGE_NAME}|g" ./docker-compose.yml
                        sed -i "s|frontend-image|${FRONTEND_IMAGE_NAME}|g" ./docker-compose.yml
                        sed -i "s|database_password_goes_here|${DB_PASSWORD}|g" ./docker-compose.yml
                    ''' 
                }
            }
        }

        stage("Build SpringBoot application") {
            when {
                changeset "app/backend/**"
            }
            steps {
                dir("./app/backend") {
                    sh '''
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/main/java/app/config/security/WebSecurityConfig.java
                        sed -i "s|database_password_goes_here|${DB_PASSWORD}|g" ./src/main/resources/application.properties
                        mvn clean install
                    '''
                }
            }
        }

        stage("Build Angular application") {
            when {
                changeset "app/frontend/**"
            }
            steps {
                dir("./app/frontend") {
                    sh '''
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/app/services/user.service.ts
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/app/services/meeting.service.ts
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/app/services/proposed-date.service.ts
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/app/services/vote.service.ts
                        sed -i "s|value_goes_here|${SERVER_IP}|g" ./src/app/auth/auth.service.ts
                    '''
                    nodejs('node-15-14-0') {
                        sh '''
                            npm install -g @angular/cli
                            npm install
                            ng build
                        '''
                    }
                }
            }
        }

        stage("Build SpringBoot app Docker container") {
            when {
                changeset "app/backend/**"
            }
            steps {
                dir("./app/backend") {
                    script {
                        docker.withRegistry("https://registry-1.docker.io/v2/", 'docker') {
                            def backendImage = docker.build "${BACKEND_IMAGE_NAME}"
                            backendImage.push()
                        }
                    }
                }
            }
        }

        stage("Build Angular app Docker container") {
            when {
                changeset "app/frontend/**"
            }
            steps {
                dir("./app/frontend") {
                    script {
                        docker.withRegistry("https://registry-1.docker.io/v2/", 'docker') {
                            def frontendImage = docker.build "${FRONTEND_IMAGE_NAME}"
                            frontendImage.push()
                        } 
                    }
                }
            }
       }

       stage("Deploy to Google Cloud") {
            steps {
                withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'gcp-key', \
                                             keyFileVariable: 'ssh_key', \
                                             usernameVariable: 'ssh_username')]) {
                    sh '''
                        rsync -O -zvhr -auv -e "ssh -i ${ssh_key}" app/docker-compose.yml ${ssh_username}@${SERVER_IP}:/home/${ssh_username}/
                        ssh -oStrictHostKeyChecking=no -i ${ssh_key} ${ssh_username}@${SERVER_IP} 'bash -s' < deploy_jenkins.sh
                    '''     
                }
            }
       }
    }

    post {
        always {
            echo 'Check logs for more'
        }

        success {
            echo 'Job suceeded'
        }
    }
}
