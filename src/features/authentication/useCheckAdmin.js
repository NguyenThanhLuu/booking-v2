import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

function useCheckAdmin() {
  const [isNormalUser, setIsNormalUser] = useState(false);
  useEffect(() => {
    getCurrentUser().then((data) => {
      setIsNormalUser(!data.user_metadata.isAdmin);
    });
  }, []);

  return isNormalUser;
}

export default useCheckAdmin;
