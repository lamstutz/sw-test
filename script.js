navigator.serviceWorker.register('sw.js')
    .then(function (registration) {
        console.log('The service worker has been registered ', registration);
        fetch('https://firestore.googleapis.com/v1beta1/projects/feedbackentes-test/databases/(default)/documents/counters')
            .then(res => res.json()).then(res => {
                console.log('RES = ', res);
            }).catch(e => console.error(e));









    });
console.log('started');