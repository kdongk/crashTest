import axios from "axios";
import GV from "./global_variables";
import { type } from "@testing-library/user-event/dist/type";

const requester = (function () {
  return {
    postUserData: async (header, data) => {
      const response = await axios.post(GV.getServerURL(), {
        headers: header,
        ContentType: "application/json",
        content: data,
        validity: 0,
      });
      return response;
    },
    joinRoomRequest: async (header, user, room_url) => {
      const response = await axios.get(room_url, {
        headers: header,
        auth: user,
      });

      return response;
    },
  };
})();

export default requester;
