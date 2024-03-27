import classNames from 'classnames';

const CircleButton = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        `rounded-full border-2 border-gray-400 secondary px-4 py-1`,
        props.className)}>{props.children}</button>
  );
}

export default CircleButton;