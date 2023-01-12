import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const messagesRef = collection(db, "messages");

export const addMessage = async (id = "1heF8ElApQWjaRItKGQN", object) => {
  const msg = doc(db, "messages", id);
  const docSnap = await getDoc(msg);
  await updateDoc(msg, { list: [...docSnap.data().list, object] });
};
