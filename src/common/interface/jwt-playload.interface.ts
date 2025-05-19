export interface IJwtPayload {
  sub: string;
  isMasquerader?: boolean;
  masqueraderSub?: string;
}
