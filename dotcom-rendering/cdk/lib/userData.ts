import type { DCRProps } from './types';

type UserDataProps = Pick<DCRProps, 'app' | 'region' | 'stage'> & {
	elkStreamId: string;
};

/**
 * Returns user data configuration for instances in the rendering app
 * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
 */
export const getUserData = ({
	app,
	region,
	stage,
	elkStreamId,
}: UserDataProps): string => {
	const userData = [
		`#!/bin/bash -ev`,

		`groupadd frontend`,
		`useradd -r -m -s /usr/bin/nologin -g frontend dotcom-rendering`,
		`usermod -a -G frontend aws-kinesis-agent-user`,
		`cd /home/dotcom-rendering`,

		`aws --region eu-west-1 s3 cp s3://aws-frontend-artifacts/frontend/${stage}/${app}/${app}.tar.gz ./`,
		`tar -zxf ${app}.tar.gz ${app}`,

		`chown -R dotcom-rendering:frontend ${app}`,

		`cd ${app}`,

		`export TERM=xterm-256color`,
		`export NODE_ENV=production`,
		`export GU_STAGE=${stage}`,

		`mkdir /var/log/dotcom-rendering`,
		`chown -R dotcom-rendering:frontend /var/log/dotcom-rendering`,

		`sudo NODE_ENV=$NODE_ENV GU_STAGE=$GU_STAGE -u dotcom-rendering -g frontend make start-prod`,

		`/opt/aws-kinesis-agent/configure-aws-kinesis-agent ${region} ${elkStreamId} /var/log/dotcom-rendering/dotcom-rendering.log`,
	].join('\n');

	return userData;
};
