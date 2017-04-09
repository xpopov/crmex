import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import yupAsyncValidation from 'lib/redux-form/yup_async_validation';

export default (props, initialValues, validationSchema, submitPromise, formComponent) => {
  let fields = Object.keys(validationSchema);
  let _props = {
    validate: values => { return {}},
    asyncValidate: values => yupAsyncValidation(validationSchema, values),
    fields: fields,
    asyncBlurFields: fields,
    onSubmit: values => {
      console.log('Form values', values);
      return new Promise((resolve, reject) => {
        yupAsyncValidation(validationSchema, values).then(() => {
          // call high level method (values) => {}
          submitPromise(values).then(() => {
            resolve();
          }).catch(errors => {
            reject(errors);
          });
        }).catch(errors => {
          reject(new SubmissionError(errors));
        });

        // dispatch(createPostFailure(response.payload));
        // reject({email: 'wrong'});
      });
      // return errors;
    },
    touchOnChange: true,
    destroyOnUnmount: false,
    persistentSubmitErrors : true,
    ...props
  };
  let _reduxForm = reduxForm(
    _props/*,
    state => (
      { initialValues: {
        email: 'abc'
      }}
  )
    dispatch => ({
      onSubmit: data => { console.log(data) }
    })*/
  )(formComponent);

  return connect(
    state => ({ initialValues: initialValues })
  )(_reduxForm);
};