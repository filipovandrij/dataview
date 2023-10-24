export function isUserAuthenticated(
  username: string,
  password: string
): boolean {
  const validUsername = "testuser";
  const validPassword = "testpassword123";

  const localUserName: string | null = localStorage.getItem("username");
  const localPassword: string | null = localStorage.getItem("password");

  if (validUsername === localUserName && validPassword === localPassword) {
    return true;
  } else {
    if (username === validUsername && password === validPassword) {
      return true;
    } else {
      return false;
    }
  }
}
