import PropTypes from 'prop-types';
import { HiPhone } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/constactsSlice';

import { Button } from 'components/ContactForm/ContactForm.styled';
import { StyledText } from './ContactItem.styled';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <>
      <StyledText>
        <HiPhone size={16} />
        <b>{name}:</b> {number}
      </StyledText>
      <Button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </Button>
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
