import { Signal } from "@mini/core/jsx-runtime";

export interface IconProps {
  name: string | Signal<string>;
  className?: string | Signal<string>;
  size?: number | Signal<string>;
}
