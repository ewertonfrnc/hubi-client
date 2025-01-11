import type { User as SupabaseUser } from "@supabase/auth-js";
import type { User, UserPayload } from "~/interfaces/users/users.interface";

import { SupabaseAuthService } from "~/services/supabase";

function formatSupabaseUser(user: SupabaseUser): User {
  return {
    id: user.id,
    createdAt: user.created_at,
    name: user.user_metadata?.name,
    email: user.user_metadata?.email,
    username: user.user_metadata?.username,
  };
}

const userFromCookie = useCookie("user") ?? null;

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      user: userFromCookie.value as User | null,
    };
  },
  actions: {
    async registerNewUser(userPayload: UserPayload) {
      const supabaseUser =
        await SupabaseAuthService.registerNewUser(userPayload);

      const userToRegisterOnDatabase = formatSupabaseUser(supabaseUser);

      const userInfo = await SupabaseAuthService.registerNewUserToDB(
        userToRegisterOnDatabase
      );

      this.user = userInfo;
      const user = useCookie("user");
      user.value = JSON.stringify(userInfo);
    },
  },
});
