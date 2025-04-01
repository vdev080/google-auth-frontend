import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <>
            {token ? (
                <Dashboard
                    user={user}
                    onLogout={() => {
                        setToken(null);
                        setUser(null);
                    }}
                />
            ) : (
                <Login
                    onLogin={(token, user) => {
                        setToken(token);
                        setUser(user);
                    }}
                />
            )}
        </>
    );
}

export default App;
