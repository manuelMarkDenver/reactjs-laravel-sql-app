#!/usr/bin/env bash

# wait-for-it.sh - Script to wait for a service to become available
# Usage: wait-for-it.sh <host>:<port> [-t timeout] [-- command args]

HOST=$1
shift
PORT=$1
shift
TIMEOUT=${1:-15}

while ! nc -z $HOST $PORT; do
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

echo "$HOST:$PORT is available, running command."
exec "$@"
