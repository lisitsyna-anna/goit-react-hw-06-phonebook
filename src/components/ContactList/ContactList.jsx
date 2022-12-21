import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

import { ContactItem } from 'components/ContactItem';
import { List, Item, FailureText } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getVisibleContacts = () => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      {visibleContacts.length === 0 && (
        <FailureText>There is no such contact</FailureText>
      )}
      <List>
        {visibleContacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              <ContactItem id={id} name={name} number={number} />
            </Item>
          );
        })}
      </List>
    </>
  );
};
