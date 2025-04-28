import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  UpdateUserByIdInput,
  updateUserByIdResolver,
} from "@/api/user/serializers/updateUserByIdSerializer";

import SubmitButton from "@/modules/default/components/submitButton";
import UserForm from "./userForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateUserModalProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const UpdateUserModal = NiceModal.create(
  ({ id, name, email, password }: UpdateUserModalProps) => {
    const form = useForm<UpdateUserByIdInput>({
      defaultValues: {
        userId: id,
        name,
        email,
        password,
      },
      resolver: zodResolver(updateUserByIdResolver),
      mode: "onBlur",
    });

    const { mutate, isPending, error, isSuccess } = useUpdateUser();
    const modal = useModal();

    useEffect(() => {
      form.reset();
    }, [modal.visible]);

    useEffect(() => {
      if (isSuccess) {
        modal.hide();
      }
    }, [isSuccess]);

    const handleFormSubmit = form.handleSubmit((data: any) => mutate(data));

    return (
      <Modal isOpen={modal.visible} onClose={() => modal.hide()}>
        <ModalContent>
          <ModalHeader>Atualizar Usuário</ModalHeader>
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
  }
);

export default UpdateUserModal;
