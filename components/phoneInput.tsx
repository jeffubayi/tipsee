import { View, Text } from 'react-native'
import React from 'react'
import PhoneInput from 'react-native-phone-input'

const phoneInput = ({phoneError,phoneNumber,onChangePhoneNumber}:{phoneError:any,phoneNumber:any,onChangePhoneNumber:any}) => {
    return (
        <View style={{width:"100%"}}>
            <Text style={{ fontWeight: "bold", color: "#95a0aa", fontSize: 15, alignSelf: "flex-start", marginBottom: 10, marginHorizontal: 10 }}>Phone Number</Text>
            <PhoneInput
                ref={phoneNumber}
                onChangePhoneNumber={onChangePhoneNumber}
                initialCountry={'ke'}
                initialValue="254"
                style={{
                    border: "2px solid grey",
                    marginBottom: 15,
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#95a0aa"
                }}
                textProps={{
                    placeholder: 'Enter a phone number...',
                    fontSize: 15,
                    marginVertical: 5
                }} />
            {phoneError && <Text style={{ color: "red", fontSize: 11, alignSelf: "flex-start", marginBottom: 15, marginTop: -15, marginHorizontal: 10 }}>Phone Number is required</Text>}
        </View>
    )
}

export default phoneInput