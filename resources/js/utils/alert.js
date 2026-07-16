import Swal from "sweetalert2";

export const successAlert = (title) => {
    Swal.fire({
        icon: "success",
        title,
        timer: 1800,
        showConfirmButton: false,
    });
};

export const errorAlert = (title) => {
    Swal.fire({
        icon: "error",
        title,
    });
};

export const confirmDelete = async () => {
    return Swal.fire({
        title: "Delete User?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete",
    });
};
