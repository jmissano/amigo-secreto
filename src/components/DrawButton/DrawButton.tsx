import React from "react";

interface DrawButtonProps {
  onClick: () => void;
}

const DrawButton: React.FC<DrawButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Sortear</button>;
};

export default DrawButton;
