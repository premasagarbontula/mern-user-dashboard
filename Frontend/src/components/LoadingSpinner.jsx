import PropTypes from "prop-types";

const LoadingSpinner = ({
  size = "medium",
  variant = "primary",
  className = "",
  fullScreen = false,
  text = "",
}) => {
  const sizeClasses = {
    small: "h-5 w-5 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  };

  const variantClasses = {
    primary:
      "border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent",
    secondary:
      "border-t-gray-500 border-r-gray-500 border-b-transparent border-l-transparent",
    success:
      "border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent",
    danger:
      "border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent",
    light:
      "border-t-white border-r-white border-b-transparent border-l-transparent",
  };

  const spinner = (
    <div
      className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          {spinner}
          {text && <p className="mt-4 text-white">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex items-center space-x-2">
        {spinner}
        <span>{text}</span>
      </div>
    );
  }

  return spinner;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "light",
  ]),
  className: PropTypes.string,
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default LoadingSpinner;
