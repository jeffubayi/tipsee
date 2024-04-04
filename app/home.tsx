import { useState } from "react";
import { SafeAreaView, ScrollView, View,Text,FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import Welcome from "../components/welcome/welcome"

export default function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            from: 'Tepela',
            body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            from: 'George',
            body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            from: 'Musa',
            body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
        },
    ];

    const Item = ({ from, body }) => (
        <View style={{
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        }}>
            <Text style={{ fontSize: 32 }}>{from}</Text>
            <Text style={{ fontSize: 32 }}>{body}</Text>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#FFF" },
                    headerShadowVisible: false,
                    headerTitle: "Tipsee",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: 5,
                    }}
                >
                    {/* <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`);
                            }
                        }}
                    /> */}
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item from={item.from} body={item.body} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}