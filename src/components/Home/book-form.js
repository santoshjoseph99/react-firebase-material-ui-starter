import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core'
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default (props) => {
  const {
    values: { title, author },
    errors,
    touched,
    handleChange,
    // handleBlur,
    // isValid,
    // setFieldTouched,
    isSubmitting,
  } = props;

  return (
    <Form>
      <FormControl>
        <InputLabel htmlFor="author">Author</InputLabel>
        <Input error={errors.author || touched.author ? true : false}
          id="author" aria-describedby="author-text" value={author} onChange={handleChange} />
        <FormHelperText id="author-text">Required</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input error={errors.title || touched.title ? true : false}
          id="title" aria-describedby="title-text" value={title} onChange={handleChange} />
        <FormHelperText id="title-text">Required</FormHelperText>
      </FormControl>
      <Button type="submit" color='primary' variant='contained' disabled={isSubmitting}>
        Add Book
      </Button>
    </Form>
  );
}
