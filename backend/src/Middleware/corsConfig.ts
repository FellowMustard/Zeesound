const whitelistLink = ["http://localhost:3500", "http://localhost:5173"];

interface CorsProps {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, success?: boolean) => void
  ) => void;
  credentials: boolean;
  optionSuccessStatus: number;
}

export const corsConfig: CorsProps = {
  origin: (origin, callback) => {
    if (!origin || whitelistLink.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};
