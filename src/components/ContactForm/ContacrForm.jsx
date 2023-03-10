import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewContact } from 'redux/constactsSlice';
import { getContacts } from 'redux/selectors';

import { Notify } from 'notiflix';
import { Form, Label, Input, Button } from './ContactForm.styled';

export function ContactForm() {
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
        throw new Error("There isn't such option");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAdded = contacts.some(contact => contact.number === number);

    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return;
    } else if (isNumberAdded) {
      Notify.failure(`${number} is alredy in contacts`);
      return;
    }
    dispatch(addNewContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Ivanov Ivan"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          maxLength={20}
          onChange={handleChange}
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          placeholder="111-11-111"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          maxLength={20}
          onChange={handleChange}
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}
