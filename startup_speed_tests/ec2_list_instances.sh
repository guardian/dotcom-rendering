#!/bin/bash

aws_command() {
    aws --profile=frontend --region=eu-west-1 "$@"
}

if [ -z "$1" ]; then
    echo "Error: Please provide an ECS task ID."
    echo "Usage: $0 <task-id>"
    exit 1
fi

SCALING_GROUP=$1

INSTANCES=$(aws_command autoscaling describe-auto-scaling-instances \
	--query "AutoScalingInstances[?AutoScalingGroupName=='$SCALING_GROUP'].InstanceId" \
	--output text)
echo $INSTANCES

