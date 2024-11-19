"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다</h3>
    </div>
  );  
}
