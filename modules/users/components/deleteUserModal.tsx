import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  UpdateUserByIdInput,
  updateUserByIdResolver,
} from "@/api/user/serializers/updateUserByIdSerializer";

import SubmitButton from "@/modules/default/submitButton";
import UserForm from "./userForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteUser } from "../hooks/useDeletUsers";

type DeleteUserModalProps = {
  id: string;
  name: string;
};

const DeleteUserModal = NiceModal.create(
  ({ id: userId, name }: DeleteUserModalProps) => {
    const { mutate, error, isSuccess } = useDeleteUser();
    const modal = useModal();

    useEffect(() => {
      if (isSuccess) {
        modal.hide();
      }
    }, [isSuccess]);

    return (
      <Modal isOpen={modal.visible} onClose={() => modal.hide()}>
        <ModalContent>
          <ModalHeader>Atualizar Usuário</ModalHeader>
          <ModalBody>
            {error && <h3 className="text-danger-500">{error.message}</h3>}
            <p>Tem certeza que deseja deletar o usuário {name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={() => modal.hide()}>
              {" "}
              Cancelar
            </Button>
            <Button color="primary" onPress={() => mutate({ userId })}>
              {" "}
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);

export default DeleteUserModal;
