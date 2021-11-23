import { useAdminContext } from "../../context/admin/AdminContext";
import LoginPage from "./LoginPage";
import ImageUpload from "../../components/image-upload/ImageUpload";

const Admin = () => {
  const { isLoggedIn, setIsLoggedIn } = useAdminContext();

  return isLoggedIn ? (
    <ImageUpload />
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} />
  );
};

export default Admin;
