import { Octokit } from "octokit";
import { useState, useEffect } from "preact/hooks";

export const useOctokit = () => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (authToken) {
      (async () => {
        const octokit = new Octokit({ auth: authToken });
        const { data } = await octokit.rest.users.getAuthenticated();
        setUser(data);
      })();
    }
  }, [authToken]);

  const settingAuthToken = (token: string) => {
    setAuthToken(token);
  };

  return {
    user,
    settingAuthToken,
  };
};
