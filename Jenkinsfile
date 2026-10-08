pipeline{
    agent any
    
    tools{
        nodejs 'node-js'
    }
    environment{
        IMAGE_NAME='pipeline-image-cloudapp'
        CONTAINER_NAME='pipeline-container-cloud'
       
    }
    parameters{
        choice(name:'ENVIRONMENT' , choices:['Testing',"Prod"], description:'environment')
    }
    
    stages{
        stage('git clone'){
            steps{
               git branch: 'main', credentialsId: 'cloudapp', url: 'https://github.com/DINESH-K-21/cloudtodo'
            }
        }
        stage('list command'){
            when {
                expression{
                    params.ENVIRONMENT=='Testing'
                }
            }
            steps{
               sh 'ls'
            }
        }
        stage('install'){
            steps{
               sh 'npm install'
            }
            
        }
        stage('test'){
            steps{
               sh 'npm run test'
            }
        }
        stage('docker image create'){
            steps{
               sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }
        stage('docker container remove'){
            steps{
               sh 'docker rm -f $CONTAINER_NAME || true'
            }
        }
        stage('docker run container'){
            steps{
               sh 'docker run -d -p 3400:3700 --name=$CONTAINER_NAME $IMAGE_NAME:$BUILD_NUMBER'
            }
        }
    }
}