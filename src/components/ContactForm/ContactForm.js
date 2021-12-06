import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from 'redux/phoneBook/phonebook-operations';
import { getContacts } from 'redux/phoneBook/phonebook-selector';
import s from './ContactForm.module.css';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (
            contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase(),
            )
        ) {
            toast.warning(`${name} is already in contacts!`, {
                position: 'top-center',
                autoClose: 2500,
            });
        } else if (contacts.find(contact => contact.number === number)) {
            toast.warning(`${number} is already in contacts!`, {
                position: 'top-center',
                autoClose: 2500,
            });
        } else if (!name.trim() || !number.trim()) {
            toast.warning(`Enter the contact's name and number phone!`, {
                position: 'top-center',
                autoClose: 2500,
            });
        } else {
            dispatch(addContact({ name, number }));
            toast.success('Contact added to the phonebook!', {
                position: 'top-center',
                autoClose: 2500,
            });
            setName('');
            setNumber('');
        }
    };

    return (
        <>
            <h1 className={s.title}>Phonebook</h1>
            <div className={s.contactForm}>
                <form type="submit" onSubmit={handleSubmit}>
                    <label className={s.label}>
                        Name
                        <input
                            placeholder="Contact name"
                            className={s.formInput}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                            required
                            onChange={handleChange}
                            value={name}
                        />
                    </label>
                    <label className={s.label}>
                        Number
                        <input
                            className={s.formInput}
                            type="tel"
                            placeholder="Contact number"
                            name="number"
                            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                            required
                            onChange={handleChange}
                            value={number}
                        />
                    </label>

                    <button type="submit" disabled={!name || !number}>
                        Add contact
                    </button>
                </form>
            </div>
        </>
    );
}
