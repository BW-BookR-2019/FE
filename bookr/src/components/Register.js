import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions';
import * as Yup from 'yup';
// WAS HAVING ISSUES WITH GETTING YUP TO WORK WITH MATERIAL UI SINCE YOU CHANGE FORMIK'S 'FIELD' TO MATERIAL UI'S 'TEXTFIELD'
	// FOUND A GITHUB REPO THAT HELPS WITH USING FORMIK AND MATERIAL UI TOGETHER: https://github.com/stackworx/formik-material-ui
import { TextField } from 'formik-material-ui';
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

  return(
		<>
			<div className='register-form'>
				<Form className={classes.container}>
					<label className='name-container' className={classes.subcontainer}>
						name 
						<Field
						type='text'
						name='name'
						component={TextField}
						// ADDED OUTLINE VARIANT FROM MATERIAL UI
						variant="outlined"
						// MADE INPUT FIELD DENSE USING MATERIAL UI
						margin='dense'
						helperText={(touched.name && errors.name) && errors.name}
						/>
					</label>

					<label className='email-container' className={classes.subcontainer}>
						email
						<Field
						type='text'
						name='email'
						component={TextField}
						variant="outlined"
						margin='dense'
						helperText={(touched.email && errors.email) && errors.email}
						/>
						
					</label>

					<label className='password-container' className={classes.subcontainer}>
						password
						<Field
						type='password'
						name='password'
						component={TextField}
						variant="outlined"
						margin='dense'
						helperText={(touched.password && errors.password) && errors.password}
						/>
		
					</label>
					<label className='submit-button' className={classes.items2}>
						<Button variant='outlined' size='medium' type='submit'>register</Button>
					</label>
					
					<p className={classes.items2}>
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
	handleSubmit(values, { props }){
		// axios
		// .post('https://reqres.in/api/users/', values)
		// .then(response => {
		// 	setStatus(response.data);
		// })
		// .catch(error => console.log('Error in axios', error.response))
		props.register(values, props.history);
	}
})(Register);

export default connect(null, { register })(FormikRegister);
