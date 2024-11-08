"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function Drawer({ open, setOpen, children }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <DialogPanel
          transition
          className="pointer-events-auto max-w-md transform bg-white rounded-lg p-1 shadow-lg transition duration-500 ease-in-out"
        >
          {/* Form in here */}
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Drawer;
