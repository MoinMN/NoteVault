import { useEffect, useRef } from "react";
import {
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-3705984726281758/3863623039";

export default function useInterstitialAd() {
  const interstitial = useRef(
    InterstitialAd.createForAdRequest(adUnitId)
  ).current;

  useEffect(() => {
    interstitial.load();
  }, []);

  const showAd = () => {
    if (interstitial.loaded) {
      interstitial.show();
      interstitial.load();
    }
  };

  return { showAd };
}