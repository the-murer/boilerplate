import { Button } from "@nextui-org/react";
import React from "react";
import { Spinner } from "@nextui-org/react";

type SubmitButtonProps = {
  isPending: boolean;
  handleFormSubmit: () => void;
};

const SubmitButton = ({ isPending, handleFormSubmit }: SubmitButtonProps) => {
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
