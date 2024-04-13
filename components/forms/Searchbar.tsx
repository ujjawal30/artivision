"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const queryString = searchParams.toString();

      const newURL = query
        ? formUrlQuery(queryString, "q", query)
        : removeKeysFromQuery(queryString, ["q"]);

      router.push(newURL, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="flex items-center w-full rounded-2xl border-2 border-claret-200/20 bg-white px-4 shadow-sm shadow-claret-200/15 md:max-w-96">
      <SearchIcon size={24} className="text-dark-600" />

      <Input
        className="border-0 bg-transparent text-dark-600 w-full placeholder:text-dark-400 h-12 font-medium focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
