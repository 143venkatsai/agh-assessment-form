import React, { useState, useEffect, useMemo, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { DifficultyBadge } from "../ProblemRow/ProblemRow.styles";

export const ProblemRow = forwardRef(function ProblemRow(
  { problem, setSelectedProblems, setAllProblems, serialNumber },
  ref,
) {
  return (
    <tr ref={ref}>
      <td>{serialNumber}</td>
      <td>
        <input
          type="checkbox"
          checked={problem?.isSelected}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedProblems((prev) => [...prev, problem]);
              setAllProblems((prev) => {
                return prev.map((value) => {
                  if (value._id === problem._id) {
                    return { ...value, isSelected: true };
                  } else {
                    return value;
                  }
                });
              });
            } else {
              setAllProblems((prev) => {
                return prev.map((value) => {
                  if (value._id === problem._id) {
                    return { ...value, isSelected: false };
                  } else {
                    return value;
                  }
                });
              });
              setSelectedProblems((prev) => {
                return prev.filter((value) => value._id !== problem._id);
              });
            }
          }}
        />
      </td>
      <td>{problem?.title}</td>
      <td>
        <DifficultyBadge difficulty={problem?.difficulty}>
          {problem?.difficulty}
        </DifficultyBadge>
      </td>
      <td className="actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </td>
    </tr>
  );
});
