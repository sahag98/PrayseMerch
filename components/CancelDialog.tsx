import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CancelDialog = ({
  showCancelAlert,
  setShowCancelAlert,
  cancelOrder,
}: any) => {
  return (
    <AlertDialog open={showCancelAlert} onOpenChange={setShowCancelAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will cancel your order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowCancelAlert(false)}>
            No
          </AlertDialogCancel>
          <AlertDialogAction onClick={cancelOrder}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;
