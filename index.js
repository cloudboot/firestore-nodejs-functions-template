import * as functions from '@google-cloud/functions-framework';
import * as protobuf from 'protobufjs';


async function main(cloudEvent) {
    console.log(`Function triggered by event on: ${cloudEvent.source}`);
    console.log(`Event type: ${cloudEvent.type}`);
  
    console.log('Loading protos...');
    const root = await protobuf.load('data.proto');
    const DocumentEventData = root.lookupType(
      'google.events.cloud.firestore.v1.DocumentEventData'
    );
  
    console.log('Decoding data...');
    const firestoreReceived = DocumentEventData.decode(cloudEvent.data);
  
    console.log('\nOld value:');
    console.log(JSON.stringify(firestoreReceived.oldValue, null, 2));
  
    console.log('\nNew value:');
    console.log(JSON.stringify(firestoreReceived.value, null, 2));
}

functions.cloudEvent('main', main);
