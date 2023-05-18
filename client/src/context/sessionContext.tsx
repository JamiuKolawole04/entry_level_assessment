import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

import { fetchSessions, Session } from "../api";

interface AuthContextValue {
  isSessionsLoading: boolean;
  sessions: Required<Session[]>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  shortTile: string;
  setShortTile: Dispatch<SetStateAction<string>>;
}

interface Children {
  children: ReactNode;
}

export const SessionContext = createContext<undefined | AuthContextValue>(
  undefined
);

export const SessionContextProvider = ({ children }: Children): JSX.Element => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [status, setStatus] = useState<string>("");
  const [shortTile, setShortTile] = useState<string>("");
  const [isSessionsLoading, setIsSessionsLoading] = useState<boolean>(false);

  const getSessions = useCallback(async (): Promise<void> => {
    try {
      setIsSessionsLoading(true);
      const response = await fetchSessions(
        `/api/sessions?short_title=${shortTile}&status=${status}`
      );
      setSessions(response.sessions);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsSessionsLoading(false);
    }
  }, [shortTile, status]);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  return (
    <SessionContext.Provider
      value={{
        sessions,
        isSessionsLoading,
        status,
        setStatus,
        shortTile,
        setShortTile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
