import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { useForm } from '@inertiajs/react'
import { Landing } from '@/Layouts/Landing';
import { Avatar, FormControl, MenuItem,Button, Radio, RadioGroup, Select, TextField, Typography, FormControlLabel } from '@mui/material';
import "./style.scss"
import Constants from '../Constants';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const HeadingBox = styled('div')(() => ({
  border: '1px solid black',
  padding : "20px",
  borderRadius: '8px',
}));

const DetailBox = styled('div')(() => ({
    border: '1px solid #7C7C7C',
    padding : "20px",
    borderRadius: '4px',
}));

const profileSchema = Constants.profileSchema

function Profile() {
    const { data, setData, post, processing} = useForm(Constants.initProfileForm);
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (key, value) => {
        const updatedData = {
        ...data,
        [key]: value,
        };

        const fieldSchema = profileSchema.extract(key);
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
        const { error, value } = profileSchema.validate(data, { abortEarly: false });

        if (error) {
        const validationErrors = {};
        error.details.forEach(detail => {
            validationErrors[detail.path[0]] = detail.message;
        });
        setValidationErrors(validationErrors);
        } else {
            Inertia.post(route('mentor.user.store'), value, {
                onError: (errors) => {
                    setValidationErrors(errors);
                },
            });
        }
    };

  return (
    <Landing>
        <Box py={2} className="profile_page">
            <Typography sx={{ height: '65px' }}></Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item="true" xs={12} px={8}>
                        <HeadingBox>
                            <Typography fontWeight={700} fontSize="28px" textAlign="left" color={'#223049'}>Mentor Detail</Typography>
                            <Typography fontWeight={400} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Tell us about Mentor you need</Typography>
                        </HeadingBox>
                    </Grid>
                    <Grid item="true" xs={12} px={8}>
                        <DetailBox>
                            <Grid container gap={5} alignItems={"center"}>
                                <Avatar 
                                    xs={3}
                                    alt="Remy Sharp"
                                    src="../Assets/Images/header-right.png"
                                    sx={{ width: {lg:'160px',md:"152px", xs:"152px", sm:"152px"},height: {lg:'160px',md:"152px", xs:"152px", sm:"152px"}  }}
                                />
                                <Grid item="true" xs={9} textAlign={"left"}>
                                    <Typography fontWeight={600} fontSize="18px">Upload Profile Photo</Typography>
                                    <Typography fontWeight={400} fontSize="16px" color={'#7C7C7C'} py={1} pt={2}>Please upload your company's logo photo that meets the following criteria:</Typography>
                                    <Typography py={1} color={'#7C7C7C'}>
                                        1. Clear/White Background: Ensure the background of the logo is clean and white or unobtrusive.
                                    </Typography>
                                    <Typography py={1} color={'#7C7C7C'}>
                                        2. Image Format: Use common image formats such as JPEG, PNG, or SVG.
                                    </Typography>
                                    <Typography py={1} color={'#7C7C7C'}>
                                        3. High Resolution: Ensure the image is high resolution so that the logo appears clear and professional.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DetailBox>
                    </Grid>
                    <Grid container spacing={4} px={8} >
                        <Grid item="true" xs={12} md={6} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Contact Name</Typography>
                            <TextField
                                size='small'
                                sx={{  mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                placeholder='Please Fill your contact Name'
                                onChange={(e) => handleChange("name", e.target.value)}
                                error={!!validationErrors.name}
                                helperText={validationErrors.name}            
                            />
                        </Grid>
                        <Grid item="true" md={6} xs={12} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Mobile Number</Typography>
                            <TextField
                                size='small'
                                sx={{ mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                type='text'  
                                value={data.mobile_number || ''}  
                                placeholder='Please fill your company mobile number'
                                onChange={(e) => handleChange("mobile_number", e.target.value.replace(/\D/, '').slice(0, 10))}
                            />
                        </Grid>
                        <Grid item="true" md={6} xs={12} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Email Contact</Typography>
                            <TextField
                                size='small'
                                sx={{ mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                type='email'  
                                placeholder='Email Contact'
                                onChange={(e) => handleChange("email_contact", e.target.value)}
                                error={!!validationErrors.email_contact}
                                helperText={validationErrors.email_contact}
                            />
                        </Grid>
                        <Grid item="true" md={6} xs={12} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>User Name</Typography>
                            <TextField
                                size='small'
                                sx={{ mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                type='text'  
                                placeholder='User Name'
                                onChange={(e) => handleChange("user_name", e.target.value)}
                                error={!!validationErrors.user_name}
                                helperText={validationErrors.user_name}
                            />
                        </Grid>
                        <Grid item="true" md={6} xs={12} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Password</Typography>
                            <TextField
                                size='small'
                                sx={{ mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                type='text'  
                                placeholder='Password'
                                onChange={(e) => handleChange("password", e.target.value)}
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                            />
                        </Grid>
                        <Grid item="true" md={6} xs={12} className='profile_input_fields'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Confirm Password</Typography>
                            <TextField
                                size='small'
                                sx={{ mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                type='text'  
                                placeholder='Confirm Password'
                                onChange={(e) => handleChange("confirm_password", e.target.value)}
                                error={!!validationErrors.confirm_password}
                                helperText={validationErrors.confirm_password}
                            />
                        </Grid>

                        <Grid item="true" xs={12}>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Have you mentored companies before?</Typography>
                            <FormControl sx={{marginLeft : '10px'}}>
                                <RadioGroup
                                    row
                                    value={data.mentored_compnay}
                                    onChange={(e) => handleChange("mentored_compnay", e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item="true" xs={12} className="profile_message_field">
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Qualifications</Typography>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Eg. previous mentoring experiences, completed courses on how to be a mentor, conducted workshops for XXX company, etc </Typography>
                            <TextField
                                size='small'
                                sx={{  mt:1, width: '100%' }}
                                fullWidth
                                multiline
                                rows={4}
                                variant='outlined'
                                placeholder='Please Fill your Qualifications'
                                onChange={(e) => handleChange("qualifications", e.target.value)}
                            />
                        </Grid>
                        <Grid item="true" xs={12} className="profile_message_field">
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Please choose which industry sectors you would like to mentor in</Typography>
                            <TextField
                                size='small'
                                sx={{  mt:1, width: '100%' }}
                                fullWidth
                                multiline
                                rows={4}
                                variant='outlined'
                                placeholder='Please Fill your Qualifications'
                                onChange={(e) => handleChange("industry_sector", e.target.value)}
                            />
                        </Grid>
                        <Grid item="true" xs={12} md={6} className='profile_select_box'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>What Functional</Typography>
                            <Select
                                size='small'
                                sx={{  mt: 1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                defaultValue={""}
                                placeholder='Please select your company  Functional Area '
                                onChange={(e) => handleChange("functional", e.target.value)}
                            >
                                <MenuItem value="ten">Marketing</MenuItem>
                                <MenuItem value="twenty">Finance</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item="true" xs={12} md={6} className='profile_select_box'>
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>How did your hear about us?</Typography>
                            <Select
                                size='small'
                                sx={{  mt: 1, width: '100%' }}
                                fullWidth
                                defaultValue={""}
                                variant='outlined'
                                placeholder='Please select your company  Functional Area '
                                onChange={(e) => handleChange("hear_about_us", e.target.value)}
                            >
                                <MenuItem value="ten">Ten</MenuItem>
                                <MenuItem value="twenty">Twenty</MenuItem>
                                <MenuItem value="thirty">Thirty</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item="true" xs={12} className="profile_input_fields">
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>How Many Companies are the mentors willing to mentor ?</Typography>
                            <TextField
                                size='small'
                                sx={{  mt:1, width: '100%' }}
                                fullWidth
                                variant='outlined'
                                placeholder='No. of Companies'
                                onChange={(e) => handleChange("number_of_companies", e.target.value)}
                            />
                        </Grid>
                        <Grid item="true" xs={12} className="profile_message_field">
                            <Typography fontWeight={600} fontSize="16px" textAlign="left" color={'#7C7C7C'}>Additional Information about You?Your skills</Typography>
                            <TextField
                                size='small'
                                sx={{  mt:1, width: '100%' }}
                                fullWidth
                                multiline
                                rows={4}
                                variant='outlined'
                                placeholder='Please Fill your Additional Information'
                                onChange={(e) => handleChange("additional_information", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item="true" xs={12} mb={4} textAlign={"center"} className='submit_btn'>
                        <Button type='submit' variant="contained" disabled={processing} > Update</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </Landing>
  );
}

export default Profile;
