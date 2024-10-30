import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "completed" | "active";

export type Filters = {
  checked: FilterValuesType;
};

const initialState: Filters = {
  checked: "all",
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		changeState:(state, action: PayloadAction<FilterValuesType>) => {
			state.checked = action.payload
		}
	}
});

export const {changeState} = filterSlice.actions

export default filterSlice.reducer