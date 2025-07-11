import { QuickNavigation } from "@/components/quick-navigation";
import { Progress } from "@/components/progress";
import { Actions } from "@/components/actions";

export function WatchSidebar() {
  return (
    <div className="space-y-6">
      <Actions />
      <Progress />
      <QuickNavigation />
    </div>
  );
}
