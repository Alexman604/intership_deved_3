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
  console.log(id);
  await deleteDoc(doc(db, "users", id));
  // await await setDoc(doc(db, "users", user.userId), user);
};

export const updUserReadyToStart = async (id, state) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, { readyToStart: state });
};

export const updUserAnswered = async (id, state) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, { answered: state });
};

export const updUserScore = async (id, state) => {
  const userDoc = doc(db, "users", id);
  const docSnap = await getDoc(userDoc);
  if (state === "plusone") {
    await updateDoc(userDoc, { score: docSnap.data().score + 1 });
  }
  if (state === "reset") {
    await updateDoc(userDoc, { score: 0 });
  }
};

export const deleQuestion = async (id) => {
  const qDoc = doc(db, "quiz", id);
  await deleteDoc(qDoc);
};

export const deleteQuestionsFromDb = async () => {
  const querySnapshot = await getDocs(quizRef);
  querySnapshot.forEach((doc) => {
    console.log("deleting ", doc.id);
    deleQuestion(doc.id);
  });
};
