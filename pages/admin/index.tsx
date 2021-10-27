import { useAdminContext } from "../../context/admin/AdminContext";
import LoginPage from "./LoginPage";
import ImageUploadPage from "./ImageUploadPage";

const Admin = () => {
  const { isLoggedIn, setIsLoggedIn } = useAdminContext();

  // todo fix styling etf

  return isLoggedIn ? (
    <ImageUploadPage />
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} />
  );
};

export default Admin;
