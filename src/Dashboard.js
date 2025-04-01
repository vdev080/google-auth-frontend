import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Avatar, Button } from "@mui/material";

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLogout();
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
            <Card sx={{ p: 3, textAlign: "center" }}>
                <Avatar src={user.profileImage} alt={user.firstName} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <CardContent>
                    <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                </CardContent>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Card>
        </Container>
    );
};

export default Dashboard;
