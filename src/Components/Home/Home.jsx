import React from 'react';
import Location from '../Location/Location';
import Search from '../Search/Search';
import './Home.css'

const Home = () => {
    
    return(
        <>
          <div className="container">
                <div className="container-template">
                    <Location/>
                    <Search/>
                </div>
            </div>
        </>
    )
}

export default Home;