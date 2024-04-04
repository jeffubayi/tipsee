import { useState, useRef, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  FlatList,
  Text,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Welcome from "./components/welcome/welcome";
import { Input, Button, Avatar, Divider, BottomSheet } from "@rneui/themed";
import { COLORS, FONT, SIZES } from "./theme";
import FAB from "react-native-fab";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import PhoneInput from "./components/phoneInput";
import axios from "axios";

export default function App() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [from, onChangeEmail] = useState("");
  const [body, onChangePassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phone, onChangePhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const phoneNumber = useRef();
  const baseUrl = "https://e230-41-81-0-205.ngrok-free.app";
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      from: "Tepela",
      body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      from: "George",
      body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      from: "Musa",
      body: "When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines",
    },
  ];

  const handleRequest = async () => {
    // e.preventDefault();
    setIsSubmitting(true)
    const data = {
      phone,
      from,
      body,
    };
    await axios.post(`${baseUrl}/api/v1/tips`, data).then((response) => {
      console.log("####### DATA #########", response.data);
      setModalVisible(!modalVisible);
      alert("Tip sent succesfully");
      handleGet();
      setIsSubmitting(false)
    });
  };

  const handleGet = async () => {
    await axios.get(`${baseUrl}/api/v1/tips`).then((response) => {
      console.log("####### DATA #########", response.data.data);
      const data = response.data.data.reverse();
      setData(data);
    });

    // alert("Tip sent");
  };

  useEffect(() => {
    handleGet();
  }, [data]);

  const Item = ({ from, body }) => (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10 }}
      >
        <Image
          style={{
            width: 10,
            height: 20,
            borderRadius: 10,
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4zJJ9ltAPU2lRkBwfYkLYMoYCTtPGYKinLW9-dlGbW1E6zEFxaso1fC7Wjcqiz_MVKA&usqp=CAU",
          }}
        />
        <Text style={{ fontSize: 23 }}>{from}</Text>
      </View>
      <Text style={{ fontSize: 13 }}>{body}</Text>
      <Divider style={{ marginVertical: 5 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 10,
          marginVertical: 1,
        }}
      >
        <MaterialIcons name="arrow-circle-up" size={20} color="grey" />
        <MaterialIcons name="arrow-circle-down" size={20} color="grey" />
        <MaterialIcons name="favorite-border" size={20} color="grey" />
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={
              () => router.push(`/detail`)
              //   {
              //   if (searchTerm) {
              //     router.push(`/search/${searchTerm}`);
              //   }
              // }
            }
          />
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item from={item.from} body={item.body} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <PhoneInput
              phoneNumber={phoneNumber}
              onChangePhoneNumber={onChangePhoneNumber}
              phoneError={phoneError}
            />
            <Input
              style={styles.input}
              placeholder="Type your name"
              label="Name"
              value={from}
              onChangeText={onChangeEmail}
              errorMessage={emailError ? "Name address is required" : ""}
            />
            <Input
              style={styles.input}
              placeholder="Type your tip"
              label="Tips"
              value={body}
              onChangeText={onChangePassword}
              errorMessage={passwordError ? "Tips is required" : ""}
            />
            <Button
              buttonStyle={{
                backgroundColor: COLORS.tertiary,
                borderRadius: 6,
                paddingVertical: 10,
              }}
              loading={isSubmitting}
              containerStyle={{
                width: 330,
                marginHorizontal: 10,
              }}
              onPress={handleRequest}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
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
