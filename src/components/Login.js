import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const Login = ({touched, errors}) => {
	// STYLING
	const useStyles = makeStyles(theme => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			border: '2px solid #cf4e28',
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
			margin: '3% auto',
			textAlign: 'center'
		},
		link: {
			textDecoration: 'none',
			color: 'white',
			transition: '0.5s',
			'&:hover': {
				color: '#edb901',
				transition: '0.3s'
			}
		},
		btn: {
			textTransform: 'lowercase',
			color: 'white',
			borderColor: 'white',
			backgroundColor: '#edb901',
			'&:hover': {
				backgroundColor: '#cf4e28',
				transition: '0.3s'
			}
		},
		inputOutline: {
			backgroundColor: 'white',
			borderRadius: '0.25rem',
			'&$focusedOutline $notchedOutline' : {
				borderColor: '#cf4e28 !important'
			},
		},
		focusedOutline: {},
		notchedOutline: {
			border: '2px solid #edb901',
		}
	}))

	// BUILDING FORM
	const classes = useStyles();

  return(
		<>
			<div className='register-form'>
				<Form className={classes.container}>
					<label className='email-container' className={classes.subcontainer}>
						email
						<Field
						type='text'
						name='email'
						component={TextField}
						variant="outlined"
						margin='dense'
						helperText={(touched.email && errors.email) && errors.email}
						InputProps={{
							classes: {
								root: classes.inputOutline,
								focused: classes.focusedOutline,
								notchedOutline: classes.notchedOutline
							}
						}}
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
						InputProps={{
							classes: {
								root: classes.inputOutline,
								focused: classes.focusedOutline,
								notchedOutline: classes.notchedOutline
							}
						}}
						/>
					</label>

					<label className='submit-button' className={classes.items}>
						<Button className={classes.btn} variant='outlined' size='medium' type='submit'>login</Button>
					</label>

					<p className={classes.items}>
						don't have an account?<br></br><Link className={classes.link} to='/register'> click to register</Link>
					</p>
				</Form>
			</div>
		</>
	)
}

const FormikLogin = withFormik({
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
	handleSubmit(values, { props }){
		props.login(values, props.history);
	}
})(Login);

export default connect(null, { login })(FormikLogin);