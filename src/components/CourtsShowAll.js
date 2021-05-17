import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import getAllCourtsAction from '../redux/actions/courts/getAll';
import CourtsCourt from './CourtsCourt';

function CourtsShowAll({ allCourts, getAllCourts, headers }) {
  useEffect(() => {
    getAllCourts(headers);
  }, []);

  if (allCourts.length < 1) {
    return (
      <div> Fetching Stocks ...</div>
    );
  }
  return (
    <table className="courts-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Description</th>
          <th>Administrator Id</th>
        </tr>
      </thead>
      <tbody>
        {allCourts.map(court => (
          <CourtsCourt
            key={court.id}
            court={court}
          />
        ))}
      </tbody>
    </table>
  );
}

CourtsShowAll.propTypes = {
  allCourts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllCourts: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  allCourts: state.allCourts,
  headers: state.headers,
});

const mapDispatchToProps = dispatch => ({
  getAllCourts: headers => getAllCourtsAction(dispatch, headers),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourtsShowAll);
