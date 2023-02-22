import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { Carousel, Loading } from "../../../components/Shared";
import {
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorites,
  BtnReserve,
} from "../../../components/Telo";
import { db } from "../../../utils";
import { styles } from "./TeloScreen.styles";

const { width } = Dimensions.get("window");

export function TeloScreen(props) {
  const { route } = props;

  const [telo, setTelo] = useState(null);

  useEffect(() => {
    setTelo(null);
    onSnapshot(doc(db, "telos", route.params.id), (doc) => {
      setTelo(doc.data());
    });
  }, [route.params.id]);

  if (!telo) return <Loading show text="Cargando" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={telo.images} height={250} width={width} />
      <Header telo={telo} />
      <Info telo={telo} />
      <BtnReserve idTelo={route.params.id} />
      <BtnReviewForm idTelo={route.params.id} />
      <Reviews idTelo={route.params.id} />
      <BtnFavorites idTelo={route.params.id} />
    </ScrollView>
  );
}
