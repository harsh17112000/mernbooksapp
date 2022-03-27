import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const history = useNavigate();
    return (
        <>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h2>404 Error Page not Found</h2>
                <Button onClick={() => history("/")} style={{ width: "400px" }} variant="contained">Go to Login page</Button>
            </div>

        </>
    )
}

export default Error