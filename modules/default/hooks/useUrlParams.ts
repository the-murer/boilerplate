import { useEffect, useState } from "react";
import { SortEnum } from "@/utils/pagination";

const useUrlParams = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortEnum>(SortEnum.DESC);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get("page");
    const sortFieldParam = searchParams.get("sortField");
    const sortOrderParam = searchParams.get("sortOrder") as SortEnum;
    const searchParam = searchParams.get("search");
    const limitParam = searchParams.get("limit");

    if (pageParam) setPage(Number(pageParam));
    if (sortFieldParam) setSortField(sortFieldParam);
    if (sortOrderParam) setSortOrder(sortOrderParam);
    if (searchParam) setSearch(searchParam);
    if (limitParam) setLimit(Number(limitParam));
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (page > 1) newParams.set("page", page.toString());
    if (sortField !== "createdAt") newParams.set("sortField", sortField);
    if (sortOrder !== SortEnum.DESC) newParams.set("sortOrder", sortOrder);
    if (search) newParams.set("search", search);
    if (limit) newParams.set("limit", limit.toString());
    const queryString = newParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [page, sortField, sortOrder, search, limit]);

  const handleSortChange = (sortField: string) => {
    setSortField(sortField);
    setSortOrder(sortOrder === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC);
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
    search,
    setSearch,
    handleSortChange,
  };
};

export default useUrlParams;
