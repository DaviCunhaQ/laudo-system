import * as React from "react";
import { cn } from "../../lib/utils";
import Loading from "../icons/loading";

interface InputProps extends React.ComponentProps<"input"> {
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-main-color disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            isLoading && "opacity-50 cursor-wait",
            className
          )}
          ref={ref}
          disabled={isLoading || props.disabled}
          {...props}
        />
        {isLoading && (
          <span className="absolute top-0 right-0">
            <Loading height="24" width="24" />
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
