import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ComponentTree() {
    type ComponentTreeType = {
    App: {
        Components: string[];
        Constants: string[];
        Hooks: string[];
    };
    };

    const params = useLocalSearchParams<{ componentTree?: string }>();
    const componentTree: ComponentTreeType | null = params.componentTree
    ? JSON.parse(params.componentTree)
    : null;

    return (
    <View className='h-screen items-center justify-center'>
        {componentTree && Object.entries(componentTree).map(([parent, sections]) => (
        <View key={parent}>
            <Text className="font-bold font-mono">{parent}</Text>
            
            {Object.entries(sections).map(([sectionName, items]) => (
                <View key={sectionName} className="ml-4">
                    <Text className="font-semibold font-mono">{sectionName}</Text>
                    {items.map((item: any) =>
                    typeof item === 'string' ? (
                        <Text key={item} className="ml-4 font-mono">{item}</Text>
                    ) : (
                        // handle nested objects
                        <Text key={item.name} className="ml-4 font-mono">{item.name}</Text>
                    )
                    )}
                </View>
            ))}
        </View>
        ))}
    </View>
    );
}