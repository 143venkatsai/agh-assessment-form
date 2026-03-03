import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { LIGHT_THEME, DARK_THEME } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import ChooseCodingQuestions from "./component/ChooseCodingQuestions/chooseCodingQuestions";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.body.primary.base};
    color: ${(props) => props.theme.text.primary};
     font-family: "Work Sans", sans-serif;
  }

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 160px;
  background-color: ${(props) => props.theme.text.secondary};
  color: ${(props) => props.theme.body.primary.base};
  text-align: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  position: absolute;
  z-index: 1;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.25s ease-in-out;

  /* ✅ prevent overflow */
  white-space: normal;
  word-break: break-word;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%; /* arrow at bottom of tooltip */
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: ${(props) =>
    props.theme.text.secondary} transparent transparent transparent;
}

/* Show tooltip on hover */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

/* Fallbacks if too close to the edges */
.tooltip.left .tooltiptext {
  left: 0;
  transform: none;
}
.tooltip.left .tooltiptext::after {
  left: 10%; /* ✅ shift arrow near left */
  transform: none;
}

.tooltip.right .tooltiptext {
  right: 0;
  left: auto;
  transform: none;
}
.tooltip.right .tooltiptext::after {
  left: auto;
  right: 10%; /* ✅ shift arrow near right */
  transform: none;
}

.selected-day-class {
  background-color: tomato;
  color: white;
  border-radius: 50%;
}

.pod-calendar {
  padding: 1rem ;
  border-radius: 20px ;
  box-shadow: 0px 0px 20px -1px #00000014 ;
  background-color: ${({ theme }) => theme.body.primary.base};
  border: 1px solid ${({ theme }) => theme.border.primary};
  margin-top:0.5rem;
}

.rdp-root {
  --rdp-accent-color: ${({ theme }) => theme.text.primary} !important;
  --rdp-selected-border: : 2px solid var(--rdp-accent-color) !important;
}

.rdp-day:not(.rdp-disabled) button:hover {
  background-color: #cacaca;
}

.rdp-today button {
  background-color: #FC2947;
  border-radius: 50%;
  color: white;
}

.rdp-days button {
   position: relative;
}

.rdp-days .check_icon {
  position: absolute;
  inset:0;
  width: 100%;
  height:100%;
  border-radius: 50%;
  z-index: 2;
  color:green;
  background-color: ${({ theme }) => theme.body.primary.base};

}


.rdp-day[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.rdp-day[data-tooltip]:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #333;
  z-index: 1000;
}

button {
   border:none;
   background-color: transparent;
}

 .line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
 }


.clamp_2 {
-webkit-line-clamp: 2;
}

`;

function App() {
  const { name } = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);

  const [selectedProblems, setSelectedProblems] = useState([]);
  const addDetailsToLocalStorage = () => {
    localStorage.setItem(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzQ1MDhiMmU4Y2M1NWI5MTk0ZTFkZCIsImlhdCI6MTc3MjQ0MTY5NSwiZXhwIjoxNzczMDQ2NDk1fQ._22fmIoiYgNDDZ2JThQSA29x3tCGCte0YGktUhrcb0M",
    );
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lZW5ha3NoaUBnbWFpbC5jb20iLCJpZCI6IjY5NzQ1MDhiMmU4Y2M1NWI5MTk0ZTFkZCIsImFjY291bnRUeXBlIjoiQWRtaW4iLCJjb2xsZWdlTmFtZSI6Ik1FRU5BS1NISSBTVU5EQVJBUkFKQU4gRU5HSU5FRVJJTkcgQ09MTEVHRSwgQ2hlbm5haSIsImlhdCI6MTc3MjUyODkwMSwiZXhwIjoxNzcyNjE1MzAxfQ.2RWAK3mrC5clkCwN9NJemAuvOh590plZ8m8VYUACncQ",
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: "6974508b2e8cc55b9194e1dd",
        firstName: "Meenakshi Sundararajan Engineering College",
        lastName: "Placement Cell",
        collegeName: "MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE, Chennai",
        email: "meenakshi@gmail.com",
        mobileNumber: 5645834734,
        countryCode: "+91",
        courseAccess: [
          {
            _id: "6974526abb4ad429c1eb4892",
            year: "2027",
            ugorpg: "UG",
            practiceTest: "Aptitude+Technical",
            elearningTest: "none",
            validityTill: "2026-03-18T00:00:00.000Z",
            duration: 30,
            departments: [
              "CSE",
              "MECH",
              "EEE",
              "IT",
              "CIVIL",
              "ECE",
              "CYBER SECURITY",
              "AI&DS",
              "CSE-AIML",
            ],
            aptitudeTestsBehaviour: "LOCKED",
            aptitudeELearningTestsBehaviour: "LOCKED",
            technicalTestsBehaviour: "LOCKED",
            technicalELearningTestsBehaviour: "LOCKED",
            companies: [],
            admin: "6974508b2e8cc55b9194e1dd",
            createdAt: "2026-01-24T05:02:34.812Z",
            updatedAt: "2026-01-24T14:38:08.397Z",
            __v: 0,
          },
          {
            _id: "6985fb83e5e8534b17fe4812",
            year: "2029",
            ugorpg: "UG",
            practiceTest: "Aptitude+Technical",
            elearningTest: "none",
            validityTill: "2026-02-18T00:00:00.000Z",
            duration: -44,
            departments: [
              "CSE",
              "MECH",
              "EEE",
              "IT",
              "CIVIL",
              "ECE",
              "CHEMICAL",
              "CYBER SECURITY",
              "AI&DS",
              "CSE-AIML",
            ],
            aptitudeTestsBehaviour: "LOCKED",
            aptitudeELearningTestsBehaviour: "LOCKED",
            technicalTestsBehaviour: "LOCKED",
            technicalELearningTestsBehaviour: "LOCKED",
            admin: "6974508b2e8cc55b9194e1dd",
            createdAt: "2026-02-06T14:32:35.442Z",
            updatedAt: "2026-02-21T05:55:22.519Z",
            __v: 0,
          },
        ],
        accountType: "Admin",
        active: true,
        totalTabSwitches: 3,
        languages: ["java"],
        listOfStudentsRequests: [],
        listOfStudents: [],
        listOfAptitudeTestsByAdmin: [],
        listOfTechnicalTestsByAdmin: [],
        adminLabTests: [],
        adminAssignments: [],
        scheduledAptitudeTestsByAdmin: [],
        scheduledTechnicalTestsByAdmin: [],
        scheduledMockInterviewTestsByAdmin: [],
        deactivateStudents: false,
        __v: 0,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lZW5ha3NoaUBnbWFpbC5jb20iLCJpZCI6IjY5NzQ1MDhiMmU4Y2M1NWI5MTk0ZTFkZCIsImFjY291bnRUeXBlIjoiQWRtaW4iLCJjb2xsZWdlTmFtZSI6Ik1FRU5BS1NISSBTVU5EQVJBUkFKQU4gRU5HSU5FRVJJTkcgQ09MTEVHRSwgQ2hlbm5haSIsImlhdCI6MTc3MjQ0MTY5NSwiZXhwIjoxNzcyNTI4MDk1fQ.qEokRMp_CWpqbk_PoqxfdjkGo1yTM0C0pKd-k-2qnTI",
      }),
    );
  };

  addDetailsToLocalStorage();

  return (
    <ThemeProvider theme={name === "LIGHT" ? LIGHT_THEME : DARK_THEME}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ChooseCodingQuestions
                token={token}
                selectedProblems={selectedProblems}
                setSelectedProblems={setSelectedProblems}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
