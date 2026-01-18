import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type HeaderProps = {
  headTitle: string,
  subHeadLine: string,
  count: number,
  showMenu: boolean,
  setShowMenu: Dispatch<SetStateAction<boolean>>,
  MenuComponent?: ReactNode,
}

const Header = ({
  headTitle, subHeadLine, count, showMenu, setShowMenu, MenuComponent
}: HeaderProps) => {

  return (
    <View className="flex-row items-start justify-between">
      <View>
        <Text className="text-3xl font-bold text-black dark:text-white">
          {headTitle}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {count + " " + subHeadLine}
        </Text>
      </View>

      {/* menu box */}
      {showMenu && MenuComponent}

      {/* Three-dot menu */}
      <TouchableOpacity onPress={() => setShowMenu(true)}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header
