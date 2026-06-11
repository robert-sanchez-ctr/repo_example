import json
import os


def handler(event, context):
    version = os.environ.get("VERSION", "1.0.0")
    response_body = {"message": "Hello, World!", "version": version}

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(response_body),
    }
