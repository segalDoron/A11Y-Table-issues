import { RotatingLines } from 'react-loader-spinner';

import './loader.css';

type LoaderProps = {
  isLoading?: boolean;
};

const loader = ({isLoading = false}: LoaderProps) => {
  return (
    <div className="loaderRoot">
      <RotatingLines
        visible={isLoading}
        strokeColor="#607085"
        ariaLabel="Spinning loader"
      />
        This will take a minute
    </div>
  );
}

export default loader;