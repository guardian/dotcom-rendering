#!/bin/bash

# Function for AWS calls with the desired profile and region
aws_command() {
    aws --profile=frontend --region=eu-west-1 "$@"
}

if [ -z "$1" ]; then
    echo "Error: Please provide an EC2 instance ID."
    echo "Usage: $0 <instance-id>"
    exit 1
fi

INSTANCE_ID=$1

# Get the EC2 instance launch time
LAUNCH_TIME=$(aws_command ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[*].Instances[*].LaunchTime' \
    --output text)

PRIVATE_IP=$(aws_command ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[*].Instances[*].PrivateIpAddress' \
    --output text)

if [ -z "$LAUNCH_TIME" ]; then
    echo "Error: Unable to find launch time for instance $INSTANCE_ID."
    exit 1
fi

# Calculate 10 minutes after the launch time (ISO 8601 DateTime format)
LAUNCH_TIME_EPOCH_MILLISECONDS=$(python3 -c "
from datetime import datetime
import sys
dt = sys.argv[1].replace('Z', '+00:00')
print(int(datetime.fromisoformat(dt).timestamp() * 1000))
" "$LAUNCH_TIME")

END_LOGS_TIME_EPOCH_MILLISECONDS=$(python3 -c "
from datetime import datetime, timedelta
import sys
dt = sys.argv[1].replace('Z', '+00:00')
launch_time = datetime.fromisoformat(dt)
end_time = launch_time + timedelta(minutes=10)
print(int(end_time.timestamp() * 1000))
" "$LAUNCH_TIME")

# Get logs from the specific log group and log stream prefix
LOG_GROUP_NAME="/aws/elasticloadbalancing/tag-page-rendering-CODE-health-check"
LOG_STREAM_PREFIX="ALB_Health_Check_Logs"

# Find the first health check status that is "healthy"
JSON_RESULTS=$(aws_command logs filter-log-events \
	--log-group-name "$LOG_GROUP_NAME" \
	--log-stream-name-prefix "$LOG_STREAM_PREFIX" \
	--start-time $LAUNCH_TIME_EPOCH_MILLISECONDS \
	--end-time $END_LOGS_TIME_EPOCH_MILLISECONDS)

FIRST_POSITIVE_HEALTH_CHECK_TIME=$(echo $JSON_RESULTS | jq -r --arg ip "${PRIVATE_IP}:9000" '
	.events
	| map(.message | fromjson | select(.target_addr == $ip))
	| sort_by(.time)
	| map(select(.status == "PASS"))
	| .[0]["time"]
')
echo $INSTANCE_ID
echo $LAUNCH_TIME
echo $FIRST_POSITIVE_HEALTH_CHECK_TIME
