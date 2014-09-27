#!/bin/bash

echo "Clearing folders..."

if [ -d "rs0-0" ]; then
  echo "rs0-0 folder removed";
  rm -rf rs0-0/
fi

if [ -d "rs0-1" ]; then
  echo "rs0-1 folder removed";
  rm -rf rs0-1/
fi

if [ -d "rs0-2" ]; then
  echo "rs0-2 folder removed";
  rm -rf rs0-2/
fi

if [ -d "arb" ]; then
  echo "arb folder removed";
  rm -rf arb/
fi

if [ -d "logs" ]; then
  echo "logs folder removed";
  rm -rf logs/
fi

mkdir -p rs0-0/ rs0-1/ rs0-2/ arb/ logs/
mongod --config conf/master.conf
mongod --config conf/node_one.conf
mongod --config conf/node_two.conf
mongod --config conf/arbiter.conf

echo "Initializing replica set..."
sleep 5
mongo localhost:27017 --quiet mongo_scripts/init_repl.js

sleep 3
echo "Adding node one..."
mongo localhost:27017 --quiet --eval "rs.add('localhost:27018')"
echo "Adding node two..."
mongo localhost:27017 --quiet --eval "rs.add('localhost:27019')"
echo "Adding node arbiter..."
mongo localhost:27017 --quiet --eval "rs.addArb('localhost:30000')"