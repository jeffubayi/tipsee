import { MaterialIcons, Fontisto, Octicons } from '@expo/vector-icons';
import { Divider, Input } from '@rneui/themed';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../theme';
import CreateTip from '../components/createTip';
import axios from 'axios';

const detail = ({ navigation, route }) => {
  const [from, setFrom] = useState("");
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = "https://e230-41-81-0-205.ngrok-free.app";
  const [counterDown, setCounterDown] = useState(0);
  const [counterUp, setCounterUp] = useState(0);

  //upVote counter
  const upVote = () => {
    setCounterUp(count => count + 1);
  };

  //downVote counter
  const downVote = () => {
    setCounterDown(count => count - 1);
  };


  const submit = async () => {
    setEmailError(false);
    setCommentError(false);
    if (!from.trim()) {
      setEmailError(true);
    }
    if (!comment.trim()) {
      setCommentError(true);
    }
    setIsSubmitting(true);
    const data = {
      from,
      body: comment,
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

  const handleGet = async () => {
    try {
      await axios.get(`${baseUrl}/api/v1/tips`).then((response) => {
        console.log("####### TIPS #########", response.data.data);
        const data = response.data.data.reverse();
      });
    } catch (error) {
      // alert("Error fetching tip");
    }
  };

  const handleCancel = () => {
    setModalVisible(!modalVisible);
  };

  const handleLike = () => {
    setLike(true);
  };
  console.log('******************DATA', route.params.item)
  const resetLike = () => {
    !route.params.item.like
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{
          padding: 20,
          borderRadius: SIZES.medium,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", gap: 2, marginVertical: 5 }}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Image
              height={20}
              width={20}
              style={{ borderRadius: 50 }}
              source={{
                uri: "https://cdn.stealthoptional.com/images/ncavvykf/stealth/f60441357c6c210401a1285553f0dcecc4c4489e-564x564.jpg?w=450&h=450&auto=format",
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{route.params.item.from}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setLike(!like)}>
              <MaterialIcons name={like ? "favorite" : "favorite-border"} size={25} color={like ? COLORS.tertiary : "grey"} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ fontSize: 17 }}>{route.params.item.body}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Fontisto name="comment" size={18} color="grey" />
            <Text style={{ fontSize: 14, color: "grey" }}>{route.params.item.comments.length} comments</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Octicons name="thumbsup" size={17} color="grey" onPress={upVote} />
            <Text style={{ fontSize: 14, color: "grey", marginRight: 8 }}>{counterUp}</Text>
            <Octicons name="thumbsdown" size={17} color="grey" onPress={downVote} />
            <Text style={{ fontSize: 14, color: "grey" }}>{counterDown}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: COLORS.white, borderRadius: 8 }}>
          <View style={{ marginHorizontal: 20, padding: 5 }}>
            {route.params.item.comments.length > 0 ? (
              <FlatList
                data={route.params.item.comments}
                ItemSeparatorComponent={() => (<Divider inset={true} insetType="right" style={{ marginVertical: 10 }} />)}
                renderItem={({ item }) => (
                  <View style={{ marginVertical: 5 }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.from}</Text>
                    <Text style={{ fontSize: 12, color: "grey" }}>{item.body}</Text>
                  </View>

                )}
                keyExtractor={(item) => item._id}
              />
            ) : (
              <Text style={{ fontSize: 12, color: "grey", alignSelf: "center", marginVertical: 10 }}>No Comments added</Text>
            )}
            {/* <Button
              buttonStyle={{
                backgroundColor: COLORS.tertiary,
                borderRadius: 13,
                paddingVertical: 10,
              }}
              containerStyle={{
                width: "auto",
                marginVertical: 10,
              }}
              onPress={() => setModalVisible(true)}
            >
              Add comment
            </Button> */}



          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={comment}
                onChangeText={text => setComment(text)}
                placeholder='Add new comment'
              />
            </View>

            <TouchableOpacity style={styles.searchBtn} onPress={() => setModalVisible(true)}>
              <MaterialIcons
                size={20}
                name="send"
                color="#fff"
              />
            </TouchableOpacity>
          </View>

        </View>
        <CreateTip
          isVisible={modalVisible}
          title="Add Comment"
          handleCancel={handleCancel}
          isSubmitting={isSubmitting}
          submit={submit}
        >
          <Input
            placeholder="Type your name"
            label="Name"
            value={from}
            onChangeText={setFrom}
            errorMessage={emailError ? "Sender name is required" : ""}
          />
          <Input
            placeholder="Type your comment"
            label="Comment"
            value={comment}
            onChangeText={setComment}
            errorMessage={commentError ? "Feedback is required" : ""}
          />
        </CreateTip>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: SIZES.large,
    marginHorizontal:5,
    marginVertical:5,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});

export default detail;