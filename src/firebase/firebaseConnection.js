import { collection, getDoc, getDocs, updateDoc, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export const messagesRef = collection(db, "messages");
export const quizRef = collection(db, "quiz");
export const usersRef = collection(db, "users");

export const addMessage = async (id = "1heF8ElApQWjaRItKGQN", object) => {
  const msg = doc(db, "messages", id);
  const docSnap = await getDoc(msg);
  await updateDoc(msg, { list: [...docSnap.data().list, object] });
};


export const getQuestionsFromDb = async () => {
  const querySnapshot = await getDocs(quizRef);
  return querySnapshot.forEach((doc) => {
    return { id: doc.id, ...doc.data() };
   
  });
};

export async function addQuestion(question) {
  await addDoc(quizRef, question);
}

export function addQuizToDb(data) {

  console.log("adding question to DB from Slice fetching", data);
  data.map((question) => {
    addQuestion({ ...question });
  });
}

export const addUserToDB = async (user) => {
  await await setDoc(doc(db, "users", user.userId), user);
};

export const removeUserFromDB = async (id) => {
  console.log(id)
  await deleteDoc(doc(db, "users", id));
  // await await setDoc(doc(db, "users", user.userId), user);
};
