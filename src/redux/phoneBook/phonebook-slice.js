import { createSlice } from '@reduxjs/toolkit';
import {
    addContact,
    deleteContact,
    fetchContacts,
} from './phonebook-operations';

const contactsSlice = createSlice({
    name: 'phoneBook',
    initialState: {
        contacts: [],
        isLoading: false,
        filter: '',
    },
    reducers: {
        changeFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: {
        [fetchContacts.fulfilled](state, { payload }) {
            state.contacts = payload;
            state.isLoading = false;
        },
        [fetchContacts.pending](state) {
            state.isLoading = true;
        },
        [fetchContacts.rejected](state) {
            state.isLoading = false;
        },
        //
        //
        [addContact.pending](state) {
            state.isLoading = true;
        },
        [addContact.fulfilled](state, { payload }) {
            state.contacts.push(payload);
            state.isLoading = false;
        },
        [addContact.rejected](state) {
            state.isLoading = false;
        },
        //
        //
        [deleteContact.pending](state) {
            state.isLoading = true;
        },
        [deleteContact.fulfilled](state, { payload }) {
            state.contacts = state.contacts.filter(
                contact => contact.id !== payload,
            );
            state.isLoading = false;
        },
        [deleteContact.rejected](state) {
            state.isLoading = false;
        },
    },
});

export default contactsSlice.reducer;
export const { changeFilter } = contactsSlice.actions;
