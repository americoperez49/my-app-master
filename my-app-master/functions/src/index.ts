import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const newGenericEmail = functions.https.onCall(async (data) => {
  const msg = {
    to: 'americoperez49@gmail.com',
    from: 'americoperez49@gmail.com',
    subject: 'Email sent from Resume Website',
    text: data.from + ' has sent you the following: \n' + data.text,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.log(error.toString());
      return { succes: 'false' };
    });

  return { succes: 'true' };
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
