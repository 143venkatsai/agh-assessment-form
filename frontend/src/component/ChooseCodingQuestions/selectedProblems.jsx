import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { SearchInputContainer } from "../../pages/admin/list-of-students/list-of-students-style";
import NoDataFoundPage from "../no-data-found/NoDataFound";
import Select from "react-select";
import { reactSelectTheme } from "../../theme";
import { useIsThemeDark } from "../../hooks/useIsThemeDark";
import { useState, useEffect,useMemo, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddedProblemRow } from "./addedProblemRow";

export const SelectedProblems = ({
  selectedProblems,
  setSelectedProblems,
  setAllProblems,
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const isDarkTheme = useIsThemeDark();

  let selectedCount = selectedProblems?.length;

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...selectedProblems];
    const draggedElement = newItems[draggedItem.index];

    // Remove the dragged item
    newItems.splice(draggedItem.index, 1);

    // Insert at new position
    newItems.splice(dropIndex, 0, draggedElement);

    setSelectedProblems(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      <h2>Selected Problems</h2>
      <div className="filter_container">
        <SearchInputContainer>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              id={"search"}
              type={"text"}
              placeholder="Search Question"
              // onChange={debouncedResults}
            />
          </label>
        </SearchInputContainer>

        <Select
          placeholder={"Topic"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "50px",
            }),
          }}
          theme={reactSelectTheme(isDarkTheme)}
          options={[
            {
              label: "Array",
              value: "328213434",
            },
          ]}
        />
      </div>
      <div className="problems">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Problem</th>
              <th>Difficulty</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {selectedProblems?.map((problem, index) => (
              <AddedProblemRow
                key={problem._id}
                serialNumber={index + 1}
                problem={problem}
                setSelectedProblems={setSelectedProblems}
                setAllProblems={setAllProblems}
                draggable
                onDragStart={(e) => handleDragStart(e, problem, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </tbody>
        </table>
        {selectedCount === 0 ? (
          <NoDataFoundPage title={"No Queston added"} description={" "} />
        ) : null}
      </div>
      <div className="problem_select_footer">
        <div>Total Selected: {selectedCount}</div>
        <button
          className="remove-btn"
          onClick={() => {
            setSelectedProblems([]);
            setAllProblems((prev) =>
              prev.map((value) => ({
                ...value,
                isSelected: false,
              })),
            );
          }}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};
