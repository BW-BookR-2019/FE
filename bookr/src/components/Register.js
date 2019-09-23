import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'


const Register = ({touched, errors}) => {

  return(
		<>
			<div>Hello Register page!</div>
			<div className='register-form'>
				{/* IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
				<Form>
					<label className='textContainer'>
						Name 
						<Field
						type='text'
						name='name'
						placeholder='Name'
						/>
						{touched.name && errors.name &&
							<p className='error'>{errors.name}</p>
						}

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
						<button type='submit'>register</button>
					</label>
					<Link to='/login'>already have an account? click to login</Link>
				</Form>
			</div>
		</>
	)
}

const FormikRegister = withFormik({
	mapPropsToValues({name, email, password}
	) {
			return {
				name: name || '',
				email: email || '',
				password: password || ''
			}
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Name is required'),
		email: Yup.string()
			.email('Email is invalid')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters long')
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