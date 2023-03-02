import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, removeContact } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/filterSlice';
import styles from "./ContactList.module.css";

export default function ContactList() {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        }
        
        return contacts.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const contactsToRender = getFilteredContacts()

    return (
        <ul className={styles.list}>
            {contactsToRender.map(item =>
            <li className={styles.item} key={item.id}>
                <p>{item.name}: {item.number}</p>
                <button type='button' className={styles.button} onClick={() => dispatch(removeContact(item.id))}>delete</button>
            </li>)
        }
        </ul>
    );
}