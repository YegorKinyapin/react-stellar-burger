import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    hasModal: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.hasModal = !state.hasModal;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
