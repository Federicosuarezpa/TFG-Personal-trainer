cd back
docker build -t backend-node .

cd ../front
docker build -t frontend-node .

cd ../python-back
docker build -t backend-python .