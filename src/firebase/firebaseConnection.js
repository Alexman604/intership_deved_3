import { collection, getDoc, getDocs, updateDoc, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const messagesRef = collection(db, "messages");

export const addMessage = async (id = "1heF8ElApQWjaRItKGQN", object) => {
  const msg = doc(db, "messages", id);
  const docSnap = await getDoc(msg);
  await updateDoc(msg, { list: [...docSnap.data().list, object] });
};

export const quizRef = collection(db, "quiz");

export const getQuestionsFromDb = async () => {
  const querySnapshot = await getDocs(quizRef);
  return querySnapshot.forEach((doc) => {
    return { id: doc.id, ...doc.data() };
    // doc.data() is never undefined for query doc snapshots
  });
};

export const usersRef = collection(db, "users");

export function addQuizToDb(data) {
  // for (const user in data.Accounts) {
  //     addDocToDBuser(accountsRef, {user, ...data.Accounts[user]})
  // }

  console.log("adding question to DB from Slice fetching", data);
  data.map((question) => {
    addQuestion({ ...question });
  });
}

export async function addQuestion(question) {
  await addDoc(quizRef, question);
}
