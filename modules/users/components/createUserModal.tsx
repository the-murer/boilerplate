import {
  CreateUserInput,
  createUserResolver,
} from "@/api/user/serializers/createUserSerializer";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import SubmitButton from "@/modules/default/components/submitButton";
import UserForm from "./userForm";
import { useCreateUser } from "../hooks/useCreateUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateUserModal = NiceModal.create(() => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserResolver),
    mode: "onBlur",
  });

  const { mutate: createUser, isPending, error, isSuccess } = useCreateUser();
  const modal = useModal();

  useEffect(() => {
    form.reset();
  }, [modal.visible]);

  useEffect(() => {
    if (isSuccess) {
      modal.hide();
    }
  }, [isSuccess]);

  const handleFormSubmit = form.handleSubmit((data: any) => createUser(data));

  return (
    <Modal isOpen={modal.visible} onClose={() => modal.hide()}>
      <ModalContent>
        <ModalHeader>Criar Usuário</ModalHeader>
        <ModalBody>
          {error && <h3 className="text-danger-500">{error.message}</h3>}
          <UserForm form={form} />
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            isPending={isPending}
            handleFormSubmit={handleFormSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CreateUserModal;
