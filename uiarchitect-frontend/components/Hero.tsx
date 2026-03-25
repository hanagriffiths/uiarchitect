// Body of landing page that allows users to select a UI image and programming language to generate the component tree

import { ActivityIndicator, Alert, Image, Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { languages } from '@/constants/Languages';
import Ionicons from '@expo/vector-icons/Ionicons';

const BACKEND_URL = 'http://127.0.0.1:8000/api';

export default function Hero() {
    const router = useRouter();

    const [image, setImage] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState<string>(languages[0]);
    const [mimeType, setMimeType] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const selectImage = async () => {
        const permissionRes = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionRes.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        };

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setMimeType(result.assets[0].mimeType || null);
        };
    };

    const generateArchitecture = async() => {
        setLoading(true);

        const formData = new FormData();

        // work out extension (default to jpeg)
        const ext =
        mimeType === "image/png" ? "png" :
        mimeType === "image/jpeg" ? "jpg" :
        mimeType === "image/gif" ? "gif" :
        "jpeg";

        image && formData.append("image", {
            uri: image,
            name: `upload.${ext}`,
            type: mimeType,
        } as any);
        mimeType && formData.append("mimeType", mimeType);
        formData.append("language", selectedLang);

        try {
            const res = await fetch(`${BACKEND_URL}/generate`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = await res.json();

            if (data.success) {
                const componentTree = data.data;
                const language = data.language;

                router.push({
                    pathname: "/component-tree",
                    params: { componentTree: JSON.stringify(componentTree), language: language }
                });
            } else {
                setImage(null);
                if (!(data.error === "ParseError")) {
                    Alert.alert('Incorrect image type', 'Please upload a UI image.');
                    return;
                } else {
                    Alert.alert('Something went wrong', 'Please try again.');
                    return;
                }
            }
        } catch (err) {
            setImage(null);
            Alert.alert('Something went wrong', 'Please try again.');
            console.error('Something went wrong when fetching component tree.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className='relative min-h-screen w-screen pt-20 pb-8 items-center flex-col'>
            <View className='w-full py-6 px-8 gap-4'>
                {/* app name */}
                <Text className='pt-4 pb-2 text-2xl font-inter text-slate-50'>
                    UI Architect
                </Text>

                {/* heading */}
                <Text className='pr-20 py-2 text-3xl font-interBoldItalic text-slate-300'>
                    Turn UI screenshots into component architecture
                </Text>

                {/* description */}
                <Text className='text-[15px] font-inter text-justify text-slate-50'>
                    Upload any interface and instantly generate a structured React Native component tree. Understand layouts faster and build with confidence.
                </Text>
            </View>
            

            {/* image upload box */}
            <View
                className='w-full py-12 items-center justify-start flex-col'
            >
                {image ? (
                    <View className='flex-1 flex-col gap-10 items-center'>
                        <View>
                            {/* preview image */}
                            <Image
                                source={{ uri: image }}
                                resizeMode='cover'
                                className='h-64 w-80 border border-slate-50/30'
                            />

                            {/* remove selected image button */}
                            <Pressable
                                className='absolute top-2 right-2'
                                onPress={() => setImage(null)}
                                disabled={loading}
                            >
                                <Ionicons name="close-sharp" size={28} color="white" />
                            </Pressable>
                        </View>

                        <View className='flex-col gap-4 w-full'>
                            {/* language select helper prompt */}
                            <Text className='font-interItalic text-slate-50'>
                                Select a programming language:
                            </Text>

                            {/* programming language select (disabled on loading) */}
                            <View className='flex-row bg-blue-100/10'>
                                {languages.map((lang, idx) => (
                                    <View
                                        key={lang}
                                    >
                                        <Pressable
                                            className={`
                                                px-4 py-2
                                                ${selectedLang === lang ? 'bg-blue-50/40 border border-slate-50/40' : ''}
                                            `}
                                            onPress={() => setSelectedLang(lang)}
                                            disabled={loading}
                                        >
                                            <Text
                                                className={`
                                                    font-inter text-base
                                                    ${loading ? 'opacity-60' : ''}
                                                    ${selectedLang === lang ? 'text-slate-900' : 'text-slate-50'}
                                                `}
                                            >
                                                {lang}
                                            </Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                        

                        {/* generate component architecture button (disabled on loading) */}
                        <Pressable
                            className='py-2 px-4 items-center justify-center rounded-md border border-slate-950/80 bg-slate-800'
                            onPress={generateArchitecture}
                            disabled={loading}
                        >
                            <Text className='text-lg text-slate-50'>
                                Generate
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <View
                        className='h-64 w-80 items-center justify-center border border-dashed border-slate-50 bg-slate-50/5'
                    >
                        <Pressable
                            onPress={selectImage}
                            disabled={loading}
                        >
                            <Text className='text-xl underline text-slate-50'>
                                Upload an image
                            </Text>
                        </Pressable>
                    </View>  
                )}
            </View>

            {/* loading state */}
            {loading && (
                <View
                    className="h-screen w-screen absolute top-0 left-0 right-0 bottom-0 items-center justify-center"
                    style={{ backgroundColor: '#f1f5f933', zIndex: 100, elevation: 100 }}
                >
                    <ActivityIndicator size="large" color="#f1f5f9" />
                </View>
            )}
        </View>
    );
}
