#!/bin/bash
for pid in $(ps -ef | grep "mongod" | head -n 4 | awk '{print $2}')
do
  echo "killing $pid" 
  kill $pid; 
done