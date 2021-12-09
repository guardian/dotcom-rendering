import { CfnInclude } from '@aws-cdk/cloudformation-include';
import { App, CfnElement, Duration, Tags } from '@aws-cdk/core';
import { AccessScope, GuEc2App } from '@guardian/cdk';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack, GuStageParameter } from '@guardian/cdk/lib/constructs/core';
import { join } from 'path';
import { InstanceClass, InstanceSize, InstanceType, Peer, Port } from "@aws-cdk/aws-ec2";
import { Stage } from "@guardian/cdk/lib/constants";
import { RecordSet, RecordType, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CfnLoadBalancer } from '@aws-cdk/aws-elasticloadbalancing'

interface AppsStackProps extends GuStackProps {
  recordPrefix: string;
}

export class MobileAppsRendering extends GuStack {
  constructor(scope: App, id: string, props: AppsStackProps) {
    super(scope, id, props);
    const yamlTemplateFilePath = join(
      __dirname,
      '../..',
      'config/cloudformation.yaml',
    );

    const appName = "mobile-apps-rendering"

    const appsRenderingDomain = this.withStageDependentValue({
      variableName: "domain",
      app: appName,
      stageValues: {
        CODE: "mobile-aws.code.dev-guardianapis.com",
        PROD: "mobile-aws.guardianapis.com",
      },
    });

    const codeDomainName = `${props.recordPrefix}.mobile-aws.code.dev-guardianapis.com`
    const prodDomainName = `${props.recordPrefix}.mobile-aws.guardianapis.com`

    const appsRenderingDomainName = this.withStageDependentValue<string>({
      variableName: "domainName",
      app: appName,
      stageValues: {
        CODE: codeDomainName,
        PROD: prodDomainName,
      },
    });
    const hostedZoneIdCode = "Z6PRU8YR6TQDK"
    const hostedZoneIdProd = "Z1EYB4AREPXE3B"
    const hostedZone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      zoneName: appsRenderingDomain,
      hostedZoneId: this.withStageDependentValue({
        variableName: "hostedZoneId",
        app: appName,
        stageValues: {
          CODE: hostedZoneIdCode,
          PROD: hostedZoneIdProd,
        },
      }),
    });

    const cfnTemplate = new CfnInclude(this, 'YamlTemplate', {
      templateFile: yamlTemplateFilePath,
      parameters: {
        Stage: GuStageParameter.getInstance(this),
      },
    });
    const appsRenderingApp = new GuEc2App(this, {
      applicationPort: 3040,
      app: "mobile-apps-rendering",
      access: { scope: AccessScope.INTERNAL, cidrRanges: [Peer.ipv4("10.0.0.0/8")] },
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      certificateProps: {
        CODE: { domainName: codeDomainName, hostedZoneId: hostedZoneIdCode},
        PROD: { domainName: prodDomainName, hostedZoneId: hostedZoneIdProd},
      },
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

aws s3 cp s3://mobile-dist/${this.stack}/${this.stage}/${appName}/${appName}.zip /tmp
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

    /*
      Tag the new ASG to allow RiffRaff to deploy to both this and the current one at the same time.
      See https://github.com/guardian/riff-raff/pull/632
    */
    const asg = appsRenderingApp.autoScalingGroup;
    Tags.of(asg).add("gu:riffraff:new-asg", "true");

    const oldBalancer = cfnTemplate.getResource('LoadBalancer') as CfnLoadBalancer;

    const recordSet = new RecordSet(this, 'DnsRecord', {
      recordType: RecordType.CNAME,
      target: RecordTarget.fromValues(oldBalancer.attrDnsName),
      zone: hostedZone,
      recordName: props.recordPrefix,
      ttl: Duration.minutes(1)
    });
    const defaultChild = recordSet.node.defaultChild as CfnElement;
    defaultChild.overrideLogicalId('DnsRecord');
  }
}
