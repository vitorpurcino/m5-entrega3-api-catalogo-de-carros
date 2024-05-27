export function clearToken(authorization: string) {
  let token;

  if (authorization?.includes("Bearer")) {
    token = authorization?.replace("Bearer ", "");
    token = token.replaceAll(`"`, "");
  } else {
    token = authorization?.replaceAll(`"`, "");
  }

  return token;
}
