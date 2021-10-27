import { vi } from "./vi";
import { en } from "./en";
import { useRouter } from "next/router";

const useTrans = () => {
  const { locale } = useRouter();
  return locale === "vi" ? vi : en;
};

export default useTrans;
