import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coverageDay:null,
    newCoverageDate:null,
    dateSelected:false,
    allAbsentUsers: [],
    coveredClasses:[],
    allCoverages:[]
};

export const coverageSlice = createSlice({
  name: "coverage",
  initialState,
  reducers: {
    setCoverageDay: (state,action) => {
      state.coverageDay = action.payload;
    },
    resetCoverageDay: (state,action) => {
      state.coverageDay = initialState.coverageDay
    },
    setNewCoverageDate: (state,action) => {
      state.newCoverageDate = action.payload;
    },
    resetNewCoverageDate: (state,action) => {
      state.newCoverageDate = initialState.newCoverageDay
    },
    setDateSelected:(state,action) => {
      state.dateSelected = action.payload;
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
  setCoverageDay,
  resetCoverageDay,
  setNewCoverageDate,
  resetNewCoverageDate,
  setDateSelected,
  setAllAbsentUsers,
  resetAllAbsentUsers,
  setCoveredClasses,
  setAllCoverages
} = coverageSlice.actions;

export default coverageSlice.reducer;