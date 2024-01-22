import React, {useContext} from 'react';
import "./index.css"
import Sidbar from "./component/sitbar/Sitbar";
import Information from "./component/information/information";

const Dashboard = ({children}) => {
    // Dashboard valed bage component ha ke estefade mishavad
    return (
        <div className="dashboard-wrapper">
            <Sidbar />
            <div className="main-info">
                <Information />
                <div className="main">
                    {children}
                </div>
            </div>
        </div>
    );
};
// barae lae bandi children dadim

export default Dashboard;