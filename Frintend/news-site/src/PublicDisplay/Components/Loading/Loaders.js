import React, {useState}from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loaders = () => {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const cssLoad= {
        margin:'50px auto',
        textAlign:'center'
    }
    return (
        <div>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={cssLoad}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loaders;