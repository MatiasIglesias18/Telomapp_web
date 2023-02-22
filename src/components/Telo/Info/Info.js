import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { Map } from "../../Shared";
import { styles } from "./Info.styles";

export function Info(props) {
  const { telo } = props;

  const listInfo = [
    {
      text: telo.address,
      iconType: "material-community",
      iconName: "map-marker",
    },
    {
      text: telo.phone,
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: telo.email,
      iconType: "material-community",
      iconName: "at",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el establecimiento:</Text>
      <Map location={telo.location} name={telo.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#F760A2" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
