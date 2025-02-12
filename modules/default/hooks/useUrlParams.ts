import { useEffect, useState } from "react";
import { SortEnum } from "@/utils/pagination";

const paginationParams = ["page", "sortField", "sortOrder", "limit"];

const useUrlParams = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortEnum>(SortEnum.DESC);
  const [aditionalParams, setAditionalParams] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get("page");
    const sortFieldParam = searchParams.get("sortField");
    const sortOrderParam = searchParams.get("sortOrder") as SortEnum;
    const limitParam = searchParams.get("limit");
    const aditionalParams = Array.from(searchParams.entries())
      .filter(([key, value]) => !paginationParams.includes(key) && !!value)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

    if (pageParam) setPage(Number(pageParam));
    if (sortFieldParam) setSortField(sortFieldParam);
    if (sortOrderParam) setSortOrder(sortOrderParam);
    if (limitParam) setLimit(Number(limitParam));
    if (aditionalParams) setAditionalParams(aditionalParams);
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (page > 1) newParams.set("page", page.toString());
    if (sortField !== "createdAt") newParams.set("sortField", sortField);
    if (sortOrder !== SortEnum.DESC) newParams.set("sortOrder", sortOrder);
    if (limit) newParams.set("limit", limit.toString());
    if (aditionalParams) {
      Object.entries(aditionalParams)
        .filter(([_, value]) => !!value)
        .forEach(([key, value]) => {
          newParams.set(key, value);
        });
    }
    const queryString = newParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [page, sortField, sortOrder, limit, aditionalParams]);

  const handleSortChange = (sortField: string) => {
    setSortField(sortField);
    setSortOrder(sortOrder === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC);
  };

  const clearFilters = () => {
    setPage(1);
    setSortField("createdAt");
    setSortOrder(SortEnum.DESC);
    setLimit(10);
    setAditionalParams({});
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    handleSortChange,
    aditionalParams,
    setAditionalParams,
    clearFilters,
  };
};

export default useUrlParams;
