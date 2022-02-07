import React from 'react';
//import { useContext } from 'react';

const GlobalContext = React.createContext({
    count: 0,
    targetSubPage: 0,
    globalSwiperRef: null,
    update: (data) => {}
})


export default GlobalContext
