import { LucideIcon, CircleAlert } from "lucide-react";
import * as Icons from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon = ({
  name,
  size = 24,
  className = "",
  fallback = "CircleAlert",
}: IconProps) => {
  const IconComponent = (Icons as Record<string, LucideIcon>)[name];
  const FallbackIcon =
    (Icons as Record<string, LucideIcon>)[fallback] || CircleAlert;

  const ComponentToRender = IconComponent || FallbackIcon;

  return <ComponentToRender size={size} className={className} />;
};

export default Icon;
