import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class GithubCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, "GithubCicdFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "main.handler",
      code: lambda.Code.fromAsset("lambda"),
    });

    const api = new apigateway.LambdaRestApi(this, "GithubApi", {
      handler: lambdaFunction,
      endpointConfiguration: {
      types: [apigateway.EndpointType.REGIONAL],
      },
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
