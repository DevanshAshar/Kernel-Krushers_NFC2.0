import React from "react"
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout()
{
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Toaster />
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}