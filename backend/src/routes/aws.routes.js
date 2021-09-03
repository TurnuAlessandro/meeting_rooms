const router = require('express-promise-router')()
const awsController = require('../controllers/aws.controller')


/** QUA IL CODICE PER LA CONFIGURAZIONE
 * */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var device = awsIot.device({
    keyPath: 'C:/Users/snak9/Documents/meeting_rooms/backend/cert/2928076d2b52829d16718922cc7cf3c682dba671fa993c76a2b6bbdb627816d7-private.pem.key',
        certPath: 'C:/Users/snak9/Documents/meeting_rooms/backend/cert/2928076d2b52829d16718922cc7cf3c682dba671fa993c76a2b6bbdb627816d7-certificate.pem.crt.txt',
            caPath: 'C:/Users/snak9/Documents/meeting_rooms/backend/cert/AmazonRootCA1.pem',
                clientId: 'button',
                    host: 'a2rb2bl3y4if44-ats.iot.us-east-2.amazonaws.com'
                        });

                        //
                        // Device is an instance returned by mqtt.Client(), see mqtt.js for full
                        // documentation.
                        //
                        device
                        .on('connect', function() {
                        console.log('connect');
                        device.subscribe('$aws/things/button/shadow',JSON.stringify({ test_data: 'Prova'}));
                        device.publish('$aws/things/button/shadow', JSON.stringify({ test_data: 'Hello'}));

                        console.log('prova AWS config')
                    });

                        device
                        .on('message', function(topic, payload) {
                        console.log('message', topic, payload.toString());
                    });





const aaa = 3

console.log('STAMAPAA', aaa, {aaa})


module.exports = router