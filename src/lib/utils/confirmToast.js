import { toast } from "react-toastify";

export const confirmToast = ({ message, onConfirm }) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-white">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={closeToast}
            className="px-3 py-1 rounded bg-gray-300 text-gray-800 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    {
      closeOnClick: false,
      closeButton: false,
      autoClose: false,
    }
  );
};
