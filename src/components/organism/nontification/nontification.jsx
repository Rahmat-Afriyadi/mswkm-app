import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit");
    if (isFirstVisit != "true") {
      setShowNotification(true);
    }
  }, []);

  if (!showNotification) return null;

  return Swal.fire({
    title: "Selamat Datang!",
    text: "Kami senang Anda berkunjung ke website kami.",
    imageUrl: "https://via.placeholder.com/150", // URL gambar
    imageWidth: 150, // Lebar gambar
    imageHeight: 150, // Tinggi gambar
    imageAlt: "Gambar Selamat Datang", // Alt text untuk gambar
    confirmButtonText: "OK",
  }).then(() => {
    localStorage.setItem("firstVisit", "true"), setShowNotification(false);
  });
};

export default Notification;
