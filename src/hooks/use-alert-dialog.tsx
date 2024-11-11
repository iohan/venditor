"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type AlertDialogContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined,
);

type AlertOptions = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const showAlert = (alertOptions: AlertOptions) => {
    setOptions(alertOptions);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (options?.onCancel) {
      options.onCancel();
    }
    setIsOpen(false);
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}
      {options && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{options.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {options.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                {options.cancelText || "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                {options.confirmText || "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = (): AlertDialogContextType => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialog must be used within an AlertDialogProvider",
    );
  }
  return context;
};
