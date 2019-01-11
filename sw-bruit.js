// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open("v1").then(function(cache) {
//       return cache.addAll(["/index.html", "/script.js"]);
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       console.log("FETCH SW : ", event.request.url);
//       // caches.match() always resolves
//       // but in case of success response will have value
//       if (response !== undefined) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then(function(response) {
//             // response may be used only once
//             // we need to save clone to put one copy in cache
//             // and serve second one
//             let responseClone = response.clone();

//             caches.open("v1").then(function(cache) {
//               cache.put(event.request, responseClone);
//             });
//             return response;
//           })
//           .catch(function() {
//             return {
//               offline: true,
//               cache: false
//             };
//           });
//       }
//     })
//   );
// });

const test = [];

self.addEventListener("message", event => {
  test.push(event.data);
  console.log("SW bruit Received Message: " + event.data);
  // console.log(test);
  //clients.matchAll({ includeUncontrolled: true }).then(console.log);
  event.ports[0].postMessage(test);
  // event.ports[0].postMessage("SWBRUIT Says 'Hello back!'");
});

self.addEventListener("push", function(event) {
  const payload = event.data ? event.data.text() : "no payload";
  console.log("push :", payload);
  event.waitUntil(
    self.registration.showNotification("bouuuuuuu", {
      body: payload
    })
  );
});
