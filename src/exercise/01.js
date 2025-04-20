import { useEffect } from "react";

export function useDocumentTitle(title = "Welcome to the home page!") {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
