import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Dispatch, SetStateAction } from "react";

type ConfirmationModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;

  title: string;
  description?: string;

  actionText: string;
  onAction: () => void;
  actionColor?: string;

  cancelText?: string;
};

const ConfirmationModal = ({
  visible,
  setVisible,
  title,
  description,
  actionText,
  onAction,
  actionColor = "#DC2626",
  cancelText = "Cancel",
}: ConfirmationModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setVisible(false)}
        className="flex-1 justify-end bg-black/30 dark:bg-black/60"
      >
        {/* Bottom Sheet */}
        <TouchableOpacity
          activeOpacity={1}
          className="bg-white dark:bg-[#121314] p-5 rounded-t-2xl"
        >
          {/* Title */}
          <Text className="text-black dark:text-white text-lg font-semibold text-center">
            {title}
          </Text>

          {/* Description */}
          {description && (
            <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2">
              {description}
            </Text>
          )}

          {/* Actions */}
          <View className="mt-6">
            {/* Action Button */}
            <TouchableOpacity
              style={{ backgroundColor: actionColor }}
              className="h-12 rounded-lg items-center justify-center"
              onPress={() => {
                setVisible(false);
                onAction();
              }}
            >
              <Text className="text-white font-semibold text-base">
                {actionText}
              </Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              className="mt-3 h-12 rounded-lg items-center justify-center"
              onPress={() => setVisible(false)}
            >
              <Text className="text-blue-600 dark:text-blue-400 text-base">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;
