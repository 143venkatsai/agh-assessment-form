import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { SearchInputContainer } from "../../pages/admin/list-of-students/list-of-students-style";
import toast from "react-hot-toast";
import axiosInstance from "../../services/apiconnector";
import { useInView } from "react-intersection-observer";
import debounce from "lodash.debounce";
import Select from "react-select";
import { reactSelectTheme } from "../../theme";
import { useIsThemeDark } from "../../hooks/useIsThemeDark";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProblemRow } from "./problemRow";

export const AllProblemsSection = ({
  selectedProblems,
  setSelectedProblems,
  allProblem,
  setAllProblems,
  token,
  questions_type,
  apiEndPoint = "code/sa/coding-problems",
}) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { problemSetId } = useParams();
  const { ref, inView } = useInView();
  const isDarkTheme = useIsThemeDark();
  const [topicTagOptions, setTopicTagOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectAllLoading, setSelectAllLoading] = useState(false);

  const addIsSeletedFieldAndValue = (arr) => {
    return arr.map((obj) => {
      if (obj?.questionLevel) {
        return {
          _id: obj._id,
          title: obj.question,
          difficulty: obj.questionLevel,
          isSelected: selectedProblems.some((p) => p._id === obj._id),
        };
      } else {
        return {
          ...obj,
          isSelected: selectedProblems.some((p) => p._id === obj._id),
        };
      }
    });
  };

  const fetchProblems = async (
    token,
    search,
    page,
    selectedTopic,
    problemSetId,
  ) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/${apiEndPoint}`,
        {
          params: {
            search: search,
            page: page,
            topic: selectedTopic,
            problemSetId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setHasNextPage(res.data.hasMore);

      let problemsWithIsSelectedField = addIsSeletedFieldAndValue(
        res.data.data,
      );
      setAllProblems((prev) => [...prev, ...problemsWithIsSelectedField]);
    } catch (error) {
      setError("Something went wrong");
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProblems(token, search, page, selectedTopic, problemSetId);
    }
  }, [token, search, page, selectedTopic, problemSetId]);

  const fetchTopicTagsList = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/code/sa/topic-tags`,
        {
          params: {
            type: questions_type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const options = res?.data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setTopicTagOptions(options);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage]);

  const handleChangeSearchInput = (e) => {
    setPage(1);
    setAllProblems([]);
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(
    () => debounce(handleChangeSearchInput, 300),
    [],
  );

  const handleGetAllProblems = async () => {
    try {
      setSelectAllLoading(true);
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/sa/all-problems-by-question-type`,
        {
          params: {
            search: search,
            topic: selectedTopic,
            questions_type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setSelectAllLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicTagsList();
  }, [token]);

  useEffect(() => {
    return () => debouncedResults.cancel();
  });

  return (
    <div>
      <h2>All Problems</h2>
      <div className="filter_container">
        <SearchInputContainer>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              id={"search"}
              type={"text"}
              placeholder="Search Question"
              onChange={debouncedResults}
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
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              width: "150px",
            }),
          }}
          isClearable
          theme={reactSelectTheme(isDarkTheme)}
          options={topicTagOptions}
          onChange={(selectedItem) => {
            setSelectedTopic(selectedItem?.value || "");
            setAllProblems([]);
            setPage(1);
          }}
        />
      </div>

      <div className="problems">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Status</th>
              <th>Problem</th>
              <th>Difficulty</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProblem?.map((problem, index) => {
              const isLastItem = index === allProblem?.length - 1;
              return (
                <ProblemRow
                  key={problem._id}
                  serialNumber={index + 1}
                  problem={problem}
                  ref={isLastItem ? ref : null}
                  setSelectedProblems={setSelectedProblems}
                  setAllProblems={setAllProblems}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="problem_select_footer">
        <div></div>
        <button
          disabled={selectAllLoading || (!search?.trim() && !selectedTopic)}
          className="select-btn"
          onClick={async () => {
            const data = await handleGetAllProblems();
            if (Array.isArray(data)) {
              let problemsWithIsSelectedField = addIsSeletedFieldAndValue(data);
              setAllProblems((prev) => {
                return prev.map((value) => {
                  return problemsWithIsSelectedField.find(
                    (item) => item._id === value._id,
                  )
                    ? { ...value, isSelected: true }
                    : value;
                });
              });
              setSelectedProblems((prev) => {
                const map = new Map();

                // add previous problems
                prev.forEach((p) => {
                  map.set(p._id, p);
                });

                // add new problems (overwrite if exists)
                problemsWithIsSelectedField.forEach((p) => {
                  map.set(p._id, { ...p, isSelected: true });
                });

                return Array.from(map.values());
              });
            }
          }}
        >
          Select All
        </button>
      </div>
    </div>
  );
};
