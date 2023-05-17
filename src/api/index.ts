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
  program: Program[];
}

type GetSessionResponse = {
  data: Session[];
};

// type GetSessionResponse = Sessiom[]

export const getSessions = async (): Promise<Session[]> => {
  const { data } = await axios<any, GetSessionResponse>({
    url: "https://api.entrylevel.net/test/sessions",
    method: "GET",
  });

  return data;
};
