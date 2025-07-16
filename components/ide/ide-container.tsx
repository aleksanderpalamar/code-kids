"use client";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Controls } from "./controls";
import { CodeEditor } from "./code-editor";
import { Output } from "./output";
import { Toast } from "@/components/ui/toast";
import { useIDE } from "./ide-context";
import { useProjectManagement } from "@/hooks/use-project-management";
import { useCodeExecution } from "@/hooks/use-code-execution";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

export function IDEContainer() {
  const {
    projects,
    currentProject,
    showNewProject,
    newProjectName,
    language,
    code,
    output,
    isRunning,
    isMobile,
    editorRef,
    setShowNewProject,
    setNewProjectName,
    setLanguage,
    setCode,
  } = useIDE();

  // Initialize hooks
  useMobileDetection();
  const { createNewProject, saveProject, loadProject } = useProjectManagement();
  const { runCode, toast, hideToast } = useCodeExecution();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <Header currentProject={currentProject} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar
            projects={projects}
            currentProject={currentProject}
            showNewProject={showNewProject}
            newProjectName={newProjectName}
            language={language}
            onShowNewProjectChange={setShowNewProject}
            onNewProjectNameChange={setNewProjectName}
            onLanguageChange={setLanguage}
            onCreateNewProject={createNewProject}
            onLoadProject={loadProject}
          />

          <div className="lg:col-span-3 order-2 lg:order-2">
            <div className="space-y-6">
              <Controls
                language={language}
                currentProject={currentProject}
                isRunning={isRunning}
                onLanguageChange={setLanguage}
                onSaveProject={saveProject}
                onRunCode={runCode}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CodeEditor
                  language={language}
                  code={code}
                  isMobile={isMobile}
                  editorRef={editorRef}
                  onCodeChange={setCode}
                />

                <Output output={output} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onCloseAction={hideToast}
      />
    </div>
  );
}
