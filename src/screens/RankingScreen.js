import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { map } from "lodash";
import { TeloRanking } from "../components/Telos";
import { db } from "../utils";

export function RankingScreen() {
  const [telos, setTelos] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "telos"),
      orderBy("ratingMedia", "desc"),
      limit(5)
    );
    onSnapshot(q, (snapshot) => {
      setTelos(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(telos, (telo, index) => (
        <TeloRanking key={index} index={index} telo={telo.data()} />
      ))}
    </ScrollView>
  );
}
