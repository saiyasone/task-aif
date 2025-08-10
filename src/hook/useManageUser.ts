import { API_ENDPOINT } from "@/main";
import type { IUser } from "@/models/user.model";
import axios from "axios";
import { useEffect, useState } from "react";

const useManageUser = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const handleOnFetchData = async () => {
    try {
      const response = await axios.get<{ users: IUser[] }>(
        `${API_ENDPOINT}/users`
      );
      const data = await response.data;
      setUsers(data.users || []);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    handleOnFetchData();
  }, []);

  return {
    data: users,
  };
};

export default useManageUser;
