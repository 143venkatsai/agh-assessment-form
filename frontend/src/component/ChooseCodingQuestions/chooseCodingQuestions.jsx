import React, { useState, useEffect } from "react";
import { AllProblemsSection } from "../ChooseCodingQuestions/allProblemsSection";

import { SelectedProblems } from "../ChooseCodingQuestions/selectedProblems";
import { EditCollectionStyle as ChooseCodingQuestionStyle } from "../../pages/super-admin/explore/edit-collection-info/styles";

const ChooseCodingQuestions = ({
  token,
  selectedProblems,
  setSelectedProblems,
}) => {
  const [allProblem, setAllProblems] = useState([]);

  return (
    <ChooseCodingQuestionStyle>
      <div className="layout">
        <div className="content_container">
          <AllProblemsSection
            setSelectedProblems={setSelectedProblems}
            selectedProblems={selectedProblems}
            token={token}
            allProblem={allProblem}
            setAllProblems={setAllProblems}
          />
        </div>
        <div className="content_container">
          <SelectedProblems
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            setAllProblems={setAllProblems}
          />
        </div>
      </div>
    </ChooseCodingQuestionStyle>
  );
};

export default ChooseCodingQuestions;
