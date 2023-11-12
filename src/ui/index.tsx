import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import "!./style/output.css";

function Plugin() {
  return <h1 class="text-3xl font-bold text-rose-500">Hello, World!! !!!!</h1>;
}

export default render(Plugin);
