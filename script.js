let bsw;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw-bruit.js", { scope: "/bruit-logger" })
    .then(registration => {
      // registration.addEventListener("onstatechange", state => {
      //   console.log("--------- STATE : ", state);
      // });
      console.log(
        "The service worker has been registered ACTIVE",
        registration.active
      );
      console.log(
        "The service worker has been registered INSTALL",
        registration.installing
      );
      console.log(
        "The service worker has been registered WAIT",
        registration.waiting
      );
      if (registration.active) {
        console.log("aaaactive");
        bsw = registration.active;
      } else {
        const worker = registration.installing || registration.waiting;
        console.log("paaaactive", worker);
        worker.onstatechange = e => {
          if (e.currentTarget && e.currentTarget.state === "activated") {
            bsw = e.currentTarget;
          }
        };
        console.log("paaaactive", worker);
      }
    });

  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("The service worker has been registered ", registration);
  });

  fetch(
    "https://firestore.googleapis.com/v1beta1/projects/feedbackentes-test/databases/(default)/documents/counters"
  )
    .then(res => res.json())
    .then(res => {
      console.log("RES = ", res);
    })
    .catch(e => console.error(e));
}

function send_message_to_sw(msg) {
  return new Promise(function(resolve, reject) {
    // Create a Message Channel
    var msg_chan = new MessageChannel();

    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // Send message to service worker along with port for reply
    bsw.postMessage("Client 1 says '" + msg + "'", [msg_chan.port2]);
  });
}

console.log("started");

setInterval(() => {
  if (bsw && bsw.postMessage) {
    send_message_to_sw("yoooloooo").catch(console.error);
  } else {
    console.warn("bsw not ready");
  }
}, 200);
