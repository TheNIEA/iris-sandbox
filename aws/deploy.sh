#!/bin/bash
# AWS Deployment Script for Mayo Test Sandbox

# Usage:
# ./aws/deploy.sh [environment]
# environment: dev (default), staging, prod

set -e

# Get the environment from the first argument or default to "dev"
ENVIRONMENT=${1:-dev}
STACK_NAME="mayo-test-sandbox-$ENVIRONMENT"
REGION=${AWS_REGION:-"us-east-1"}
BUCKET_NAME="mayo-test-assets-$ENVIRONMENT"
CLOUDFRONT_DISTRIBUTION_ID=""

echo "🚀 Deploying Mayo Test Sandbox to AWS ($ENVIRONMENT environment)"

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    echo "❌ Invalid environment: $ENVIRONMENT"
    echo "Usage: ./aws/deploy.sh [environment]"
    echo "environment: dev, staging, or prod"
    exit 1
fi

# Load environment variables
echo "📝 Loading environment variables for $ENVIRONMENT"
if [ -f ".env.$ENVIRONMENT" ]; then
    source .env.$ENVIRONMENT
fi

# Build the application
echo "🏗️ Building the application for $ENVIRONMENT environment"
NODE_ENV=$ENVIRONMENT npm run build

# Deploy CloudFormation stack if it doesn't exist
echo "🏛️ Checking CloudFormation stack"
if ! aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION > /dev/null 2>&1; then
    echo "📦 Creating CloudFormation stack: $STACK_NAME"
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://aws/cloudformation.yml \
        --parameters ParameterKey=Environment,ParameterValue=$ENVIRONMENT \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    echo "⏳ Waiting for CloudFormation stack creation to complete..."
    aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $REGION
else
    echo "📦 Updating CloudFormation stack: $STACK_NAME"
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://aws/cloudformation.yml \
        --parameters ParameterKey=Environment,ParameterValue=$ENVIRONMENT \
        --capabilities CAPABILITY_IAM \
        --region $REGION || true
fi

# Get CloudFormation outputs
echo "📊 Retrieving CloudFormation outputs"
CF_OUTPUTS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs" --output json)
BUCKET_NAME=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="StaticAssetsS3Bucket").OutputValue')
CLOUDFRONT_DISTRIBUTION_ID=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="CloudFrontDistributionId").OutputValue')
CLOUDFRONT_DOMAIN=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="CloudFrontDomainName").OutputValue')

echo "🪣 S3 Bucket: $BUCKET_NAME"
echo "☁️ CloudFront Distribution ID: $CLOUDFRONT_DISTRIBUTION_ID"
echo "🌐 CloudFront Domain: $CLOUDFRONT_DOMAIN"

# Upload files to S3
echo "📤 Uploading files to S3 bucket: $BUCKET_NAME"
aws s3 sync .output/public/ s3://$BUCKET_NAME/ --delete --region $REGION

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache"
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --region $REGION

echo "✅ Deployment completed successfully!"
echo "🌍 Your application is available at: https://$CLOUDFRONT_DOMAIN"