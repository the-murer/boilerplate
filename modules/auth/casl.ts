import { AbilityBuilder, type PureAbility } from "@casl/ability";
import { createMongoAbility } from "@casl/ability";

export type Actions = "create" | "read" | "update" | "delete" | "manage";
export type Subjects =
  | "User"
  | "Post"
  | "Comment"
  | "Dashboard"
  | "Admin"
  | "Settings"
  | "all";

export type AppAbility = PureAbility<[Actions, Subjects]>;

export function defineAbilityFor(user: any | undefined) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  if (!user) {
    // Unauthenticated user abilities
    can("read", "Post");
    return build();
  }

  if (user.roles.includes("master")) {
    can("manage", "all");
  }

  if (user.roles.includes("admin")) {
    can("manage", "all");
  }

  if (user.roles.includes("user")) {
    can("read", "Dashboard");
    can("read", "Post");
    can("read", "User");
    can("create", "Post");
    can("update", "Post", { authorId: user.id });
    can("delete", "Post", { authorId: user.id });
    can("read", "Comment");
    can("create", "Comment");
    can("update", "Comment", { authorId: user.id });
    can("delete", "Comment", { authorId: user.id });
    can("read", "Settings", { userId: user.id });
    can("update", "Settings", { userId: user.id });
  }

  return build();
}
