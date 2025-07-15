import { Suspense } from "react";
import { WatchSearchParamsWrapper } from "@/components/videos/watch/watch-search-params";
import { WatchContainer } from "@/components/videos/watch/watch-container";
import { WatchPageFallback } from "@/components/videos/watch/watch-page-fallback";

export default function WatchVideoPage() {
  return (
    <Suspense fallback={<WatchPageFallback />}>
      <WatchSearchParamsWrapper>
        <WatchContainer />
      </WatchSearchParamsWrapper>
    </Suspense>
  );
}
