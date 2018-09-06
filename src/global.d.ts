import { toastr } from 'react-redux-toastr';

declare module 'react-redux-toastr' {
  interface ToastrEmitter {
    successWithoutIcon: (
      title: string,
      message: string,
      options?: BasicToastrOptions,
    ) => void;
    warningWithoutIcon: (
      title: string,
      message: string,
      options?: BasicToastrOptions,
    ) => void;
    errorWithoutIcon: (
      title: string,
      message: string,
      options?: BasicToastrOptions,
    ) => void;
    infoWithoutIcon: (
      title: string,
      message: string,
      options?: BasicToastrOptions,
    ) => void;
  }
}
