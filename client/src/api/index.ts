import axios from "axios";

type Program = {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
};

export interface Session {
  id: string;
  name: string;
  status: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  program: Required<Program[]>;
}

interface SessionResponse {
  success: true;
  message: string;
  sessions: Session[];
}

type GetSessionResponse = {
  data: SessionResponse;
};
const baseUrl = "http://localhost:8080";

export const fetchSessions = async (
  url: string
): Promise<Required<SessionResponse>> => {
  const { data } = await axios<any, GetSessionResponse>({
    url: `${baseUrl}${url}`,
    method: "GET",
  });

  return data;
};
