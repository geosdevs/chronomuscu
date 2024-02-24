import { ForwardedRef, forwardRef } from "react";

export type DialogContentProps = {
  title: string;
  content: string;
  onSubmitClick: Function;
  onCancelClick?: Function;
  submitLabel?: string;
  cancelLabel?: string;
  backdropClose?: boolean;
};

type DialogProps = {
  onClose: Function;
  contentProps: DialogContentProps;
};

const Dialog = forwardRef(function (
  props: DialogProps,
  dialogRef: ForwardedRef<HTMLDialogElement>
) {
  const { onClose, contentProps } = props;
  const { title, content, onCancelClick, onSubmitClick, cancelLabel, submitLabel, backdropClose } =
    contentProps;

  return (
    <dialog
      className="relative z-10"
      aria-labelledby="modal-title"
      aria-modal="true"
      ref={dialogRef}
    >
      {/* Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0" */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
          onClick={() => {
            if (backdropClose) {
              onClose();
            }
          }}
        >
          {/* Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
          <div
            className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end sm:px-6">
              <a
                className="mx-1 inline-flex group relative inline-block text-sm font-semibold text-white hover:text-amaranth-purple focus:outline-none active:text-white transition-all duration-300"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (onCancelClick) {
                    onCancelClick();
                  }
                  onClose();
                }}
              >
                <span className="rounded-md absolute inset-0 translate-x-0 translate-y-0 bg-amaranth-purple transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>
                <span className="rounded-md relative block border border-amaranth-purple bg-amaranth-purple hover:bg-white active:bg-amaranth-purple px-2.5 py-1.5">
                  {cancelLabel ?? "Cancel"}
                </span>
              </a>

              <a
                className="mx-1 inline-flex group relative inline-block text-sm font-semibold text-gunmetal hover:text-eerieblack focus:outline-none transition-colors duration-200"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitClick();
                  onClose();
                }}
              >
                <span className="rounded-md absolute inset-0 translate-x-0 translate-y-0 bg-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>
                <span className="rounded-md relative block border border-gray-300 hover:border-gray-300 bg-white active:bg-gray-300 px-2.5 py-1.5">
                  {submitLabel ?? "Submit"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default Dialog;
