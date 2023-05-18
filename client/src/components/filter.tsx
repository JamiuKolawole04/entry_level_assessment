import { useContext, ChangeEvent } from "react";

import { SessionContext } from "../context/sessionContext";

export const Filter = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) return <div>No context yet</div>;

  const { setShortTile, setStatus, status, shortTile } = sessionContext;

  const handleTitleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setShortTile(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value);

  return (
    <div className="session-filter__wrapper">
      <div className="session-filter__menu">
        <span>Filter by title:</span>
        <select
          name="title"
          id="title"
          value={shortTile}
          onChange={handleTitleChange}
        >
          <option value="">All titles</option>
          <option value="vc">vc</option>
          <option value="product">product</option>
          <option value="product2">product2</option>
          <option value="data">data</option>
          <option value="data2">data2</option>
          <option value="data3">data3</option>
          <option value="scrum">scrum</option>
          <option value="growth">growth</option>
        </select>
      </div>

      <div className="session-filter__menu">
        <span>Filter by status:</span>
        <select
          name="status"
          id="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">All status</option>
          <option value="OFFERING">offering</option>
          <option value="RUNNING">running</option>
          <option value="OFFBOARDING">off-boarding</option>
        </select>
      </div>
    </div>
  );
};
