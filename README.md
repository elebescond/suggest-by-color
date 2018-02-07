SUGGEST BY COLOR
===

# Prerequisites

## Create a new Google Cloud Project

[Go to the Google Cloud Console.](https://serverless.com/framework/docs/providers/google/guide/credentials/)

## Enable the necessary APIs

Go to the API dashboard, select your project and enable the following APIs (if not already enabled):

 - Google Cloud Functions
 - Google Cloud Deployment Manager
 - Google Cloud Storage
 - Stackdriver Logging

## Get credentials

You need to create credentials Serverless can use to create resources in your Project.

 - Go to the Google Cloud API Manager and select "Credentials" on the left.
 - Click on "Create credentials" and select "Service account key".
 - Select "New service account" in the "Service account" dropdown.
 - Enter a name for your "Service account name" (e.g. "suggest-by-color-serverless").
 - Select "Project" --> "Owner" as the "Role".
 - The "Key type" should be "JSON".
 - Click on "Create" to create your private key.
 - That's your so called keyfile which should be downloaded on your machine.
 - Save the keyfile somewhere secure. We recommend making a folder in your root folder and putting it there. Like this, ~/.gcloud/keyfile.json. You can change the file name from keyfile to anything. Remember the path you saved it to.

## Update the provider config in serverless.yml

Open up your serverless.yml file and update the provider section with your Google Cloud Project id and the path to your keyfile.json file (this path needs to be absolute!). It should look something like this:

    provider:
      name: google
      runtime: nodejs
      project: suggest-by-color
      credentials: ~/.gcloud/keyfile.json

# Usage

## Build and install locally

    npm link

## Setting up authentication

Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the JSON file that contains your service account key.

## Commands

    suggest-by-color-import-catalog --catalog https://storage.googleapis.com/suggest-by-color/lacoste/products-10.csv
    suggest-by-color-extract-color --limit 1
    suggest-by-color --reference L1212-00-476

## Test

    npm test

## Deploy on gcloud

    npm run remote:deploy

## Undeploy

If at any point, you no longer need your service, you can run the following command to remove the Functions, Events and Resources that were created.

    npm run remote:undeploy

## Invoke

Run the import command

    ./serverless/node_modules/serverless/bin/serverless invoke \
      --function importCatalog \
      --data='{"catalog":"https://storage.googleapis.com/suggest-by-color/lacoste/products-10.csv"}'

Or

    curl \
      -d '{"catalog":"https://storage.googleapis.com/suggest-by-color/lacoste/products.csv"}' \
      -H "Content-Type: application/json" \
      -X POST \
      http://localhost:8010/suggest-by-color/us-central1/importCatalog

Run the suggest command

    curl \
      -H "Content-Type: application/json" \
      http://localhost:8010/suggest-by-color/us-central1/suggestProduct?reference=L1212-00-476

## Emulator

https://cloud.google.com/functions/docs/emulator

### Configure a project

    functions config set projectId suggest-by-color

### Start emulator

    functions start

### Deploy function

    functions deploy importCatalog --trigger-http
    functions deploy suggestProduct --trigger-http

### Invoke


    functions call importCatalog \
      --data='{"catalog":"https://storage.googleapis.com/suggest-by-color/lacoste/products.csv"}'
    
    functions call suggestProduct \
      --data='{"reference":"L1212-00-476"}'

Or

    curl \
      -d '{"catalog":"https://storage.googleapis.com/suggest-by-color/lacoste/products.csv"}' \
      -H "Content-Type: application/json" \
      -X POST \
      http://localhost:8010/suggest-by-color/us-central1/importCatalog


### Stop emulator
    functions stop
    functions call importCatalog \
      --data='{"catalog":"https://storage.googleapis.com/suggest-by-color/lacoste/products.csv"}'
    functions stop
