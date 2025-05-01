import { UserData } from 'aws-cdk-lib/aws-ec2';
import type { RenderingCDKStackProps } from './renderingStack';

interface UserDataProps extends Pick<RenderingCDKStackProps, 'stage'> {
	guApp: string;
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
}: UserDataProps): UserData => {
	const userData = UserData.forLinux();
	// create groups, download artifact, unzip and set permissions
	userData.addCommands(
		`set -ev`,
		`groupadd frontend`,
		`useradd -r -m -s /usr/bin/nologin -g frontend dotcom-rendering`,
		`cd /home/dotcom-rendering`,
		`aws --region eu-west-1 s3 cp s3://${artifactsBucket}/frontend/${stage}/${guApp}/${guApp}.tar.gz ./`,
		`tar -zxf ${guApp}.tar.gz ${guApp}`,
		`chown -R dotcom-rendering:frontend ${guApp}`,
		`cd ${guApp}`,
		`mkdir /var/log/dotcom-rendering`,
		`chown -R dotcom-rendering:frontend /var/log/dotcom-rendering`,
	);
	// write out systemd service file
	userData.addCommands(
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
	);
	// enable and start the service
	userData.addCommands(
		`systemctl enable ${guApp}`, // enable the service
		`systemctl start ${guApp}`, // start the service
	);
	return userData;
};
