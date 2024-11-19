import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500)
  // API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  // 데이터 파싱
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}



interface SearchPageProps {
  searchParams: { q?: string }; // 검색 쿼리의 타입 정의
}

export default function Page({ searchParams }: SearchPageProps) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  )
}
