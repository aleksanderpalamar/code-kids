import { WatchProvider } from "@/components/videos/watch/watch-context";
import { WatchContainer } from "@/components/videos/watch/watch-container";

export default function WatchVideoPage() {
  return (
    <WatchProvider>
      <WatchContainer />
    </WatchProvider>
  );
}
