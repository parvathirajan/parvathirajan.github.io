// Retire the legacy CRA service worker so it cannot serve an outdated portfolio.
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistration(import.meta.env.BASE_URL)
      .then((registration) => registration?.unregister())
      .catch((error) => console.error("Service worker cleanup failed:", error));
  }
}
