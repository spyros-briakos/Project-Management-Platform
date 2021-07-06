npm i --silent

cd ./cli-app/control-center
npm i --silent

cd ../../front-end
npm i --silent

cd ../rest-api-client
npm i --silent

cd ./test-client
npm i --silent

cd ../../

echo '\nNode modules installed\n'

cd ./back-end
docker-compose build

cd ../