import { Octokit } from "octokit";
import { useState, useEffect, useRef } from "preact/hooks";

// Pull Request Setting Info
const owner = "ChengYiLin";
const repo = "WeHelp-TodoList";
const title = "Test2: octokit js create PR";
const base = "main";
const head = "feat/context";
const body = "Your pull request description";

export const useOctokit = () => {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [user, setUser] = useState<any>();

  const octokit = useRef<Octokit>();

  useEffect(() => {
    if (authToken) {
      (async () => {
        octokit.current = new Octokit({ auth: authToken });
        const { data } = await octokit.current.rest.users.getAuthenticated();
        setUser(data);
      })();
    }
  }, [authToken]);

  const settingAuthToken = (token: string) => {
    setAuthToken(token);
  };

  const createPullRequest = async () => {
    if (!octokit.current) {
      console.error("Please resend your token");
      return;
    }

    try {
      const result = (
        await octokit.current.rest.pulls.create({
          owner,
          repo,
          title,
          body,
          head,
          base,
        })
      ).data;

      console.log(result);
    } catch (error) {
      console.error("Error creating pull request:", error);
    }
  };

  return {
    user,
    settingAuthToken,
    createPullRequest,
  };
};
