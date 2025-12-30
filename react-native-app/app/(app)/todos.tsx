import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

const ToDo = () => {
  return (
    <SafeAreaView>
      <Text className="bg-red-500">
        This is my To Do List App
      </Text>
      <Pressable
        onPress={async () => await SecureStore.deleteItemAsync("auth_token")}
        className="bg-blue-500 p-3 rounded"
      >
        <Text className="text-white text-center font-semibold">
          Log Out
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ToDo;