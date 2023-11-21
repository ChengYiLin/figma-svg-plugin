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

  const createNewBranch = async (newBranchName: string) => {
    if (!octokit.current) {
      console.error("Please resend your token");
      return;
    }

    try {
      const baseBranchRef = `heads/${base}`;
      const { data: baseBranchRefResponse } =
        await octokit.current.rest.git.getRef({
          owner,
          repo,
          ref: baseBranchRef,
        });
      const latestCommitSha = baseBranchRefResponse.object.sha;

      await octokit.current.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${newBranchName}`,
        sha: latestCommitSha,
      });
    } catch (error) {
      console.error(`Create New Branch (${newBranchName}) Error : ${error}`);
    }
  };

  const createCommit = async (newBranchName: string, svgr: string) => {
    if (!octokit.current) {
      console.error("Please resend your token");
      return;
    }

    try {
      // Get Last Commit sha
      const baseBranchRef = `heads/${base}`;
      const {
        data: {
          object: { sha: latestCommitSha },
        },
      } = await octokit.current.rest.git.getRef({
        owner,
        repo,
        ref: baseBranchRef,
      });

      // Create New Branch
      const {
        data: {
          object: { sha: newBranchSHA },
        },
      } = await octokit.current.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${newBranchName}`,
        sha: latestCommitSha,
      });

      // Add New file
      await octokit.current.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `src/icons/${newBranchName}.tsx`,
        message: `feat: Add New icon ${newBranchName}`,
        content: btoa(svgr),
        sha: newBranchSHA,
        branch: newBranchName,
      });

      // Create Pull Request
      await octokit.current.rest.pulls.create({
        owner,
        repo,
        title: `Feat: Add new icon - ${newBranchName}`,
        body: `Figma plugin add new icon : ${newBranchName}`,
        head: newBranchName,
        base,
      });
    } catch (error) {
      console.error(`Create Commit Error : ${error}`);
    }
  };

  return {
    user,
    settingAuthToken,
    createPullRequest,
    createNewBranch,
    createCommit,
  };
};
