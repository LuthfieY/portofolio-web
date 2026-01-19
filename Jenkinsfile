pipeline {
    agent any

    environment {
        IMAGE_NAME = "vii4442/portofolio-web"
        DOCKER_CRED_ID = "dockerhub-credentials"
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
                    // Build image tanpa tag dulu untuk testing, matikan cache biar aman
                    sh "docker build --no-cache -t ${IMAGE_NAME}:test-${env.BUILD_NUMBER} ."
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
                    // Paksa hapus container lama jika ada (biar tidak conflict)
                    sh "docker rm -f luthfie-portfolio-staging || true"
                    // Deploy baru
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
                    // Paksa hapus container lama jika ada
                    sh "docker rm -f luthfie-portfolio || true"
                    // Deploy baru
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
