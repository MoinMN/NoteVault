import { View } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Loader() {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);

  useEffect(() => {
    scale1.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    );

    scale2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    );

    scale3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 200 })
      ),
      -1
    );
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-3">
        <Animated.View
          style={dot1Style}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
        <Animated.View
          style={dot2Style}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
        <Animated.View
          style={dot3Style}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
      </View>
    </View>
  );
}