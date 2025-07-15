import css from "./Error.module.css";

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return <div className={css.text}>{message}</div>;
}