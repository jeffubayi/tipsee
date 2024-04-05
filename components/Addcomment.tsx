import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from "../theme";

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter();

    return (
        <View style={{ marginHorizontal: 10 }}>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                        placeholder='Add comment'
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <MaterialIcons
                        size={25}
                        name="search"
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    userName: {
        fontWeight: "bold",
        fontSize: SIZES.xLarge,
        color: COLORS.secondary,
    },
    welcomeMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
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
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.medium,
    }
});

export default Welcome;