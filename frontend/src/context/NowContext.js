import React, { useState, createContext } from 'react';


const NowContext = createContext({
    now: {
        problem: null,
        constraint: null,
        testcase: null,
        save1: null,
        save2: null,
        save3: null,
    },
    setNow: () => {},
});

const NowProvider = ({ children }) => {
    const [now, setNowContent] = useState({});
    const setNow = ({problem, constraint, testcase, save1, save2, save3}) => {
        setNowContent({problem, constraint, testcase, save1, save2, save3});
    };
    const value = { now, setNow };
    return <NowContext.Provider value={value}>{children}</NowContext.Provider>;
};

export { NowContext, NowProvider };