import "./App.css";
import { useEffect, useState } from "react";
import Issue from "./components/Issue/Issue";

function App() {
  const [issuesList, setIssuesList] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getIssuesList(10, pageCount, null).then((response) => {
      setIssuesList(response);
    });
  }, []);

  async function getIssuesList(items, page, type) {
    const url = pageinateUrl(items, page, type);

    const response = await fetch(url);

    const issuesList = await response.json();

    return issuesList;
  }

  const pageinateUrl = (items, page, type) => {
    // let pg = page;
    const url = "https://api.github.com/repos/microsoft/vscode/issues";
    if (type) {
      if (type === "next") {
        setPageCount(pageCount + 1);
        return `${url}?per_page=${items}&page=${page}`;
      } else {
        setPageCount(pageCount - 1);
        return `${url}?per_page=${items}&page=${page}`;
      }
    } else {
      return `${url}?per_page=${items}&page=${page}`;
    }
  };

  useEffect(() => {
    async function getAssigneeList() {
      const response = await fetch(
        `https://api.github.com/repos/microsoft/vscode/assignees?per_page=10&page=${pageCount}`
      );

      const assigneeList = await response.json();

      return assigneeList;
    }
    getAssigneeList().then((response) => {
      setAssignees(response);
    });
  }, []);

  const onSelectChange = (e) => {
    getAssignedIssue(e.target.value).then((res) => {
      setIssuesList(res);
    });
  };

  const getAssignedIssue = async (user) => {
    const response = await fetch(
      "https://api.github.com/repos/microsoft/vscode/issues?assignee=" + user
    );
    return response.json();
  };

  const onPrevious = (pg) => {
    getIssuesList(10, pg, "prev").then((response) => {
      setIssuesList(response);
    });
  };
  const onNext = (pg) => {
    getIssuesList(10, pg, "next").then((response) => {
      setIssuesList(response);
    });
  };

  return (
    <div className="App">
      <section>
        <div>
          <select onChange={onSelectChange}>
            {assignees.map((a, i) => {
              return <option key={i}>{a.login}</option>;
            })}
          </select>
        </div>

        {issuesList.map((iL, i) => {
          return <Issue key={i} {...iL}></Issue>;
        })}

        <div>
          <button onClick={() => onPrevious(pageCount - 1)}>Previous</button>
          <button onClick={() => onNext(pageCount + 1)}>Next</button>
        </div>
      </section>
    </div>
  );
}

export default App;
