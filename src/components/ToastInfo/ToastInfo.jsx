import { Toaster } from "react-hot-toast";

export default function ToastInfo() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
      }}
    />
  );
}
