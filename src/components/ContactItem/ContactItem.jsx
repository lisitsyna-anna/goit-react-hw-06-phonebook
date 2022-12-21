import PropTypes from 'prop-types';
import { HiPhone } from 'react-icons/hi';
import { Button } from 'components/ContactForm/ContactForm.styled';
import { StyledText } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <>
      <StyledText>
        <HiPhone size={16} />
        <b>{name}:</b> {number}
      </StyledText>
      <Button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </Button>
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
