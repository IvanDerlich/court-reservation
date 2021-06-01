/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function Court({
  name,
  address,
  description,
  first_name,
  last_name,
}) {
  console.log(last_name);
  console.log(first_name);
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{address}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{`${first_name} ${last_name}`}</TableCell>
    </TableRow>
  );
}

Court.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};

Court.defaultProps = {
  description: 'No description',
  first_name: '',
  last_name: '',
};

export default Court;
