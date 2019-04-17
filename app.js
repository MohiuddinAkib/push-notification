const express = require('express'),
  webPush = require('web-push'),
  path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey =
  'BCpNtzFMiRxhX5EOVZP3n0_f9ZlXjGsKrV9nV5hv6qiu-HJD_LWSieBHTMU2OOYHJByUyEXnvWLwsaY4e_GJEx4';

const privateVapidKey = 'JNx5x_F8JGQnqdIGMKShtXiCITwX9KOgSa6cD7y328k';

webPush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe route
app.post('/subscribe', (req, res) => {
  // Get pus subscription object
  const subscription = req.body;
  //   send 201
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'push test' });
  //   Pass the object into send notification func
  webPush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.listen(8000);
