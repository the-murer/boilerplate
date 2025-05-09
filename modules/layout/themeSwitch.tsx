import { FC } from "react";
import { SwitchProps, useSwitch } from "@heroui/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const {
    Component,
    slots,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  return (
    <Component
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      {/* <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden> */}
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {theme === "light" ? <MoonIcon size={22} /> : <SunIcon size={22} />}
      </div>
    </Component>
  );
};
