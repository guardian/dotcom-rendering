import type { RenderingCDKStackProps } from './rendering-stack';

interface UserDataProps
	extends Pick<RenderingCDKStackProps, 'guApp' | 'stage'> {
	guStack: string;
	artifactsBucket: string;
}

/**
 * Returns user data configuration for instances in the rendering app
 * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
 */
export const getUserData = ({
	guApp,
	guStack,
	stage,
	artifactsBucket,
}: UserDataProps): string => {
	const userData = [
		`#!/bin/bash -ev`,

		`groupadd frontend`,
		`useradd -r -m -s /usr/bin/nologin -g frontend dotcom-rendering`,
		`cd /home/dotcom-rendering`,

		`aws --region eu-west-1 s3 cp s3://${artifactsBucket}/frontend/${stage}/${guApp}/${guApp}.tar.gz ./`,
		`tar -zxf ${guApp}.tar.gz ${guApp}`,

		`chown -R dotcom-rendering:frontend ${guApp}`,

		`cd ${guApp}`,

		`mkdir /var/log/dotcom-rendering`,
		`chown -R dotcom-rendering:frontend /var/log/dotcom-rendering`,

		// write out systemd file
		`cat > /etc/systemd/system/${guApp}.service << EOF`,
		`[Unit]`,
		`Description=${guApp}`,
		`After=network.target`,
		`[Service]`,
		`WorkingDirectory=/home/dotcom-rendering/${guApp}`,
		`Type=simple`,
		`User=dotcom-rendering`,
		`Group=frontend`,
		`StandardError=journal`,
		`StandardOutput=journal`,
		`Environment=TERM=xterm-256color`,
		`Environment=NODE_ENV=production`,
		`Environment=GU_STAGE=${stage}`,
		`Environment=GU_APP=${guApp}`,
		`Environment=GU_STACK=${guStack}`,
		`ExecStart=make prod`,
		`Restart=on-failure`,
		`[Install]`,
		`WantedBy=multi-user.target`,
		`EOF`,

		`systemctl enable ${guApp}`, // enable the service
		`systemctl start ${guApp}`, // start the service
	].join('\n');

	return userData;
};
