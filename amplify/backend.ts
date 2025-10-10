import { defineBackend } from '@aws-amplify/backend';
import { imagesStorage } from './storage/resource';
import { generateThumb } from './functions/resize/resource';
import {EventType} from "aws-cdk-lib/aws-s3";
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  imagesStorage,
  generateThumb
});

backend.imagesStorage.resources.bucket.addEventNotification(
  EventType.OBJECT_CREATED_PUT,
  new LambdaDestination(backend.generateThumb.resources.lambda),
  {
    prefix: 'originals/'
  }
)