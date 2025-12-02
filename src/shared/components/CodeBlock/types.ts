export interface CodeBlockOption {
  label: string;
  code: string;
  language?: string;
}

export interface CodeBlockProps {
  code?: string;
  language?: string;
  filename?: string;
  layout?: "compact" | "classic";
  options?: CodeBlockOption[];
}
