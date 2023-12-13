import { Button } from "react-bootstrap";

export default function Heading({ title, hasBtn = false, btnText, btnFn }) {
  return (
    <div className="mt-5 mb-3 d-flex justify-content-between align-items-center">
      <h3>{title}</h3>
      {hasBtn ? (
        <Button variant="outline-dark" size="md" onClick={btnFn}>
          {btnText}
        </Button>
      ) : null}
    </div>
  );
}
