import { sendLog } from "./resources/SendData";

class LoggingService {
    static logUserAction(userId, actionType, component, metadata) {

        const now = Date.now();
        const date = new Date(now).toISOString();

        try {
          sendLog(userId, actionType, component, metadata, date);
        } catch (error) {
          console.error(error);
        }
    }
}

export default LoggingService;