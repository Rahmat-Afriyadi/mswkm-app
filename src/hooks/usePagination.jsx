"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function usePagination({ currentPage: currentPageInput, lastPage, shownPageNumber = 5 }) {
  const [currentPage, setCurrentPage] = useState(currentPageInput);
  const nextPageNumber = currentPage === lastPage ? null : currentPage + 1;
  const previousPageNumber = currentPage <= 1 ? null : currentPage - 1;

  const pageNumbers = Array.from(Array(lastPage), (_, index) => index + 1);
  const [arrOfCurrButton, setArrOfCurrButton] = useState([]);

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let tempNumbers = [];
    const dots = "...";

    if (pageNumbers.length <= shownPageNumber) {
      tempNumbers = pageNumbers;
    } else if (parseInt(currentPage) <= 3) {
      tempNumbers = [1, 2, 3, 4, dots, lastPage];
    } else if (parseInt(currentPage) >= lastPage - 2) {
      tempNumbers = [1, dots, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    } else {
      tempNumbers = [
        1,
        dots,
        parseInt(currentPage) - 1,
        parseInt(currentPage),
        parseInt(currentPage) + 1,
        dots,
        lastPage,
      ];
    }

    setArrOfCurrButton(tempNumbers);
  }, [parseInt(currentPage), lastPage, shownPageNumber]); // eslint-disable-line

  const nextPage = () => {
    if (parseInt(currentPage) !== lastPage && lastPage !== 0) {
      let num = parseInt(currentPage);
      setCurrentPage((current) => current + 1);
      const params = new URLSearchParams(searchParams);
      params.set("pageParams", num + 1);
      replace(`${pathname}?${params}`);
      // paginate(num + 1);
    }
  };

  const previousPage = () => {
    if (parseInt(currentPage) !== 1 && lastPage !== 0) {
      let num = parseInt(currentPage);
      setCurrentPage((current) => current - 1);
      const params = new URLSearchParams(searchParams);
      params.set("pageParams", num - 1);
      replace(`${pathname}?${params}`);
      // paginate(num - 1);
    }
  };

  const goToPage = (pageNumber) => {
    let number = pageNumber;
    if (pageNumber === "...") {
      number = arrOfCurrButton[arrOfCurrButton.length - 3] + 1;
    } else if (pageNumber === "... ") {
      number = arrOfCurrButton[3] - 2;
    } else if (pageNumber === " ...") {
      number = arrOfCurrButton[3] + 2;
    }
    setCurrentPage(number);
    const params = new URLSearchParams(searchParams);
    params.set("pageParams", number);
    replace(`${pathname}?${params}`);
    // paginate(number);
  };

  return {
    page: {
      numbers: arrOfCurrButton,
      current: parseInt(currentPage),
      next: nextPageNumber,
      previous: previousPageNumber,
      last: lastPage,
    },
    action: {
      next: nextPage,
      previous: previousPage,
      goTo: goToPage,
    },
  };
}
