const publicVapidKey =
  'BCpNtzFMiRxhX5EOVZP3n0_f9ZlXjGsKrV9nV5hv6qiu-HJD_LWSieBHTMU2OOYHJByUyEXnvWLwsaY4e_GJEx4';

if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//   Register sw, register push, send push
async function send() {
  const register = await navigator.serviceWorker.register('/worker.js');
  console.log('service worker registered...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('push registered...');
  const r = await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('push sent');
  return r;
}
