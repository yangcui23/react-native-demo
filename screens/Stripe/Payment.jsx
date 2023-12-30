import React, { useState, useEffect } from "react";
import {
  StripeProvider,
  useStripe,
  CardField,
  presentPaymentSheet,
  usePaymentSheet
} from "@stripe/stripe-react-native";
import { View, Button, Alert, Text } from "react-native";
import { useRoute } from "@react-navigation/native";


export default function Payment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  const route = useRoute();

  const { venue, date, price, stripeAmount } = route.params;
  
  const displayPrice = (price / 100).toFixed(2); // Convert cents to dollars for display
  const displayTotal = (stripeAmount / 100).toFixed(2); // Convert
  
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    setLoading(true);

    // Call your backend to create a payment intent
    const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // amount in cents
    });

    const { clientSecret } = await response.json();

    // Initialize the payment sheet
    const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
    });

    if (!error) {
        setLoading(false);
    }
};

const handlePayment = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
        console.error(`Error code: ${error.code}`, error.message);
    } else {
        console.log('Success, payment accepted!');
    }
};


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{`Venue: ${venue.name}`}</Text>
      <Text>{`Date: ${date.toDateString()}`}</Text>
      <Text>{`Price: $${venue.price.toFixed(2)}`}</Text>
      <Text>{`Total with Tax: $${displayTotal}`}</Text>
      <CardField
        style={{ width: "100%", height: 50 }}
        postalCodeEnabled={false}
      />
      <Button title="Checkout" disabled={loading} onPress={handlePayment} />
    </View>
  );
}
