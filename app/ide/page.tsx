import { IDEProvider } from "@/components/ide/ide-context";
import { IDEContainer } from "@/components/ide/ide-container";

export default function IDEPage() {
  return (
    <IDEProvider>
      <IDEContainer />
    </IDEProvider>
  );
}
