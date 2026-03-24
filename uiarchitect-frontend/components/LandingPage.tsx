import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';

import Hero from './Hero';

export default function TestScreen() {
  return (
    <LinearGradient
        colors={['#1e40af', '#18181b']}
        style={{ flex: 1 }}
        start={{ x: 0.6, y: 1 }}
        end={{ x: 0.4, y: 0 }}
    >
        {/* Grid overlay */}
        <View style={{
            ...StyleSheet.absoluteFillObject,
            opacity: 0.04,
        }}>
            {[...Array(28)].map((_, row) => (
                <View key={row} style={{ flex: 1, flexDirection: 'row' }}>
                    {[...Array(14)].map((_, col) => (
                        <View
                        key={col}
                        style={{
                            flex: 1,
                            borderWidth: 0.5,
                            borderColor: '#ffffff',
                        }}
                        />
                    ))}
                </View>
            ))}
        </View>

        <ScrollView style={{ flex: 1 }}>
            <Hero />
        </ScrollView>
    </LinearGradient>
  );
}