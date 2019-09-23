import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const Register = ({touched, errors}) => {
	// STYLING
	const useStyles = makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			border: '2px solid red',
		},
		subcontainer: {
			display: 'flex',
			justifyContent: 'center',
			border: '2px solid green',
			flexDirection: 'column',
			width: '35%',
			textAlign: 'left',
			margin: '0 auto'
		}
	}))
	// BUILDING FORM
	const classes = useStyles();

	const [user, setUser] = useState({name: '', email: '', password: ''});
	const handleChanges = e => {
		setUser({...user, [e.target.name]:e.target.value})
	}

  return(
		<>
			<div>Hello Register page!</div>
			<div className='register-form'>
				{/* IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
				<Form className={classes.container}>
						<label className='name-container' className={classes.subcontainer}>
							name 
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
						</label>

						<label className='email-container' className={classes.subcontainer}>
							email
							<TextField
							tye='text'
							name='email'
							variant="outlined"
							margin='dense'
							// onChange={handleChanges}
							/>
							{touched.email && errors.email &&
								<p className='error'>{errors.email}</p>
							}
						</label>

						<label className='password-container' className={classes.subcontainer}>
							password
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
						<Button variant='outlined' size='medium' type='submit'>register</Button>
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