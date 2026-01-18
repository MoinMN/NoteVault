import React from "react";
import { View, Text, Image } from "react-native";

const CryBabyImg = require("../assets/images/crying-baby.png");

const NoInternetScreen = () => {
  return (
    <View className="flex-1 bg-white dark:bg-black items-center justify-center px-6">

      <Image
        source={CryBabyImg}
        resizeMode="contain"
        className="w-44 h-44 mb-6"
      />

      <Text className="text-2xl font-bold text-black dark:text-white mb-2">
        No Internet Connection
      </Text>

      <Text className="text-gray-500 dark:text-gray-400 text-center text-base">
        Even the baby is crying because WiFi is gone.
        Please reconnect to continue.
      </Text>

    </View>
  );
};

export default NoInternetScreen;