"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/utils";
import {
  Pagination as SPagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages?: number;
}

const Pagination = ({ page, totalPages = 1 }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newURL = formUrlQuery(searchParams.toString(), "page", pageValue);

    router.push(newURL, { scroll: false });
  };

  if (totalPages === 1) return null;

  return (
    <SPagination className="mt-10">
      <PaginationContent className="flex w-full">
        <Button
          disabled={Number(page) <= 1}
          className="bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover rounded-2xl py-4 px-6 p-16-semibold h-12 w-32 md:h-14 font-semibold"
          onClick={() => onPageChange("prev")}
        >
          <PaginationPrevious className="hover:bg-transparent hover:text-white" />
        </Button>

        <p className="flex justify-center items-center font-medium w-fit flex-1">
          {page} / {totalPages}
        </p>

        <Button
          className="bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover rounded-2xl py-4 px-6 p-16-semibold h-12 w-32 md:h-14 font-semibold"
          onClick={() => onPageChange("next")}
          disabled={Number(page) >= totalPages}
        >
          <PaginationNext className="hover:bg-transparent hover:text-white" />
        </Button>
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
