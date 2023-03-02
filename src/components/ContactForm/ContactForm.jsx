import { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact, getContacts } from '../../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import styles from "./ContactForm.module.css";

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (event) => {
    const { name, value } = event.target;

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

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    const addContactToList = (name, number) => {
        if (
        contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase(),
        )
        ) {
        Notiflix.Notify.failure(`${name} is already in contacts.`);
        } else if (contacts.find(contact => contact.number === number)) {
        Notiflix.Notify.failure(`${number} is already in contacts.`);
        } else if (name.trim() === '' || number.trim() === '') {
        Notiflix.Notify.info("Enter the contact's name and number phone!");
        } else {
        dispatch(addContact({name, number}))
    }
    }


    const handleSubmit = (event) => {
    event.preventDefault();

    addContactToList(name, number);

    setName('')
    setNumber('')
    };

    const nameId = nanoid();
    const numberId = nanoid();

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor={nameId}>
                Name
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Input name"
                />
            </label>
            <label className={styles.label} htmlFor={numberId}>
                Number
                <input
                    className={styles.input}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    placeholder="Input number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={styles.button} type="submit">
                Add contact
            </button>
        </form>
    );

}
