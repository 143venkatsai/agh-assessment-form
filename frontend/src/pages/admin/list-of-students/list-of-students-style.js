import styled from "styled-components";
export const ListOfStudentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  transition: margin-left 200ms ease-in-out;
  .button__container {
    display: flex;
    /* flex-direction: column; */
    gap: 10px;
    @media (max-width: 920px) {
    }
  }

  .heading_container {
    padding: 1rem;
  }

  .top_box {
    background-color: ${({ theme }) => theme.body.primary.base};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .after_heading {
    padding: 1rem;
    margin: 0rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.07);
    border-radius: 1.5rem;
  }

  .total_students {
    float: right;
    white-space: nowrap;
  }

  .no-data {
    text-align: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
  }

  /* Base badge styling */
  .badge {
    font-size: 0.75rem;
    border-radius: 20px;
    padding: 0.25rem 0.75rem;
    width: fit-content;
    letter-spacing: 1px;
    color: white;
    text-transform: capitalize;
  }

  /* Green Badge */
  .badge-green {
    background-color: #00b90f; /* Nice green shade */
  }

  /* Red Badge */
  .badge-red {
    background-color: #dc3545; /* Nice red shade */
  }

  .button__style__one {
    background-color: #ffffff;
    border: 1.5px solid red;
    color: red;
    padding: 7px;
    width: 130px;
    font-weight: 700;
    border-radius: 20px;
    cursor: pointer;
  }

  @media screen and (min-width: 640px) {
    & {
      .top_box {
        flex-direction: row;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    margin-left: ${({ $filterVisible }) => ($filterVisible ? "260px" : "0px")};
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1em;
    overflow: x;
    min-width: 1000px;
  }

  thead {
    background-color: #e2e2e2;

    & th:first-of-type {
      border-radius: 1rem 0 0 1rem;
    }

    & th:last-of-type {
      border-radius: 0 1rem 1rem 0;
    }
  }

  th {
    color: #5c5c5c;
    font-size: 16px;
    text-align: center;
    padding: 18px 15px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.03em;
  }

  td {
    text-align: center;
    color: ${({ theme }) => theme.text.secondary};
    padding: 18px 15px;
    font-size: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
  }
  .name__style {
    max-width: 200px;
    & > button {
      border: none;
      background-color: inherit;
      color: inherit;
      font-family: inherit;
    }
  }
  .col-100px {
    width: 100px;
  }

  .actions_container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonWithIcon = styled.button`
  padding: 0.5rem 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  width: fit-content;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const ActiveFitlersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .filter__button {
    border: 1px solid ${({ theme }) => theme.border.primary};
    color: ${({ theme }) => theme.text.secondary};
    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 40px;
    transition: background-color 200ms linear;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.body.primary.hover};
    }
  }

  .active__filters {
    flex-grow: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
  }

  .active__filter {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 2rem;
    color: ${({ theme }) => theme.text.primary};
    border: 1px solid ${({ theme }) => theme.border.primary};

    button {
      all: unset;
      cursor: pointer;
    }
    & span {
      line-height: none;
    }

    & .cross {
      position: relative;
      top: 1px;
    }
  }

  .btn__clear__all__filters {
    background-color: ${({ theme }) => theme.body.primary.base};
    border: none;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.text.primary};
    font-weight: 500;
  }
`;

export const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 300px;
  & label {
    background-color: ${({ theme }) => theme.search_input};
    padding: 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text.primary};
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 50px;

    & input {
      padding: 0.05rem 0.5rem;
      border: none;
      background-color: inherit;
      font-family: inherit;
      color: ${({ theme }) => theme.text.primary};
      width: 100%;
      font-size: 1rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${({ theme }) => theme.text.secondary};
      }
    }
  }
`;
