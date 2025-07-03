import React from "react";
import { RotatingLines } from 'react-loader-spinner';

type LoaderProps = {
  isLoading?: boolean;
};

const loader = ({isLoading = false}: LoaderProps) => {
  return (
    <RotatingLines
      visible={isLoading}
      strokeColor="#607085"
      ariaLabel="Spinning loader"
    />
  );
}

export default loader;