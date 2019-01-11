if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(res => {
    const idx = res.findIndex(
      registration => registration.scope.indexOf("/bruit-logger") >= 0
    );
    if (idx >= 0 && res[idx].active) {
      res[idx].active.postMessage("boooooommmm");
    }
  });
}

console.log("started");
