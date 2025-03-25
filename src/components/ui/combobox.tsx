"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";

export interface IComboArrayItem {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  array: IComboArrayItem[];
  control: any;
  name: string;
}

export function ComboboxDemo({
  placeholder,
  searchPlaceholder,
  emptyMessage,
  array,
  control,
  name,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between text-background-color"
            >
              {field.value
                ? array.find((item) => item.value === field.value)?.label
                : placeholder}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full max-w-full p-0"
            style={{ zIndex: 2200 }}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {array.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        field.onChange(
                          currentValue === field.value ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          field.value === item.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
