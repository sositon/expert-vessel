export type CurrentUser = {
  id: string;
};

export interface AuthAdapter {
  getCurrentUser(): Promise<CurrentUser>;
}

class DevAuthAdapter implements AuthAdapter {
  constructor(private readonly userId: string = "dev-user-0001") {}

  async getCurrentUser(): Promise<CurrentUser> {
    return { id: this.userId };
  }
}

export function createAuthAdapter(): AuthAdapter {
  return new DevAuthAdapter(process.env.DEV_AUTH_USER_ID);
}
