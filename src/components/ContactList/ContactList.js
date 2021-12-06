import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterContacts } from 'redux/phoneBook/phonebook-selector';
import { deleteContact } from 'redux/phoneBook/phonebook-operations';
import s from './ContactList.module.css';

export default function ContactList() {
    const contacts = useSelector(getFilterContacts);
    const dispatch = useDispatch();

    return (
        <>
            <h2 className={s.title}>Contacts</h2>
            <ul className={s.list}>
                {contacts.map(({ id, name, number }) => (
                    <li key={id}>
                        <span className={s.text}>{`${name}: ${number}`}</span>
                        <button
                            className={s.buttonDelete}
                            type="button"
                            onClick={() => {
                                dispatch(deleteContact(id));
                                toast.success(
                                    `Contact ${name} ${number} deleted!`,
                                    {
                                        position: 'top-center',
                                        autoClose: 2500,
                                    },
                                );
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
