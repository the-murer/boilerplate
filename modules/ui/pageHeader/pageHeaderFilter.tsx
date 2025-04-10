import { Button } from "@nextui-org/react";
import React, { ReactNode } from "react";

type PageHeaderFilterProps = {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  color?: "primary" | "secondary" | "danger";
};

const PageHeaderFilter = ({
  onPress,
  children,
  variant = "ghost",
  color = "primary",
}: PageHeaderFilterProps) => {



  const actions = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === PageHeaderFilter.Field
  );

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

PageHeaderFilter.Field = function Field({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
};

export default PageHeaderFilter;
