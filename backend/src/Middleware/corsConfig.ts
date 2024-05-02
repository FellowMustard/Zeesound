const whitelistLink =
  process.env.NODE_ENV === "dev"
    ? [process.env.LOCAL_BE_URL, process.env.LOCAL_FE_URL]
    : [];

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
