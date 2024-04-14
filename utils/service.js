const publicVapidKey =
  "BNoCELsZLLpThEFNPJ2k9VB5x1Ob4cEsfHbmNwY2VOZDxsc1c3Jex_O0u2LYaP6HKrLTBCExUvQWHyfDy4dLV2w";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default async function send(URLst, token) {
  const register = await navigator.serviceWorker.register(
    "/worker.js",

    {
      scope: "/",
    }
  );
  //register service worker

  //register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
    // applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch(`${URLst}v1/subscribe`, {
    method: "PATCH",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
