console.log('service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push is recieved');
  self.registration.showNotification(data.title, {
    body: 'Notified by akib',
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  });
});
