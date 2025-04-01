import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = ({ onLogin }) => {
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await axios.post("http://localhost:9000/api/google-login", {
                token: credentialResponse.credential,
            });

            // Store user details & token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            onLogin(response.data.token, response.data.user);
        } catch (error) {
            console.error("❌ Google login failed", error);
            alert("Google login failed!");
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h5">Login</Typography>

                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert("Google login failed!")} />

                <Typography sx={{ mt: 2 }}>Or</Typography>

                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login with Email & Password
                </Button>
            </Container>
        </GoogleOAuthProvider>
    );
};

export default Login;
