import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const ConfirmModal = ({
  open,
  setOpen,
  title = "Are you sure?",
  description = "Please confirm this action.",
  onConfirm,
  loading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  trigger, // React element that triggers the modal open (optional)
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent 
        className="max-w-md w-full p-6 sm:p-8 mx-4"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-gray-600">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
          <AlertDialogCancel
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200"
          >
            {loading ? "Submitting..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
