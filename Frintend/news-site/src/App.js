import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Admin from "./utils/Admin";

import PublicDisplay from "./utils/PublicDisplay";
import React, { useContext } from "react";
import {AuthContext} from "./Admin/Context/context";
import Login from "./Admin/auth/Login";
import NotView from "./PublicDisplay/Components/NotLogin/NotView";



function App() {
    const {userId} = useContext(AuthContext)
    return (
        <>
            <Routes>

                <Route path='/*' element={<PublicDisplay/>}></Route>
                <Route path="/administrator" element={<Login/>}/>
                <Route path="*" element={<NotView />} />


                {
                    userId && (
                        <>
                            <Route path='/admin/*' element={<Admin/>}></Route>
                        </>
                    )
                }

            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
