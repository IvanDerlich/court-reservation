const getOneCourtAction = (state, courtId) => state
  .allCourts
  .find(court => court.id === Number(courtId));

export default getOneCourtAction;
