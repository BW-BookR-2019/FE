import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'


const Register = ({touched, errors}) => {

  return(
		<>
			<div>Hello Login page!</div>
			<div className='register-form'>
				{/* IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
				<Form>
					<label className='textContainer'>
						Email
						<Field
						type='text'
						name='email'
						placeholder='Email'
						/>
						{touched.email && errors.email &&
							<p className='error'>{errors.email}</p>
						}

						Password
						<Field
						type='password'
						name='password'
						placeholder='Password'
						/>
						{touched.password && errors.password &&
							<p className='error'>{errors.password}</p>
						}

					</label>
					<label className='submit-button'>
						<button type='submit'>login</button>
					</label>
					<Link to='/register'>don't have an account? click to register</Link>
				</Form>
			</div>
		</>
	)
}

const FormikRegister = withFormik({
	mapPropsToValues({email, password}
	) {
			return {
				email: email || '',
				password: password || ''
			}
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
	}),
	handleSubmit(values, { setStatus }){
		axios
		.post('https://reqres.in/api/users/', values)
		.then(response => {
			setStatus(response.data);
		})
		.catch(error => console.log('Error in axios', error.response))
	}
})(Register);

export default FormikRegister;