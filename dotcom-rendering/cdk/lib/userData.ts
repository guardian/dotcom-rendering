import type { UserDataProps } from './types';

/**
 * Returns user data configuration for instances in the rendering app
 * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
 */
export const getUserData = ({
	app,
	stack,
	stage,
	artifactsBucket,
}: UserDataProps): string => {
	const userData = [
		`#!/bin/bash -ev`,

		`groupadd frontend`,
		`useradd -r -m -s /usr/bin/nologin -g frontend dotcom-rendering`,
		`cd /home/dotcom-rendering`,

		`aws --region eu-west-1 s3 cp s3://${artifactsBucket}/frontend/${stage}/${app}/${app}.tar.gz ./`,
		`tar -zxf ${app}.tar.gz ${app}`,

		`chown -R dotcom-rendering:frontend ${app}`,

		`cd ${app}`,

		`mkdir /var/log/dotcom-rendering`,
		`chown -R dotcom-rendering:frontend /var/log/dotcom-rendering`,

		// write out systemd file
		`cat > /etc/systemd/system/${app}.service << EOF`,
		`[Unit]`,
		`Description=${app}`,
		`After=network.target`,
		`[Service]`,
		`WorkingDirectory=/home/dotcom-rendering/${app}`,
		`Type=simple`,
		`User=dotcom-rendering`,
		`Group=frontend`,
		`StandardError=journal`,
		`StandardOutput=journal`,
		`Environment=TERM=xterm-256color`,
		`Environment=NODE_ENV=production`,
		`Environment=GU_STAGE=${stage}`,
		`Environment=GU_APP=${app}`,
		`Environment=GU_STACK=${stack}`,
		`ExecStart=make prod`,
		`Restart=on-failure`,
		`[Install]`,
		`WantedBy=multi-user.target`,
		`EOF`,

		`systemctl enable ${app}`, // enable the service
		`systemctl start ${app}`, // start the service
	].join('\n');

	return userData;
};
