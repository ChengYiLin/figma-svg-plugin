import useSWRMutation from "swr/mutation";
import { postFetcher } from "../lib/fetcher";
import { POST_SVGR_SERVICE } from "../constant/api";
import { SVGRServiceConfig } from "../../types/service";

export function useSVG() {
  const { trigger, isMutating, data } = useSWRMutation(
    POST_SVGR_SERVICE,
    postFetcher<{
      code: string;
      options: SVGRServiceConfig;
    }>
  );

  return {
    isLoading: isMutating,
    postSVGData: trigger,
    data,
  };
}
