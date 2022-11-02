import * as cdk from 'aws-cdk-lib';
import {aws_s3 as s3, RemovalPolicy} from 'aws-cdk-lib';
import { EC2_UNIQUE_IMDSV2_LAUNCH_TEMPLATE_NAME } from 'aws-cdk-lib/cx-api';
import { Construct } from 'constructs';
import * as ec2 from '@aws-cdk/aws-ec2';
import {App, Stack, StackProps} from 'aws-cdk-lib';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Cdk00Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new s3.Bucket(this, 'awslc', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });



    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'Cdk00Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

const app = new App();
new Cdk00Stack(app, "Cdk00Stack");