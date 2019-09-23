import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Register = ({touched, errors}) => {
	// STYLING
	const useStyles = makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			border: '2px solid black',
			borderRadius: '1%',
			margin: '8% auto',
			width: '30%',
			padding: '3% 1% 1% 1%'
		},
		subcontainer: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			textAlign: 'left',
			width: '60%',
			margin: '1% auto',
		},
		items: {
			// border: '2px solid green',
			
		},
		items2: {
			margin: '3%'
		}
	}))
	// BUILDING FORM
	const classes = useStyles();
	const [user, setUser] = useState({name: '', email: '', password: ''});
	const handleChanges = e => {
		setUser({...user, [e.target.name]:e.target.value})
	}

	const handleSubmit = e => [
		e.preventDefault,
		setUser({...user, name:'', email:'', password:''})
	]

  return(
		<>
			<div className='register-form'>
				{/* IMPORT FORM AND FIELD FROM FORMIK AND CREATE FORM WITH 1 FIELD AS A TEST */}
				<Form onSubmit= {handleSubmit} className={classes.container}>
					<label className='name-container' className={classes.subcontainer}>
						name 
						<TextField
						type='text'
						name='name'
						// ADDED OUTLINE VARIANT FROM MATERIAL UI
						variant="outlined"
						// MADE INPUT FIELD DENSE USING MATERIAL UI
						margin='dense'
						onChange={handleChanges}
						helperText={(touched.name && errors.name) && errors.name}
						/>
						{/* {touched.name && errors.name &&
							<p className='error'>{errors.name}</p>
						} */}
					</label>

					<label className='email-container' className={classes.subcontainer}>
						email
						<TextField
						type='text'
						name='email'
						variant="outlined"
						margin='dense'
						onChange={handleChanges}
						helperText={(touched.email && errors.email) && errors.email}
						/>
						{/* {touched.email && errors.email &&
							<p className='error'>{errors.email}</p>
						} */}
					</label>

					<label className='password-container' className={classes.subcontainer}>
						password
						<TextField
						type='password'
						name='password'
						variant="outlined"
						margin='dense'
						onChange={handleChanges}
						// helperText={(touched.password && errors.password) && errors.password}
						helperText={touched.password ? errors.password : ''}
						error={Boolean(errors.password)}
						/>
						{/* {touched.password && errors.password &&
							<p className='error'>{errors.password}</p>
						} */}
					</label>
					<label className='submit-button' className={classes.items2}>
						<Button variant='outlined' size='medium' type='submit'>register</Button>
					</label>
					
					<p className={classes.items2} to='/login'>
						already have an account?<br></br><Link className={classes} to='/login'> click to login</Link>
					</p>
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
		name: Yup.string().required('name is required'),
		email: Yup.string()
			.email('email is invalid')
			.required('email is required'),
		password: Yup.string()
			.min(6, 'password must be at least 6 characters long')
			.required('password is required')
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