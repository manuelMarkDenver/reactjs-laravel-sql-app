import { toast } from "react-toastify";

enum POSITION {
  TOP_RIGHT = "top-right",
}

type GlobalToastProps = {
  type: string;
  message: string;
  position?: POSITION;
};

const useGlobalToast = ({ type, message, position }: GlobalToastProps) => {
  const defaultConfig = {
    position: position ? position : POSITION.TOP_RIGHT,
    autoClose: 3000,
  };

  switch (type) {
    case "success":
      toast.success(message, { ...defaultConfig });
      break;
    case "error":
      toast.error(message, { ...defaultConfig });
      break;
    case "warn":
      toast.warn(message, { ...defaultConfig });
      break;
    case "info":
      toast.info(message, { ...defaultConfig });
      break;
    default:
      toast.success(message, { ...defaultConfig });
      break;
  }
};

export default useGlobalToast;
