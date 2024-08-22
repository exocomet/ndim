pipeline {
    agent any
    
    environment {
        // Define any environment variables if needed
        NODE_VERSION = '22.x' // Adjust Node.js version as needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the local Git repository
                dir('/path/to/local/repo') {
                    git url: 'file:///path/to/local/repo', branch: 'main'
                }
            }
        }

        stage('Hello') {
            steps {
                echo('Hello world!')
            }
        }

        // stage('Install Node.js') {
        //     steps {
        //         // Install Node.js
        //         script {
        //             def nodeHome = tool name: 'NodeJS', type: 'NodeJSInstallation'
        //             env.PATH = "${nodeHome}/bin:${env.PATH}"
        //         }
        //     }
        // }

        // stage('Install Dependencies') {
        //     steps {
        //         // Install project dependencies
        //         sh 'npm install'
        //     }
        // }

        // stage('Run Lint') {
        //     steps {
        //         // Run linter to ensure code quality
        //         sh 'npm run lint'
        //     }
        // }

        // stage('Run Tests') {
        //     steps {
        //         // Run the tests
        //         sh 'npm test'
        //     }
        // }

        // stage('Build') {
        //     steps {
        //         // Build the project
        //         sh 'npm run build'
        //     }
        // }
    }

    post {
        // always {
        //     // Clean up the workspace after the build is done
        //     cleanWs()
        // }

        success {
            // Notify success
            echo 'I tell you: build and tests succeeded!'
        }

        failure {
            // Notify failure
            echo 'I tell you: Build or tests failed.'
        }
    }
}