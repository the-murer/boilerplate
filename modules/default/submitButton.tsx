import { Button } from "@nextui-org/react";
import React from "react";
import { Spinner } from "@nextui-org/react";

const SubmitButton = ({
  isPending,
  handleFormSubmit,
}: {
  isPending: boolean;
  handleFormSubmit: () => void;
}) => {
  return (
    <Button
      color="primary"
      type="submit"
      onPress={handleFormSubmit as any}
      isDisabled={isPending}
    >
      {isPending && <Spinner size="sm" color="white" />}
      {isPending ? "Salvando..." : "Salvar"}
    </Button>
  );
};

export default SubmitButton;
