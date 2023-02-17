import Header from "../components/frontend/common/header";
import Footer from "../components/frontend/common/footer";
import { useContext, useEffect, useState } from "react";
import { fetchProfile } from "../helpers/backend_helper";
import { useRouter } from "next/router";
import UserContext, { useUserContext } from "../contexts/user";

const HomeLayout = ({ children }) => {
    const { pathname, push } = useRouter();
    const { isLoggedIn } = useUserContext();

    useEffect(() => {
        fetchProfile().then(({ error, data }) => {
            if (error === false) {
                console.log("user from home: ", data)
            } else {
                if (['/profile'].includes(pathname)) {
                    push('/')
                }
            }
        })

    }, [isLoggedIn])

    return (
        <div className="font-Poppins">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout
