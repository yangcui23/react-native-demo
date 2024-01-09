import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { View, Button, Alert, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { addDoc, collection, db } from "../../services/config";
import { useNavigation } from "@react-navigation/native";
export default function Payment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const [isPaymentSheetInitialized, setIsPaymentSheetInitialized] =
    useState(false);
  // import user from auth
  const { user } = useAuth();
  //props from Map component to render venue details
  const { venue, date, price, stripeAmount } = route.params;

  const displayPrice = (price / 100).toFixed(2);
  const displayTotal = (stripeAmount / 100).toFixed(2); //
  // handle saving order details to firebase database
  const handlePaymentSuccess = async () => {
    console.log("User object:", user); // Debugging line to check user object

    // Check if user object and its properties are defined
    if (!user || !user.displayName || !user.email) {
      console.error("User details are incomplete or missing");
      return;
    }
    //order details
    const orderDetails = {
      venueName: venue.name,
      userName: user.displayName,
      price: displayTotal,
      eventDate: date.toISOString(),
      userEmail: user.email,
      location: venue.location,
      image: venue.image,
    };
    console.log("Order details:", orderDetails);
    try {
      // built in hook from firebase to save document to firestore database
      const docRef = await addDoc(collection(db, "orders"), orderDetails);
      console.log("Order saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const redirectBackToMap = () => {
    navigation.navigate("MapTab");
  };
  //stripe payment
  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://10.0.0.2:3000/payments/intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: stripeAmount }), // Use the correct amount
      });

      const data = await response.json();
      console.log("Backend response:", data); // Debug log

      if (response.ok) {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: data.paymentIntent,
        });

        if (error) {
          console.error(`Error initializing payment sheet: ${error.message}`);
          Alert.alert(
            "Error",
            `Payment sheet initialization failed: ${error.message}`
          );
        } else {
          console.log("Payment sheet initialized successfully");
          setIsPaymentSheetInitialized(true);
        }
      } else {
        console.error("Error fetching clientSecret from backend:", data);
        Alert.alert("Error", "Error fetching payment data from backend");
      }
    } catch (e) {
      console.error(`Error during payment sheet initialization: ${e.message}`);
      Alert.alert("Error", `Payment initialization error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const handlePayment = async () => {
    if (!isPaymentSheetInitialized) {
      Alert.alert("Error", "Payment sheet is not initialized yet");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.error(`Payment error: ${error.code}`, error.message);
      Alert.alert("Payment Error", error.message);
    } else {
      console.log("Success, payment accepted!");
      Alert.alert("Payment Successful", "Your payment was accepted!");
      // Handle successful payment here
      if (user) {
        sendPaymentDetailsToBackend({
          venueName: venue.name,
          userName: user.displayName, // Use displayName from user object
          price: displayTotal,
          eventDate: date,
          userEmail: user.email,
          location: venue.location,
          image: venue.image,
        });
      } else {
        console.error("No user logged in");
      }
    }
    handlePaymentSuccess();
    setIsPaymentSheetInitialized(false);
    initializePaymentSheet();
  };
  // sending payment details to backend for sending email to merchant
  const sendPaymentDetailsToBackend = async (paymentDetails) => {
    try {
      const response = await fetch("http://10.0.0.2:3000/paymentDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {
        console.log("Payment details sent to backend");
      } else {
        console.error("Failed to send payment details to backend");
        const responseBody = await response.text();
        console.error(
          `Response Status: ${response.status}, Body: ${responseBody}`
        );
      }
    } catch (error) {
      console.error("Error sending payment details to backend:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{`Venue: ${venue.name}`}</Text>
      <Text>{`Location: ${venue.location}`}</Text>
      <Image source={{ uri: venue.image }} style={styles.venueImage} />
      <Text>{`Date: ${date.toDateString()}`}</Text>
      <Text>{`Price: $${venue.price.toFixed(2)}`}</Text>
      <Text>{`Total with Tax: $${displayTotal}`}</Text>

      <Button title="Checkout" disabled={loading} onPress={handlePayment} />
    </View>
  );
}
const styles = StyleSheet.create({
  venueImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
});
