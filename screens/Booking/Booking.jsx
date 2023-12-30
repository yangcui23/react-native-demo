import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';

const Booking = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { venue } = route.params;
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
 
    const price = venue.price; 

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const handleProceedToPayment = () => {
        const taxRate = 0.10; // Example tax rate
        const taxAmount = price * taxRate;
        const totalPrice = price + taxAmount;
        const stripeAmount = totalPrice * 100; // Convert to cents for Stripe

        navigation.navigate('Payment', { venue, stripeAmount,date });
    };

    return (
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>{venue.name}</Text>
            <Text>{venue.location}</Text>
            <Text>{`Price: $${venue.price}`}</Text>

            <View style={{ margin: 20 }}>
                <Button onPress={showDatepicker} title="Show Date Picker" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Button
                title="Proceed to Payment"
                onPress={handleProceedToPayment}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

export default Booking;