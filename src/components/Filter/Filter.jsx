import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';
import { Container } from 'components/Container';
import { Label, Input } from './Filter.styled';

export const Filter = ({ value, onChange, icon: Icon = null }) => {
  const filterId = nanoid();
  return (
    <Container
      as="div"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Label htmlFor={filterId}>
        {Icon && <Icon size={16} />}
        Find contacts by name
      </Label>
      <Input type="text" value={value} onChange={onChange} id={filterId} />
    </Container>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
