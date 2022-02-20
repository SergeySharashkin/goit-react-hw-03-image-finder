import { ButtonMore } from "./Button.styled";
export function Button({ clickHadler }) {
  return (
    <ButtonMore type="button" onClick={clickHadler}>
      Load more
    </ButtonMore>
  );
}
