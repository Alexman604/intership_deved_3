import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQuizToDb } from "../firebase/firebaseConnection";
import axios from "axios";

const initialState = {
  questions: [],
  allAnswered: false,
  meAnswered:false,
  quizStatus: "beforeStart",
  quizLoadingStatus: "idle",

};

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const { data } = await axios.get("https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple");
   addQuizToDb(data.results);
  return data;
});

export const quizSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    changeMeAnswered: (state, action) => {
      state.meAnswered = action.payload;
    },
    changeAllAnswered: (state, action) => {
      state.allAnswered = action.payload;
    },
    changeStatus: (state, action) => {
      console.log(action.payload);
      state.quizStatus = action.payload;
    },
    setQuestions: (state, action) => {
      console.log(action.payload);
      state.questions = [...state.questions, action.payload];
    },
    deleteQuestionsFromStore: (state) => {
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.quizLoadingStatus = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.quizLoadingStatus = "idle";
        state.questions = action.payload.results;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.quizLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = quizSlice;

export default reducer;
export const { changeStatus, changeMeAnswered, changeAllAnswered,  setQuestions, deleteQuestionsFromStore } = actions;
