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
                    
                    def n8nWebhookCredId = (env.BRANCH_NAME == 'develop') ? 'staging-n8n-webhook-url' : (env.BRANCH_NAME == 'main') ? 'prod-n8n-webhook-url' : 'staging-n8n-webhook-url'
                    
                    try {
                        withCredentials([string(credentialsId: n8nWebhookCredId, variable: 'N8N_WEBHOOK_URL')]) {
                            // Build Frontend (Runs Linting)
                            sh "docker build --no-cache --build-arg VITE_N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL -t ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ."
                        }
                    } catch (Exception e) {
                        echo "Warning: Could not find credential ${n8nWebhookCredId}. Using placeholder."
                        sh "docker build --no-cache --build-arg VITE_N8N_WEBHOOK_URL='http://localhost:5678/webhook/placeholder' -t ${WEB_IMAGE_NAME}:test-${env.BUILD_NUMBER} ."
                    }
                    
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
                    
                    sh "docker rm -f luthfie-portfolio-staging portofolio-backend-staging || true"
                    
                    withCredentials([
                        string(credentialsId: 'staging-secret-key', variable: 'SECRET_KEY'),
                        string(credentialsId: 'staging-mongo-details', variable: 'MONGO_DETAILS'),
                        string(credentialsId: 'staging-n8n-webhook-host', variable: 'N8N_WEBHOOK_HOST'),
                        string(credentialsId: 'staging-google-api-key', variable: 'GOOGLE_API_KEY')
                    ]) {
                        // Deploy staging environment (Single Quote for Shell Interpolation)
                        // Menggunakan docker-compose (hyphen) karena V2 plugin mungkin tidak tersedia
                        sh 'IMAGE_TAG=staging STAGING_SECRET_KEY="$SECRET_KEY" STAGING_MONGO_DETAILS="$MONGO_DETAILS" STAGING_N8N_WEBHOOK_HOST="$N8N_WEBHOOK_HOST" STAGING_GOOGLE_API_KEY="$GOOGLE_API_KEY" docker-compose -f docker-compose.staging.yml up -d --force-recreate'
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
                        string(credentialsId: 'prod-mongo-details', variable: 'MONGO_DETAILS'),
                        string(credentialsId: 'prod-n8n-webhook-host', variable: 'N8N_WEBHOOK_HOST'),
                        string(credentialsId: 'prod-google-api-key', variable: 'GOOGLE_API_KEY')
                    ]) {
                        // Deploy baru production (Single Quote & Shell Variables)
                        sh 'IMAGE_TAG="' + CUSTOM_TAG + '" PROD_SECRET_KEY="$SECRET_KEY" PROD_MONGO_DETAILS="$MONGO_DETAILS" PROD_N8N_WEBHOOK_HOST="$N8N_WEBHOOK_HOST" PROD_GOOGLE_API_KEY="$GOOGLE_API_KEY" docker-compose -f docker-compose.prod.yml up -d --force-recreate'
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
