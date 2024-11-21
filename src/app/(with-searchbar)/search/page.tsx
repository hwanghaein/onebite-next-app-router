import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
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

export async function generateMetadata({searchParams}: {searchParams : Promise<{q?:string}>}) : Promise<Metadata>{
  // 현재 페이지 메타 데이터를 동적으로 생성하는 역할
  const {q} = await searchParams;
  return{
      title: `${q} : 한입 북스 검색`,
      description: `${q}의 검색 결과입니다`,
      openGraph: {
        title: `${q} : 한입 북스 검색`,
        description: `${q}의 검색 결과입니다`,
        images: ["/thumbnail.png"],
      }
    }
  }


export default function Page({ searchParams }: SearchPageProps) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  )
}
