import { useEffect } from "react";

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen") || "trendDetaild"; // Default screen if not provided
  const id = params.get("id") || ""; // ID is optional
  return { screen, id };
};

const openApp = () => {
  const { screen, id } = getQueryParams();
  const appUrl = id ? `musaro://${screen}/${id}` : `musaro://${screen}`;
  const androidStoreUrl = `https://play.google.com/store/apps/details?id=com.musaro&referrer=${encodeURIComponent(
    `screen=${screen}&id=${id}`
  )}`;
  const iosStoreUrl = `https://apps.apple.com/app/id6736371356?screen=${screen}&id=${id}`;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Attempt to open the app
  const link = document.createElement("a");
  link.href = appUrl;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Redirect to App Store or Play Store if the app is not installed (after delay)
  setTimeout(() => {
    window.location.href = isIOS ? iosStoreUrl : androidStoreUrl;
  }, 2000);
};

const MusaroAppRedirect = () => {
  useEffect(() => {
    openApp();
  }, []);

  const { screen, id } = getQueryParams();
  const appLink = id ? `musaro://${screen}/${id}` : `musaro://${screen}`;
  const referrer = encodeURIComponent(`screen=${screen}&id=${id}`);
  const playStoreLink = `https://play.google.com/store/apps/details?id=com.musaro&referrer=${referrer}`;
  const appStoreLink = `https://apps.apple.com/app/id6736371356?screen=${screen}&id=${id}`;

  return (
    <div>
      <h1>Opening Musaro App...</h1>
      <p>
        If the app does not open, <a href={appLink}>click here</a> or install
        it from the <a href={playStoreLink}>Play Store</a> (Android) or the
        <a href={appStoreLink}> App Store</a> (iOS).
      </p>
    </div>
  );
};

export default MusaroAppRedirect;
