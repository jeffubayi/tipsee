import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialIcons, Octicons, Fontisto } from '@expo/vector-icons'
import { Divider } from '@rneui/themed'
import { COLORS, SIZES } from '../theme'

const tips = ({ from, body, like, comments }) => {
    const resetLike = () => {
        !like
    }
    return (

        <View
            style={{
                backgroundColor: COLORS.white,
                padding: 20,
                borderRadius: SIZES.medium,
                marginVertical: 8,
                marginHorizontal: 14,
            }}
        >
            <View
                style={{ flexDirection: "row", justifyContent: "space-between", gap: 2, marginVertical: 5 }}
            >
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image
                        height={20}
                        width={20}
                        style={{ borderRadius: 50 }}
                        source={{
                            uri: "https://cdn.stealthoptional.com/images/ncavvykf/stealth/f60441357c6c210401a1285553f0dcecc4c4489e-564x564.jpg?w=450&h=450&auto=format",
                        }}
                    />
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{from}</Text>
                </View>
                <View>
                    <MaterialIcons name={like ? "favorite" : "favorite-border"} size={22} color={like ? COLORS.tertiary : "grey"} onPress={resetLike} />
                </View>
            </View>
            <Text style={{ fontSize: 15, marginVertical: 5 }}>{body}</Text>

            <Divider style={{ marginVertical: 8 }} />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 3,
                }}
            >
                <View style={{ flexDirection: "row", gap: 2 }}>
                    <Fontisto name="comment" size={16} color="grey" />
                    <Text style={{ fontSize: 14, color: "grey" }}>{comments.length} comments</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                    <Octicons name="thumbsup" size={16} color="grey" />
                    <Text style={{ fontSize: 14, color: "grey", marginRight: 5 }}>0</Text>
                    <Octicons name="thumbsdown" size={16} color="grey" />
                    <Text style={{ fontSize: 14, color: "grey" }}>0 </Text>
                </View>
            </View>
        </View>
    )
}

export default tips