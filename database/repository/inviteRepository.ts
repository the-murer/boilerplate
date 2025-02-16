import Invite from "@/database/models/Invite";
import { Invite as InviteType } from "@/types/inviteTypes";

export async function createInvite({
  email,
  roles,
}: {
  email: string;
  roles: string[];
}): Promise<InviteType | null> {
  return (await Invite.create({ email, roles })).lean() as InviteType | null;
}

export async function findInviteById(id: string): Promise<InviteType | null> {
  return (await Invite.findById(id).lean()) as InviteType | null;
}

export async function deleteUserById(id: string): Promise<InviteType | null> {
  return (await Invite.findByIdAndDelete(id).lean()) as InviteType | null;
}
