import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQuizToDb } from "../firebase/firebaseConnection";
import axios from "axios";

const initialState = {
  questions: [],
  scores: 0,
  quizStatus: "beforeStart",
  quizLoadingStatus: "idle",
};

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const { data } = await axios.get("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple");
  addQuizToDb(data.results);
  return data;
});

export const quizSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addScores: (state) => {
      state.scores = state.scores + 1;
    },
    changeStatus: (state, action) => {
      state.quizStatus = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = [...state.questions, action.payload]
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
export const { changeStatus, addScores, setQuestions } = actions;
