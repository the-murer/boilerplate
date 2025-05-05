import { defineAbilityFor, type Actions, type Subjects } from "./casl";
import useSessionStore from "./sessionStore";

export default function ComponentAbilityCheck({
  role,
  action,
  children,
  hidden = true,
  label = "Você não tem permissão para acessar esta página",
}: {
  role: Subjects;
  action: Actions;
  children: React.ReactNode;
  hidden?: boolean;
  label?: React.ReactNode;
}) {
  const { user } = useSessionStore();

  const ability = defineAbilityFor(user);
  const can = ability.can(action, role);

  if (!can && !hidden) return <div>{label}</div>;

  return children;
}
