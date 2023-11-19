import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useOctokit } from "./hooks/useOctokit";
import "!./style/output.css";

import { useSVGPluginMessage } from "./hooks/useSVGPluginMessage";
import { useSVG } from "./hooks/useSVG";

function Plugin() {
  const [token, setToken] = useState("");

  const { svgString, selectedSVG } = useSVGPluginMessage();
  const { isLoading, postSVGData, data: svgCode } = useSVG();

  const { user, settingAuthToken, createPullRequest } = useOctokit();

  useEffect(() => {
    if (svgString && selectedSVG) {
      postSVGData({
        code: svgString,
        options: {
          typescript: true,
          prettier: true,
          prettierConfig: {
            semi: true,
          },
        },
      });
    }
  }, [svgString]);

  return (
    <main class="p-2">
      <h1 class="text-xl font-bold mb-2">SVG-Worker</h1>

      <div class="mb-4">
        <p class="text-sm font-black mb-2">Github Auth Token :</p>
        <div class="flex gap-4">
          <input
            class="border border-slate-600 border-solid flex-1 px-2"
            type="text"
            name="token"
            id="token"
            placeholder="Please input Github Auth Token"
            value={token}
            onChange={(e) => setToken((e.target as HTMLInputElement).value)}
          />
          <button
            class="bg-sky-400 text-white px-4 py-2"
            onClick={() => settingAuthToken(token)}
          >
            Submit
          </button>
        </div>
        <p>{!!user ? `Hi, ${user.name}` : "Please Submit token"}</p>
        <div>
          <button
            class="bg-green-600 px-4 py-2 text-white"
            onClick={createPullRequest}
          >
            Create PR
          </button>
        </div>
      </div>

      <div class="py-2">
        <p class="text-sm">
          <b>Selected SVG :</b> {selectedSVG ?? "--"}
        </p>

        <div class="py-4">
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <code>{svgCode?.output ?? "null"}</code>
          )}
        </div>
      </div>
    </main>
  );
}

export default render(Plugin);
