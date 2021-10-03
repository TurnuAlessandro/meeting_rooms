// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const awsIot = require('aws-iot-device-sdk')

// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//

const device = awsIot.device({
    keyPath: '/Users/alessandroturnu/Documents/GitHub/meeting_rooms/backend/cert/2928076d2b52829d16718922cc7cf3c682dba671fa993c76a2b6bbdb627816d7-private.pem.key',
    certPath: '/Users/alessandroturnu/Documents/GitHub/meeting_rooms/backend/cert/2928076d2b52829d16718922cc7cf3c682dba671fa993c76a2b6bbdb627816d7-certificate.pem.crt.txt',
    caPath: '/Users/alessandroturnu/Documents/GitHub/meeting_rooms/backend/cert/AmazonRootCA1.pem',
    clientId: 'button',
    host: 'a2rb2bl3y4if44-ats.iot.us-east-2.amazonaws.com'
})

// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.

// Arduino->Node $aws/things/button/shadow/update (arduino scrive)
// Node->Arduino $aws/things/button/shadow/events (node scrive)

device.on('connect', () => console.log('connect to aws'))

async function write(req, res){
    console.log('Publish')

    const topic = '$aws/things/button/shadow/events'
    const { body } = req

    device.publish(topic, JSON.stringify(body))

    res.status(200).send(true)
}

async function read(req, res){
    console.log('Subscribe')
    const topic = '$aws/things/button/shadow/update'

    device.subscribe(topic)

    const callback = (messageTopic, payload) => {
        console.log('entra')
        if(messageTopic !== topic){
            res.json(JSON.parse({}))
            device.on('message', () => null)
            return null
        }

        console.log('Payload', JSON.parse(payload))
        device.on('message', () => null)

        res.status(200).json(JSON.parse(payload))
        return null
    }

    device.once('message', callback)

}

module.exports = {read, write}