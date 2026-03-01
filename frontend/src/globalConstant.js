import Swal from "sweetalert2";

export const showErrorAlert = (message) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      confirmButtonColor: "#008BA6",
      text: message,
      customClass: {
        icon: "centered-icon",
      },
    });
  };
  export const showSuccessAlert = (message) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successful",
      confirmButtonColor: "#008BA6",
      text: message,
      customClass: {
        icon: "centered-icon",
      },
    });
  };