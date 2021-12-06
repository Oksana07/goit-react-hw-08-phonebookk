import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/phoneBook/phonebook-selector';
import { changeFilter } from 'redux/phoneBook/phonebook-slice';
import s from './Filter.module.css';

export default function Filter() {
    const filter = useSelector(getFilter);
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const onChangeInput = e => {
        dispatch(changeFilter(e.currentTarget.value));
    };
    return (
        <>
            <h2 className={s.title}>Contacts: {contacts.length} </h2>
            <label className={s.label}>
                <input
                    placeholder="Search"
                    className={s.formInput}
                    type="text"
                    value={filter}
                    onChange={onChangeInput}
                />
            </label>
        </>
    );
}
