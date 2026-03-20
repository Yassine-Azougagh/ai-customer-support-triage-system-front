import { cn } from "@/lib/utils";

export const Logo = ({
  className,
  src,
  ...props
}) => {
  return (
    <img
      alt="logo"
      className={cn("size-7", className)}
      src={src}
      {...props} />
  );
};
