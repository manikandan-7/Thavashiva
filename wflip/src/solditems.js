import React from 'react';

import Navbar from './navbar';
import Orders from './orders'

export default function Solditems() {
    return (
        <div >
            <Navbar place="cart"/>
            <div
                style={{
                marginTop: '30px',
                paddingTop: '30px'
            }}></div>
            <Orders/>

        </div>
    );
}