import React, { useState, createContext } from 'react';


const NowContext = createContext({
    now: {
        problem: null,
        reference: null,
        testcase: null,
        skeleton: null,
        save1: null,
        save2: null,
        save3: null,
    },
    setNow: () => {},
});

const NowProvider = ({ children }) => {
    const [now, setNowContent] = useState({});
    const setNow = ({problem, reference, testcase, skeleton, save1, save2, save3}) => {
        setNowContent({problem, reference, testcase, skeleton, save1, save2, save3});
    };
    const value = { now, setNow };
    return <NowContext.Provider value={value}>{children}</NowContext.Provider>;
};

export { NowContext, NowProvider };