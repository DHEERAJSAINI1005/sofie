import React, {useState} from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Landing } from '@/Layouts/Landing';
import Constants from '../Constants';
import './style.scss';
import Joi from 'joi';

const loginSchema = Constants.loginSchema

const CenteredPaper = styled(Paper)({
  padding: '40px',
  borderRadius: "12px",
});

const BackgroundImageContainer = styled('div')({
  backgroundImage: 'url(./images/image7.png)',
  backgroundSize: 'cover',
  height: '896px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundPosition: 'right top !important'
});

function Login() {
  const { data, setData, post, processing } = useForm(Constants.initLoginForm);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (key, value) => {
    const updatedData = {
      ...data,
      [key]: value,
    };

    const fieldSchema = loginSchema.extract(key);
    const { error } = fieldSchema.validate(value);

    if (error) {
      setValidationErrors({
        ...validationErrors,
        [key]: error.message,
      });
    } else {
      const { [key]: removedError, ...rest } = validationErrors;
      setValidationErrors(rest);
    }
    setData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error, value } = loginSchema.validate(data, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach(detail => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setValidationErrors(validationErrors);
    } else {
      console.log('data', value)
      post(route('login'));
    }
  };

  return (
    <Landing>
        <Typography sx={{ height: '120px' }}></Typography>
        <BackgroundImageContainer sx={{ paddingToo: '65px' }}>
         <div style={{ position: 'relative', minHeight: '100vh' }} className='login_page'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)', paddingTop: '100px', paddingBottom: '100px' }}>
            <CenteredPaper elevation={4} sx={{ margin: '60px', width: '650px !important'}}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                      <Grid item xs={12}>
                          <Typography fontWeight={700} fontSize="28px" textAlign="center">Log In</Typography>
                      </Grid>
                      <Grid item xs={12} className='login_input_fields'>
                          <Typography>Email</Typography>
                          <TextField
                            size='small'
                            sx={{ mt: 1, width: '100%' }}
                            fullWidth
                            variant='outlined'
                            placeholder='Email Address'
                            onChange={(e) => handleChange("email", e.target.value)}
                            error={!!validationErrors.email}
                            helperText={validationErrors.email}
                          />
                      </Grid>
                      <Grid item xs={12} className='login_input_fields'>
                          <Typography>Password</Typography>
                          <TextField
                            size='small'
                            sx={{ mt: 1, width: '100%' }}
                            fullWidth
                            variant='outlined'
                            type='password'
                            placeholder='Password'
                            onChange={(e) => handleChange("password", e.target.value)}
                            error={!!validationErrors.password}
                            helperText={validationErrors.password}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Typography>Forgot Password</Typography>
                      </Grid>
                      <Grid item xs={12} className='submit_btn'>
                          <Button variant="contained" fullWidth type="submit" disabled={processing}>Log In</Button>
                          <Typography textAlign="center" mt={4}>Need an account? <Link href={route('landing.signup')}>Sign up here.</Link> </Typography>
                      </Grid>
                    </Grid>
                </form>
            </CenteredPaper>
          </div>
          </div>
        </BackgroundImageContainer>
    </Landing>
  );
}

export default Login;
