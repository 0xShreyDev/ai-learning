"use client"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx"
import { selectedChapterIndexContext } from "../context/SelectedChapterIndexContext.jsx"



function Provider({ children }) {

    const { user } = useUser();

    const [UserDetail, setUserDetail] = useState();

    const [selectedChapterIndex,setSelectedChapterIndex]=useState(0);

    useEffect(
        () => {
            user && CreateNewUser();
        }, [user]
    )

    const CreateNewUser = async () => {
        const result = await
            axios.post('/api/user', {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress
            });
        setUserDetail(result.data);

    }
    return (
        <UserContext.Provider value={{ UserDetail, setUserDetail }}>
            <selectedChapterIndexContext.Provider value={{selectedChapterIndex,setSelectedChapterIndex}}>
                <div>{children}</div>
            </selectedChapterIndexContext.Provider>
        </UserContext.Provider>

    )
}

export default Provider