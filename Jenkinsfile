pipeline {
    agent any

    environment {
        // Ganti dengan username DockerHub Anda / nama repository
        IMAGE_NAME = "vii4442/portofolio-web"
        // ID Credentials yang disimpan di Jenkins
        DOCKER_CRED_ID = "dockerhub-credentials"
        // Versi Otomatis: v1.0.1, v1.0.2, dll
        CUSTOM_TAG = "v1.0.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Stage Build & Test (Jalan di SEMUA Branch)
        // Linting otomatis jalan karena ada 'RUN npm run lint' di Dockerfile
        stage('Build & Test') {
            steps {
                script {
                    echo 'Building Docker Image (Runs Linting)...'
                    // Build image tanpa tag dulu untuk testing
                    sh "docker build -t ${IMAGE_NAME}:test-${env.BUILD_NUMBER} ."
                }
            }
        }

        // Stage Push Image (Hanya develop & main)
        stage('Push Image') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                script {
                    echo 'Logging in to DockerHub...'
                    withCredentials([usernamePassword(credentialsId: DOCKER_CRED_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                         if (isUnix()) {
                            sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                         } else {
                            bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                         }
                    }

                    echo 'Pushing Docker Image...'
                    // Retag image test tadi ke tag yang sesuai
                    if (env.BRANCH_NAME == 'develop') {
                        sh "docker tag ${IMAGE_NAME}:test-${env.BUILD_NUMBER} ${IMAGE_NAME}:staging"
                        sh "docker push ${IMAGE_NAME}:staging"
                    } else {
                        sh "docker tag ${IMAGE_NAME}:test-${env.BUILD_NUMBER} ${IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker tag ${IMAGE_NAME}:test-${env.BUILD_NUMBER} ${IMAGE_NAME}:latest"
                        sh "docker push ${IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Deploy Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo 'Deploying to Staging (Port 8081)...'
                    sh "docker pull ${IMAGE_NAME}:staging"
                    // Paksa pakai tag staging dan recreate container
                    sh "IMAGE_TAG=staging docker-compose -f docker-compose.staging.yml up -d --force-recreate"
                }
            }
        }

        stage('Deploy Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy Now!'
                script {
                    echo "Deploying to Production (${CUSTOM_TAG})..."
                    sh "docker pull ${IMAGE_NAME}:${CUSTOM_TAG}"
                    // Paksa pakai tag versi spesifik (v1.0.X) agar aman
                    sh "IMAGE_TAG=${CUSTOM_TAG} docker-compose up -d --force-recreate"
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up...'
                    sh 'docker logout'
                    sh "docker image rm ${IMAGE_NAME}:test-${env.BUILD_NUMBER} || true"
                    sh 'docker image prune -f'
                }
            }
        }
    }
}
