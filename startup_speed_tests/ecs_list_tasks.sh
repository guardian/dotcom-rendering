#!/bin/bash

aws_command() {
    aws --profile=frontend --region=eu-west-1 "$@"
}

if [ -z "$1" ]; then
    echo "Error: Please provide an ECS cluster."
    echo "Usage: $0 <cluster-id>"
    exit 1
fi

CLUSTER=$1

aws_command ecs list-tasks \
    --cluster $CLUSTER \
    --query 'taskArns[*]' \
    --output text
