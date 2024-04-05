import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomSheet, Button } from '@rneui/themed'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../theme'

const createTip = ({ isVisible, title, handleCancel, submit, isSubmitting, children }: { isVisible: boolean, title: string, handleCancel: () => void, children: any, isSubmitting: boolean, submit: () => void }) => {
    return (
        <BottomSheet modalProps={{}} isVisible={isVisible} >
            <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, borderRadius: 15 }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <View>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: SIZES.large,
                            color: COLORS.primary,
                        }}>{title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCancel}>
                        <MaterialIcons
                            name="close"
                            size={22}
                            color={COLORS.tertiary}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginHorizontal: 10,
                    marginVertical: 30,
                }}>
                    {children}
                    <Button
                        buttonStyle={{
                            backgroundColor: COLORS.tertiary,
                            borderRadius: 13,
                            paddingVertical: 13,
                        }}
                        // disabled={!isSubmitting}
                        loading={isSubmitting}
                        containerStyle={{
                            width: "auto",
                        }}
                        onPress={submit}
                    >
                       {title}
                    </Button>
                </View>
            </View>
        </BottomSheet>
    )
}

export default createTip