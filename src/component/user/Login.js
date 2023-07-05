import { Button, Container, Grid, TextField } from '@mui/material';
import { async } from 'q';
import React from 'react'
import { useNavigate } from 'react-router';

const Login = () => {

    // const redirection = useNavigate();

    const fetchLogin = async() => {

        const $id = document.getElementById('id');
        const $pw = document.getElementById('pw');

        console.log($id.value);

        const res = await fetch('http://localhost:8181/api/auth/signin', {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                id: $id.ariaValueMax,
                password: $pw.value
            })
        });

        if(res.status === 400) {
            const text = await res.text();
            alert(text);
            return;
        }

        const { token, userName } = await res.json();
        console.log(res.json);

        // OnLogin(token, id);
        // redirection('/');

    }

    const loginHandler = e => {
        e.preventDefault();

        fetchLogin();
    }

  return (
    <>
    <Container>
        <span>Login Page</span>
        <form noValidate onSubmit={loginHandler}>
            <Grid item xs={8}>
                <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="id"
                    name="id"
                    autoComplete="id"
                />
            </Grid>
            <Grid item xs={8}>
                <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    id="pw"
                    name="pw"
                    autoComplete="current-password"
                />
            </Grid>
            <Grid item xs={8}>
                <Button 
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                > 로그인
                </Button>
            </Grid>
            <Grid item xs={8}>
                <Button href='/join'
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                > 회원가입
                </Button>
            </Grid>
        </form>
    </Container>
    </>
  );
};

export default Login;