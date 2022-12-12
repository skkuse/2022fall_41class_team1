
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
    setCode: () => {},
});

const NowProvider = ({ children }) => {
    const [now, setNowContent] = useState({});
    const setNow = ({problem, reference, testcase, skeleton, save1, save2, save3}) => {
        setNowContent({problem, reference, testcase, skeleton, save1, save2, save3});
    };
    const setCode = ({ save, num }) => {
        if (num == 1) {
            setNowContent({problem: now.problem, reference: now.reference, testcase: now.testcase, skeleton: now.skeleton, save1: save, save2: now.save2, save3: now.save3});
        }
        else if(num == 2) {
            setNowContent({problem: now.problem, reference: now.reference, testcase: now.testcase, skeleton: now.skeleton, save1: now.save1, save2: save, save3: now.save3});
        }
        else if(num == 3) {
            setNowContent({problem: now.problem, reference: now.reference, testcase: now.testcase, skeleton: now.skeleton, save1: now.save1, save2: now.save2, save3: save});
        }
    };
    const value = { now, setNow, setCode };
    return <NowContext.Provider value={value}>{children}</NowContext.Provider>;
};

export { NowContext, NowProvider };