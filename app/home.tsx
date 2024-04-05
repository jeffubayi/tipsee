import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SafeAreaView, TouchableOpacity, ScrollView,  FlatList } from "react-native";
import { Input } from "@rneui/themed";
import { COLORS } from "../theme";
import FAB from "react-native-fab";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "../components/phoneInput";
import CreateTip from "../components/createTip";
import TipCard from "../components/tips";

const DATA = [
    {
        _id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        from: "Tepela",
        like: true,
        comments: [
            {
                _id: "bd7acbea-c16c2-aed5-3ad53abb28ba",
                from: "Mary",
                body: "You are a lier, it 100 bob to Juja",
            },
            {
                _id: "bd7acbea-c16c2-aed5-3ad53abb28ba",
                from: "Thomas",
                body: "I agree with mary, the price is different",
            }
        ],
        body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
    {
        _id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        from: "George",
        like: false,
        comments: [],
        body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
    {
        _id: "58694a0f-3da1-471f-bd96-145571e29d72",
        from: "Musa",
        like: true,
        comments: [],
        body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
];

export default function Home({ navigation }) {
    const [data, setData] = useState(DATA);
    const [from, setFrom] = useState("");
    const [body, setBody] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phone, onChangePhoneNumber] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const phoneNumber = useRef();
    const baseUrl = "https://e230-41-81-0-205.ngrok-free.app";

    const submit = async () => {
        setEmailError(false);
        setPasswordError(false);
        setPhoneError(false);
        if (!from.trim()) {
            setEmailError(true);
        }
        if (!body.trim()) {
            setPasswordError(true);
        }
        if (!phone.trim()) {
            setPhoneError(true);
        }
        setIsSubmitting(true);
        const data = {
            phone,
            from,
            body,
        };
        try {
            await axios.post(`${baseUrl}/api/v1/tips`, data).then((response) => {
                setModalVisible(!modalVisible);
                alert("Tip sent successfully");
                handleGet();
                setIsSubmitting(false);
            });
        } catch (error) {
            alert("Error sending tip");
        }
    };

    const handleCancel = () => {
        setModalVisible(!modalVisible);
    };

    const handleSearch = () => {
    };

    const handleGet = async () => {
        try {
            await axios.get(`${baseUrl}/api/v1/tips`).then((response) => {
                console.log("####### TIPS #########", response.data.data);
                const data = response.data.data.reverse();
                if (data) {
                    setData(data);
                } else (
                    setData(DATA)
                )
            });
        } catch (error) {
            // alert("Error fetching tip");
        }
    };

    useEffect(() => {
        handleGet();
    }, [data]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.push('detail', { item })}>
                            <TipCard
                                from={item.from}
                                body={item.body}
                                like={item.like}
                                comments={item.comments}
                            />

                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                />
            </ScrollView>
            <CreateTip
                isVisible={modalVisible}
                title="Create a Tip"
                handleCancel={handleCancel}
                isSubmitting={isSubmitting}
                submit={submit}
            >
                <PhoneInput
                    phoneNumber={phoneNumber}
                    onChangePhoneNumber={onChangePhoneNumber}
                    phoneError={phoneError}
                />
                <Input
                    placeholder="Type your name"
                    label="Name"
                    value={from}
                    onChangeText={setFrom}
                    errorMessage={emailError ? "Sender name is required" : ""}
                />
                <Input
                    placeholder="Type your tip"
                    label="Tips"
                    value={body}
                    onChangeText={setBody}
                    errorMessage={passwordError ? "Tips is required" : ""}
                />
            </CreateTip>

            <FAB
                buttonColor={COLORS.tertiary}
                iconTextColor="#FFFFFF"
                onClickAction={() => setModalVisible(true)}
                visible={true}
                iconTextComponent={<MaterialIcons name="add" />}
            />
        </SafeAreaView>
    );
}