import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useRouterParams = () => {
  const searchParams = useSearchParams();

  const sbd = useMemo(() => {
    return searchParams.get("sbd") || "";
  }, [searchParams]);

  return {
    sbd,
  };
};
