pipeline {
    agent any

        environment {
        WEB_IMAGE_NAME = "vii4442/portofolio-web"
        BACKEND_IMAGE_NAME = "vii4442/portofolio-backend"
        DOCKER_CRED_ID = "dockerhub-credentials"
        CUSTOM_TAG = "v1.0.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    echo 'Building Docker Images...'
                    // Build Frontend (Runs Linting)
                    sh "docker build --no-cache -t ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ."
                    
                    // Build Backend
                    sh "docker build --no-cache -t ${BACKEND_IMAGE_NAME}:test-${env.BUILD_NUMBER} ./backend"
                }
            }
        }

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

                    echo 'Pushing Docker Images...'
                    if (env.BRANCH_NAME == 'develop') {
                        // Push Frontend
                        sh "docker tag ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${WEB_IMAGE_NAME}:staging"
                        sh "docker push ${WEB_IMAGE_NAME}:staging"
                        
                        // Push Backend
                        sh "docker tag ${BACKEND_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${BACKEND_IMAGE_NAME}:staging"
                        sh "docker push ${BACKEND_IMAGE_NAME}:staging"
                    } else {
                        // Push Frontend
                        sh "docker tag ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${WEB_IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker tag ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${WEB_IMAGE_NAME}:latest"
                        sh "docker push ${WEB_IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker push ${WEB_IMAGE_NAME}:latest"

                        // Push Backend
                        sh "docker tag ${BACKEND_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${BACKEND_IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker tag ${BACKEND_IMAGE_NAME}:test-${env.BUILD_NUMBER} ${BACKEND_IMAGE_NAME}:latest"
                        sh "docker push ${BACKEND_IMAGE_NAME}:${CUSTOM_TAG}"
                        sh "docker push ${BACKEND_IMAGE_NAME}:latest"
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
                    echo 'Deploying to Staging (Complete Environment)...'
                    sh "docker pull ${WEB_IMAGE_NAME}:staging"
                    sh "docker pull ${BACKEND_IMAGE_NAME}:staging"
                    
                    // Paksa hapus container lama jika ada (frontend, backend, db)
                    sh "docker rm -f luthfie-portfolio-staging portofolio-backend-staging || true"
                    
                    // Gunakan credential untuk SECRET_KEY dan MONGO_DETAILS
                    // Gunakan credential untuk SECRET_KEY dan MONGO_DETAILS
                    withCredentials([
                        string(credentialsId: 'staging-secret-key', variable: 'SECRET_KEY'),
                        string(credentialsId: 'staging-mongo-details', variable: 'MONGO_DETAILS')
                    ]) {
                        // Deploy staging environment (Single Quote for Shell Interpolation)
                        sh 'IMAGE_TAG=staging STAGING_SECRET_KEY="$SECRET_KEY" STAGING_MONGO_DETAILS="$MONGO_DETAILS" docker compose -f docker-compose.staging.yml up -d --force-recreate'
                    }
                    
                    echo '✅ Staging deployed: http://vps-ip:8081'
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
                    sh "docker pull ${WEB_IMAGE_NAME}:${CUSTOM_TAG}"
                    sh "docker pull ${BACKEND_IMAGE_NAME}:${CUSTOM_TAG}"
                    
                    // Paksa hapus container lama jika ada
                    sh "docker rm -f luthfie-portfolio portofolio-backend || true"
                    
                    withCredentials([
                        string(credentialsId: 'prod-secret-key', variable: 'SECRET_KEY'),
                        string(credentialsId: 'prod-mongo-details', variable: 'MONGO_DETAILS')
                    ]) {
                        // Deploy baru production (Single Quote & Shell Variables)
                        sh 'IMAGE_TAG="' + CUSTOM_TAG + '" PROD_SECRET_KEY="$SECRET_KEY" PROD_MONGO_DETAILS="$MONGO_DETAILS" docker compose -f docker-compose.prod.yml up -d --force-recreate'
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up...'
                    sh 'docker logout'
                    sh "docker image rm ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} || true"
                    sh "docker image rm ${BACKEND_IMAGE_NAME}:test-${env.BUILD_NUMBER} || true"
                    sh 'docker image prune -f'
                }
            }
        }
    }
}
