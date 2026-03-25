import { ActivityIndicator, View } from "react-native";

export default function LoadingOverlay() {
  return (
    <View
        className="h-screen w-screen absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
        style={{ backgroundColor: '#f1f5f933', zIndex: 100, elevation: 100 }}
    >
      <ActivityIndicator size="large" color="#f1f5f9" />
    </View>
  );
}