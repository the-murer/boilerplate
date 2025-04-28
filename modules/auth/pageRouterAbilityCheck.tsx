import { useSession } from "next-auth/react";
import { defineAbilityFor, type Actions, type Subjects } from "./casl";

export default function PageRouterAbilitiyCheck({
  role,
  action,
  children,
}: {
  role: Subjects;
  action: Actions;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const ability = defineAbilityFor(session?.user);
  const can = ability.can(action, role);

  if (!can) return <div>Você não tem permissão para acessar esta página</div>;

  return children;
}
