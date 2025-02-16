import { useEffect, useState } from "react";

const useUrlParams = () => {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const params = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    setParams(params);
  }, [window.location.search]);

  return params;
};

export default useUrlParams;
