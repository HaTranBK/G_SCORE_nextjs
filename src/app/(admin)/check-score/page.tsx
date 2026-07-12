"use client";

import { Suspense } from "react";
import ScoreSearchForm from "@/components/pages/checkScore/ScoreSearchForm";
import ScoreDetail from "@/components/pages/checkScore/ScoreDetail";
import { useGetScore } from "@/components/pages/checkScore/hooks/useGetScore";


function CheckScorePageContent() {
  const { data, isLoading, error, isError, searchParams } = useGetScore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ScoreSearchForm />
      <ScoreDetail
        searchSbd={searchParams.sbd}
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default function CheckScorePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto text-center py-8 text-gray-500">
          Loading check score page...
        </div>
      }
    >
      <CheckScorePageContent />
    </Suspense>
  );
}



