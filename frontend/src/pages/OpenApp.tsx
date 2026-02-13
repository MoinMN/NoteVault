import { useEffect } from "react";

const OpenAppPage = () => {
  useEffect(() => {
    const appScheme = "notevault://";
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.im_moin.notevault";

    const timer = setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 2000);

    // Try opening the app
    window.location.href = appScheme;

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Opening NoteVault...</h2>
    </div>
  );
};

export default OpenAppPage;
