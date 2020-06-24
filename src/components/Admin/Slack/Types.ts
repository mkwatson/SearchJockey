interface SlackAuthedUser {
  access_token: string;
  id: string;
  scope: string;
  token_type: string;
}

interface SlackTeam {
  id: string;
  name: string;
}

export default interface SlackAuthResponse {
  app_id: string;
  authed_user: SlackAuthedUser;
  ok: boolean;
  team: SlackTeam;
}
