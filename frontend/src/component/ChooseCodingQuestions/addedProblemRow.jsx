import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DifficultyBadge } from "../ProblemRow/ProblemRow.styles";

export const AddedProblemRow = ({
  problem,
  serialNumber,
  setSelectedProblems,
  setAllProblems,
  ...props
}) => {
  return (
    <tr {...props}>
      <td>{serialNumber}</td>
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
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};
