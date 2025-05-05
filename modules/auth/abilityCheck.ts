import { User } from "@/types/userTypes";
import { Actions, defineAbilityFor, Subjects } from "./casl";

type AbilityCheckProps = {
  user: User;
  role: Subjects;
  action: Actions;
};

export default function AbilityCheck({
  user,
  role,
  action,
}: AbilityCheckProps): boolean {
  const ability = defineAbilityFor(user);
  const can = ability.can(action, role);

  return can;
}
