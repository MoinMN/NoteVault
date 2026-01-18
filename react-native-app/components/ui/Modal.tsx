import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Dispatch, SetStateAction } from "react";

type ConfirmationModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;

  title: string;
  description?: string;

  actionText: string;
  onAction: () => void;
  actionColor?: string; // default fallback

  cancelText?: string;
};

const ConfirmationModal = ({
  visible,
  setVisible,
  title,
  description,
  actionText,
  onAction,
  actionColor = "#DC2626", // red default
  cancelText = "Cancel",
}: ConfirmationModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setVisible(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        }}
      >
        {/* Bottom Sheet */}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: "#121314",
            padding: 20,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          {/* Title */}
          <Text className="text-white text-lg font-semibold text-center">
            {title}
          </Text>

          {/* Description */}
          {description && (
            <Text className="text-gray-400 text-sm text-center mt-2">
              {description}
            </Text>
          )}

          {/* Actions */}
          <View className="mt-6">
            {/* Action */}
            <TouchableOpacity
              style={{
                backgroundColor: actionColor,
                height: 48,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setVisible(false);
                onAction();
              }}
            >
              <Text className="text-white text-base font-semibold">
                {actionText}
              </Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity
              className="mt-3 h-12 rounded-lg items-center justify-center"
              onPress={() => setVisible(false)}
            >
              <Text className="text-blue-500 text-base">
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