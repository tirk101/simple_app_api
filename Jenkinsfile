pipeline {
    agent label 'tester'
    
    environment {
        DOCKER_IMAGE = 'flask-simple-api'
        DOCKER_REPOS = ''
    }
    
    stages {
        stage('Clone simple-api') {
            steps {
                script {
                    git url: 'https://github.com/tirk101/simple_app_api.git', branch: 'main'
                }
            }
        }

        stage('Run unit-test') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker image & container') {
            steps {
                script {
                    sh 'docker compose -f ./docker-compose.dev.yaml up -d --build'
                }
            }
        }

        stage('Clone simple-api-robot') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/tirk101/simple_robot_tests.git'
                }
            }
        }

        stage('Run robot test') {
            steps {
                script {
                    sh 'cd ./simple_robot_tests'
                    sh 'python3 -m robot ./test_api.robot'
                }
            }
        }

        stage('Push new image to registry') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                    sh 'docker push ${DOCKER_REPOS}'
                }
            }
        }

        stage('Update app on PreProd') {
            agent label 'preprod'
            script {
                sh 'docker compose down'
                sh 'docker system prune -a -f'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            script{
                sh 'docker compose -f ./docker-compose.dev.yaml down'
                sh 'docker system prune -a -f'
            }
        }
    }
}