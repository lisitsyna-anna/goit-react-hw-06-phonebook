import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import { Container } from 'components/Container';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

import { PageTitle, SectionTitle, Text } from './App.styled';

import { HiSearch } from 'react-icons/hi';

const CONTACTS_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useLocalStorage(CONTACTS_KEY, [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addNewContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isNumberAdded = contacts.some(contact => contact.number === number);

    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return false;
    } else if (isNumberAdded) {
      Notify.failure(`${number} is alredy in contacts`);
      return false;
    }

    setContacts(prevContacts => [newContact, ...prevContacts]);

    return true;
  };

  const deleteContact = idItem => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idItem)
    );
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <Container as="main">
      <Container
        as="div"
        maxWidth={1250}
        pl={15}
        pr={15}
        ml={'auto'}
        mr={'auto'}
      >
        <Container
          as="div"
          width={700}
          ml={'auto'}
          mr={'auto'}
          backgroundColor={'white'}
          p={40}
        >
          <PageTitle>Phonebook</PageTitle>

          <Container as="section" pt={30} pb={30}>
            <ContactForm onSubmit={addNewContact} />
          </Container>

          <Container as="section" pt={30} pb={30}>
            <SectionTitle>Contacts</SectionTitle>
            {contacts.length > 1 && (
              <Filter
                value={filter}
                onChange={e => setFilter(e.target.value)}
                icon={HiSearch}
              />
            )}

            {contacts.length > 0 ? (
              <ContactList
                contacts={getVisibleContacts()}
                onDeleteContact={deleteContact}
              />
            ) : (
              <Text>Your phonebook is empty. Please add contact.</Text>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
