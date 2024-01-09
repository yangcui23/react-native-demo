import React, { createContext, useState, useContext, useEffect } from "react";
import { db, getDocs, collection, query, where } from "./config";
import useAuth from "../hooks/useAuth";

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
