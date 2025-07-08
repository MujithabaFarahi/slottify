import { toast } from 'react-toastify';
import CustomToast from './custom.toast';

const success = (message: string, subtitle: string) => {
  toast.success(
    <CustomToast
      title={message}
      subtitle={subtitle}
      titleColor="text-green-600"
    />,
    {
      icon() {
        return undefined;
      },
    }
  );
};

const error = (message: string, subtitle: string) => {
  toast.error(
    <CustomToast
      title={message}
      subtitle={subtitle}
      titleColor="text-red-600"
    />,
    {
      icon() {
        return undefined;
      },
    }
  );
};

export { success, error };
