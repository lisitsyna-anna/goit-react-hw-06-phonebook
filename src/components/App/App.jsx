import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';

import { Container } from 'components/Container';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { PageTitle, SectionTitle, Text } from './App.styled';

export function App() {
  const contacts = useSelector(getContacts);
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
            <ContactForm />
          </Container>

          <Container as="section" pt={30} pb={30}>
            <SectionTitle>Contacts</SectionTitle>
            {contacts.length >= 1 && <Filter />}

            {contacts.length > 0 ? (
              <ContactList />
            ) : (
              <Text>Your phonebook is empty. Please add contact.</Text>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
