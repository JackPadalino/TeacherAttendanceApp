import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const initialState = {
    selectedCalendarDate:{},
    coverageDay:{},
    newCoverageDate:{},
    allAbsentUsers: [],
    coveredClasses:[],
    allCoverages:[],
};

export const coverageSlice = createSlice({
  name: "coverage",
  initialState,
  reducers: {
    setSelectedCalendarDate:(state,action)=>{
      state.selectedCalendarDate = action.payload;
    },
    setCoverageDay: (state,action) => {
      state.coverageDay = action.payload;
    },
    resetCoverageDay: (state,action) => {
      console.log('reset coverage day function called')
      state.coverageDay = initialState.coverageDay
    },
    setNewCoverageDate: (state,action) => {
      state.newCoverageDate = action.payload;
    },
    resetNewCoverageDate: (state,action) => {
      state.newCoverageDate = initialState.newCoverageDay
    },
    setAllAbsentUsers: (state, action) => {
      state.allAbsentUsers = action.payload;
    },
    resetAllAbsentUsers: (state, action) => {
      state.allAbsentUsers = initialState.allAbsentUsers;
    },
    setCoveredClasses: (state, action) => {
      state.coveredClasses = action.payload;
    },
    setAllCoverages:(state,action)=>{
      state.allCoverages = action.payload;
    }
  },
});

export const {
  setSelectedCalendarDate,
  setCoverageDay,
  resetCoverageDay,
  setNewCoverageDate,
  resetNewCoverageDate,
  setAllAbsentUsers,
  resetAllAbsentUsers,
  setCoveredClasses,
  setAllCoverages,
} = coverageSlice.actions;

export default coverageSlice.reducer;