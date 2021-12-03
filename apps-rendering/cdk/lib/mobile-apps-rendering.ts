import { CfnInclude } from '@aws-cdk/cloudformation-include';
import { App } from '@aws-cdk/core';
import { AccessScope, GuEc2App } from '@guardian/cdk';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStageParameter } from '@guardian/cdk/lib/constructs/core';
import { join } from 'path';
import { InstanceClass, InstanceSize, InstanceType, Peer, Port } from "@aws-cdk/aws-ec2";
import { Stage } from "@guardian/cdk/lib/constants";

export class MobileAppsRendering extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);
    const yamlTemplateFilePath = join(
      __dirname,
      '../..',
      'config/cloudformation.yaml',
    );

    const appName = "mobile-apps-rendering"

    const domainNameProperties = this.stack === "mobile" ?
      {
        [Stage.CODE]: {
          domainName: "mobile-rendering.mobile-aws.code.dev-guardianapis.com.",
          hostedZoneId: "Z6PRU8YR6TQDK",
        },
        [Stage.PROD]: {
          domainName: "mobile-rendering.mobile-aws.guardianapis.com.",
          hostedZoneId: "Z1EYB4AREPXE3B",
        },
      } :
      {
        [Stage.CODE]: {
          domainName: "mobile-preview-rendering.mobile-aws.code.dev-guardianapis.com.",
          hostedZoneId: "Z6PRU8YR6TQDK",
        },
        [Stage.PROD]: {
          domainName: "mobile-preview-rendering.mobile-aws.guardianapis.com.",
          hostedZoneId: "Z1EYB4AREPXE3B",
        },
      };

    new CfnInclude(this, 'YamlTemplate', {
      templateFile: yamlTemplateFilePath,
      parameters: {
        Stage: GuStageParameter.getInstance(this),
      },
    });
    new GuEc2App(this, {
      applicationPort: 3040,
      app: "mobile-apps-rendering",
      access: { scope: AccessScope.INTERNAL, cidrRanges: [Peer.ipv4("10.0.0.0/8")] },
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      certificateProps: domainNameProperties,
      monitoringConfiguration: {
        noMonitoring: true
      },
      userData: `#!/bin/bash -ev
groupadd mapi
useradd -r -m -s /usr/bin/nologin -g mapi ${appName}

export App=${appName}
export Stack=${this.stack}
export Stage=${this.stage}
export NODE_ENV=production

aws s3 cp s3://mobile-apps-api-dist/${this.stack}/${this.stage}/${appName}/${appName}.zip /tmp
mkdir -p /opt/${appName}
unzip /tmp/${appName}.zip -d /opt/${appName}
chown -R ${appName}:mapi /opt/${appName}

mkdir -p /usr/share/${appName}/logs
chown -R ${appName}:mapi /usr/share/${appName}
ln -s /usr/share/${appName}/logs /var/log/${appName}
chown -R ${appName}:mapi /var/log/${appName}

export PM2_HOME="/usr/share/${appName}"
export ASSETS_MANIFEST="/opt/${appName}/manifest.json"

/usr/local/node/pm2 start --name ${appName} --uid ${appName} --gid mapi /opt/${appName}/server.js
/opt/aws-kinesis-agent/configure-aws-kinesis-agent ${this.region} mobile-log-aggregation-${this.stage} '/var/log/${appName}/*'
/usr/local/node/pm2 logrotate -u ${appName}`
    });
  }
}
