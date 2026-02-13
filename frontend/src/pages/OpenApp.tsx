import { useEffect } from "react";

const OpenAppPage = () => {
  useEffect(() => {
    const appUrl = "https://notevault.moinnaik.bio/open";
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.im_moin.notevault";

    const timeout = setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 2000);

    window.location.href = appUrl;

    return () => clearTimeout(timeout);
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
