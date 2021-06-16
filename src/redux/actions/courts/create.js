import postCourtService from '../../services/courts/post';

const createCourtAction = async (dispatch, headers, court) => {
  // console.log('Create Court Action');
  // console.log('Court', court);
  // console.log('Headers', headers);
  const error = await postCourtService(headers, court);
  // console.log('Error in createCourtAction', error);
  return error;
  /*
    if posting returns an error, it displays it in the create
    screen form as an error message. So it has to dispatch an
    action to the state in case of an error
    if (error){
      dispatch(errorAction)
    }
  */
};

export default createCourtAction;
