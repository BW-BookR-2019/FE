import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'


const Register = ({touched, errors}) => {
	// STYLING

	// BUILDING FORM
	
	const [user, setUser] = useState({name: '', email: '', password: ''});
	const handleChanges = e => {
		setUser({...user, [e.target.name]:e.target.value})
	}

  return(
		<>
			<div>Hello Register page!</div>
			<div className='register-form'>
				{/* IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
				<Form>
					<label className='textContainer'>
						Name 
						<TextField
						type='text'
						name='name'
						// ADDED OUTLINE VARIANT FROM MATERIAL UI
						variant="outlined"
						// MADE INPUT FIELD DENSE USING MATERIAL UI
						margin='dense'
						// onChange={handleChanges}
						/>
						{touched.name && errors.name &&
							<p className='error'>{errors.name}</p>
						}

						Email
						<TextField
						type='text'
						name='email'
						variant="outlined"
						margin='dense'
						// onChange={handleChanges}
						/>
						{touched.email && errors.email &&
							<p className='error'>{errors.email}</p>
						}

						Password
						<TextField
						type='password'
						name='password'
						variant="outlined"
						margin='dense'
						// onChange={handleChanges}
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