import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
    'phonebook/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/contacts');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const addContact = createAsyncThunk(
    'phonebook/addContact',
    async (contact, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/contacts', contact);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const deleteContact = createAsyncThunk(
    'phonebook/deleteContact',
    async (contactId, { rejectWithValue }) => {
        try {
            const { status } = await axios.delete(`/contacts/${contactId}`);
            if (status === 200) {
                return contactId;
            } else {
                throw new Error({ message: 'error' });
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
