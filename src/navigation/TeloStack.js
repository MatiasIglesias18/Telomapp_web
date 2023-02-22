import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TelosScreen } from "../screens/Telos/TelosScreen";
import { AddTelosScreen } from "../screens/Telos/AddTelosScreen";
import { TeloScreen } from "../screens/Telos/TeloScreen";
import { AddTeloReviewScreen } from "../screens/Telos/AddTeloReviewScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function TeloStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.telo.telos}
        component={TelosScreen}
        options={{ title: "Telos" }}
      />
      <Stack.Screen
        name={screen.telo.addTelo}
        component={AddTelosScreen}
        options={{ title: "Agregar Telo" }}
      />
      <Stack.Screen
        name={screen.telo.telo}
        component={TeloScreen}
        options={{ title: "Telo" }}
      />
      <Stack.Screen
        name={screen.telo.AddTeloReviewScreen}
        component={AddTeloReviewScreen}
        options={{ title: "Nueva Review" }}
      />
    </Stack.Navigator>
  );
}
