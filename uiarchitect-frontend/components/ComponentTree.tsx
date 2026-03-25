// Component that renders component tree (AI response)
// Also contains a navigation button to go back to the home page and a Title/ dynamic subtitle (based on selected language)

import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';

type TreeNode = {
    name: string;
    type: string;
    children?: TreeNode[];
};

export default function ComponentTree() {
    const router = useRouter();
    const params = useLocalSearchParams<{ componentTree?: string, language?: string }>();

    const componentTree: TreeNode | null = params.componentTree
    ? JSON.parse(params.componentTree)
    : null;
    const lang: string | null = params.language ? params.language : null;

    // recursive function to render component tree
    const renderNode = (node: TreeNode, path = "0") => {
        return (
            <View
                key={path}
                className={`pl-8 ${path === "0" ? '' : 'ml-4 border-l border-slate-200/40 pl-6'}`}
            >
                <Text
                    className="my-2 font-mono font-medium text-slate-100"
                >
                    {node.name}
                </Text>

                {node.children?.map((child, index) =>
                    renderNode(child, `${path}-${index}`)
                )}
            </View>
        );
    };

    return (
        <LinearGradient
            colors={['#1e40af', '#18181b']}
            style={{ flex: 1 }}
            start={{ x: 0.6, y: 1 }}
            end={{ x: 0.4, y: 0 }}
        >
            <ScrollView className="min-h-screen pl-4 pt-32 pb-16">
                {/* start over/ back icon */}
                <View className="w-full pb-6 px-2">
                    <Pressable
                        className="items-start"
                        onPress={() => router.push({ pathname: "/" })}
                    >
                        <Ionicons name="arrow-back" size={22} color="#f1f5f9" />
                    </Pressable>
                </View>
                

                <View className="mb-6">
                    {/* Title */}
                    <Text className="text-xl text-center font-bold text-slate-100 font-interBold">
                        Generated Component Architecture
                    </Text>

                    {/* Subtitle */}
                    <Text
                        className="text-center text-slate-300 py-4 font-inter"
                    >
                        React Native • {lang}
                    </Text>
                </View>

                {/* component tree */}
                {componentTree ? (
                    renderNode(componentTree)
                ) : (
                    // Error capture
                    <Text
                        className="text-lg text-center text-slate-900 py-4 font-inter"
                    >
                        No component tree available
                    </Text>
                )}
            </ScrollView>
        </LinearGradient>
    );
}