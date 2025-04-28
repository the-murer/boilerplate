import { Button } from "@heroui/react";
import React from "react";

type PageHeaderButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  color?: "primary" | "secondary" | "danger";
};

const PageHeaderButton = ({
  onPress,
  children,
  variant = "ghost",
  color = "primary",
}: PageHeaderButtonProps) => {
  return (
    <Button
      onPress={onPress}
      isIconOnly
      variant={variant}
      color={color}
      size="lg"
    >
      {children}
    </Button>
  );
};

export default PageHeaderButton;
