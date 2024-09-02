#!/bin/bash
#Be sure you have node 21.0.0 and npm 7.0.0 installed
#Tested with node 21.0.0 and npm 10.2.0
cd front || exit
echo "starting frontend..."
npm run dev &

cd ..

cd back || exit
echo "Starting backend..."
npm run dev &

cd ..

cd python-back || exit
echo "Starting python backend..."
python3 index.py &

echo "All services started"

cd ..

wait
