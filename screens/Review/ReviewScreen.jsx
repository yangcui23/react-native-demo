import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
const ReviewScreen = ({ route }) => {
  const { order } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  return (
    <View>
      <Text>Review </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReviewScreen;
