/* eslint-disable camelcase */
import PropTypes from 'prop-types';

function Court({ court }) {
  const {
    name,
    address,
    description,
    administrator_id,
  } = court;
  return (
    <tr>
      <td>{name}</td>
      <td>{address}</td>
      <td>{description}</td>
      <td>{administrator_id}</td>
    </tr>
  );
}

Court.propTypes = {
  court: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string,
    administrator_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Court;
