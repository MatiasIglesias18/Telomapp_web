import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterForm } from "../../../components/Auth";
import { styles } from "./RegisterScreen.style";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <Image
        source={require("../../../../assets/img/Logo_Telomapp.png")}
        style={styles.image}
      />

      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
