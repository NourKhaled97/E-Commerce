import { formatPrice } from "@/lib/formatPrice"
import Link from "next/link";

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
    // to calculate the page numbers
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 5));

    const numberPaeItems: JSX.Element[] = []

    // btn-active pointer-events-none
    // to make it active and unclickable

    for (let page = minPage; page <= maxPage; page++) {
        numberPaeItems.push(
            <Link
                href={"?page=" + page}
                key={page}
                className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
            >{page}</Link>
        )

    }

    return (
        <>
            <div className="join hidden sm:block">
                {numberPaeItems}
            </div>
            <div className="join block sm:hidden">
                {currentPage > 1 &&
                    <Link href={"?page=" + (currentPage - 1)}
                        className="join-item btn">
                        {"<"}
                    </Link>
                }
                <button className="join-item btn pointer-events-none">
                    Page {currentPage}
                </button>
                {currentPage < totalPages &&
                    <Link href={"?page=" + (currentPage + 1)}
                        className="join-item btn">
                        {">"}
                    </Link>
                }
            </div >
        </>
    )
}