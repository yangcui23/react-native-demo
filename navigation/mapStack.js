import { createStackNavigator } from "@react-navigation/stack";

import Map from "../screens/Map/Map";
import Booking from "../screens/Booking/Booking";
import Payment from "../screens/Stripe/Payment";
const MapStack = createStackNavigator();

const MapStackNavitagor = () => {
    return (
        <MapStack.Navigator screenOptions={{ headerShown: false }}>
            <MapStack.Screen name="Map" component={Map} />
            <MapStack.Screen name="Booking" component={Booking} />
            <MapStack.Screen name="Payment" component={Payment} />
            
        </MapStack.Navigator>
    )

}


export default MapStackNavitagor;