import React from "react";
export default function NotFound() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>404 Page Not Found</h1>
                <p>We're sorry, but the page you requested could not be found.</p>
            </div>
        </div>
    );
}