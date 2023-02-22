import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import {
  UserNotLogged,
  NotFoundTelos,
  TeloFavorite,
} from "../components/Favorites";
import { Loading } from "../components/Shared";
import { db } from "../utils";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  const [telos, setTelos] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async (snapshot) => {
        let teloArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "telos", data.idTelo);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;

          teloArray.push(newData);
        }
        setTelos(teloArray);
      });
    }
  }, [hasLogged]);

  if (!hasLogged) return <UserNotLogged />;

  if (!telos) return <Loading show text="Cargando" />;

  if (size(telos) === 0) return <NotFoundTelos />;

  return (
    <ScrollView>
      {map(telos, (telo) => (
        <TeloFavorite key={telo.id} telo={telo} />
      ))}
    </ScrollView>
  );
}
