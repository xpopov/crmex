export default (schema, values) => {
  return new Promise((resolve, reject) => {
    console.log('Validation started', values);
    //Validate our form values against our schema
    schema.validate(values, {abortEarly: false})
      .then(() => {
        resolve();
      })
      .catch(errors => {
        //Yup errors > redux-form errors
        let rErrors = {};
        errors.inner.forEach(error => {
          rErrors[error.path] = error.message;
        })
        reject(rErrors);
      })
  });
};