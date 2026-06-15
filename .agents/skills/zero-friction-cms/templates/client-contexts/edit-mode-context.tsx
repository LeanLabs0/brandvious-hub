// ============================================================================
// Zero-Friction CMS — edit mode context. Place at
// `client/src/contexts/edit-mode-context.tsx`.
//
// isEnabled gates the WHOLE editing UI. It is true only when:
//   - the bundle is a dev build (import.meta.env.DEV), AND
//   - VITE_CMS_ENABLED === "true"
// Both env vars live in the development environment only, so production builds
// have DEV=false and the edit button never renders for public visitors.
// ============================================================================
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isEnabled: boolean;
  editToken: string | null;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
  editToken?: string | null;
}

export function EditModeProvider({ children, editToken = null }: ProviderProps) {
  const isEnabled = import.meta.env.DEV && import.meta.env.VITE_CMS_ENABLED === "true";
  const [isEditMode, setIsEditMode] = useState(false);

  const value = useMemo<EditModeContextType>(
    () => ({
      isEditMode: isEnabled && isEditMode,
      toggleEditMode: () => {
        if (isEnabled) setIsEditMode((prev) => !prev);
      },
      isEnabled,
      editToken,
    }),
    [isEnabled, isEditMode, editToken]
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within an EditModeProvider");
  return ctx;
}
