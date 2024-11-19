import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

interface SearchPageProps {
  searchParams: { q?: string }; // 검색 쿼리의 타입 정의
}

await delay(1500)

export default async function Page({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""; // undefined일 경우 빈 문자열로 처리

  // API 호출
  const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${query}`, {cache: "force-cache"}
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
