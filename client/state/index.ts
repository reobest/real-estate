import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null]
  squareFeet: [number, number] | [null, null]
  coordinates: [number, number];
}
export interface InitialState {
  isFiltersFullOpen:boolean;
  viewMode:'grid' | 'list';
  filters:FiltersState;
} 
export const initialState : InitialState = {
  filters: {
    location: "Los Angeles",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
  squareFeet:  [null, null],
  coordinates: [-118.25, 34.05],
  },
  isFiltersFullOpen: false,
  viewMode:"grid",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state,action:PayloadAction<Partial<FiltersState>>) => {
      state.filters = {...state.filters,...action.payload}
    },
    toggleFiltesrFullOpen:(state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen
    },
    setViewMode:(state,action:PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    }
  },
});

export const { setFilters, toggleFiltesrFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;
