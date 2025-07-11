import { VideosContainer } from "@/components/videos/videos-container";
import { VideosProvider } from "@/components/videos/videos-context";

export default function VideosPage() {
  return (
    <VideosProvider>
      <VideosContainer />
    </VideosProvider>
  );
}
