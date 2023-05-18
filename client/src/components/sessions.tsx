import { useContext } from "react";

import { SessionContext } from "../context/sessionContext";
import { SessionItem } from "./sessionItem";

export const Sessions = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) return <div>No context yet</div>;

  const { sessions, isSessionsLoading } = sessionContext;

  return (
    <div className="sessions__container">
      {isSessionsLoading ? (
        <p>loading...</p>
      ) : sessions.length <= 0 ? (
        <p>No sessions in this category</p>
      ) : (
        sessions?.map((session) => (
          <SessionItem
            title={session.program[0].display_title}
            thumbNail={session.program[0].thumbnail_img_url}
            StartDate={session.start_date}
            endDate={session.end_date}
            key={session.id}
          />
        ))
      )}
    </div>
  );
};
