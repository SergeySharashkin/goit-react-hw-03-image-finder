import { Oval } from "react-loader-spinner";
import { LoadingContain } from "./Loader.styled";
export function Loader() {
  return (
    <LoadingContain>
      <p>Loading image now</p>
      <Oval height="100" width="100" color="grey" />;
    </LoadingContain>
  );
}
