import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  TableRow,
  TableCell,
  DifficultyBadge,
  Checkbox,
  ProblemTitle,
  ActionSection,
} from "./ProblemRow.styles";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProblemRow = forwardRef(function ProblemRow(
  {
    _id,
    serialNumber,
    title,
    difficulty,
    isCompleted,
    handleClickDelete,
    handleClickEdit,
    handleClickProblem,
    type,
  },
  ref
) {
  const { user } = useSelector((state) => state.profile);
  const { codingProblemId } = useParams();
  return (
    <TableRow ref={ref} className={_id === codingProblemId ? "highlight" : ""}>
      {/* <h1>Hello world</h1> */}
      <TableCell>{serialNumber}</TableCell>
      {user?.accountType === "User" ? (
        <TableCell>
          <Checkbox readOnly={true} checked={isCompleted} type="checkbox" />
        </TableCell>
      ) : null}
      <TableCell
        onClick={() => {
          if (user?.accountType === "User") handleClickProblem();
          else {
            toast.error("Action not allowed");
          }
        }}
        className="title"
      >
        <ProblemTitle>{title}</ProblemTitle>
      </TableCell>
      <TableCell>
        <DifficultyBadge difficulty={difficulty}>{difficulty}</DifficultyBadge>
      </TableCell>
      {user?.accountType === "SuperAdmin" ? (
        <TableCell>
          <ActionSection>
            <button onClick={handleClickEdit}>
              <FontAwesomeIcon
                size="lg"
                icon={faEdit}
                className="action-icon"
              />
            </button>
            <button onClick={handleClickDelete}>
              <FontAwesomeIcon
                size="lg"
                icon={faTrashAlt}
                className="action-icon"
              />
            </button>
          </ActionSection>
        </TableCell>
      ) : null}
    </TableRow>
  );
});

export default ProblemRow;
