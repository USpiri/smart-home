interface ActionSuccess<T> {
  success: true;
  data: T;
}

interface ActionError {
  success: false;
  error: unknown;
  message: string;
}

export type ActionResponse<T> = ActionSuccess<T> | ActionError;

export const createActionResponse = {
  success<T>(data: T): ActionSuccess<T> {
    return { success: true, data };
  },
  error(message: string, error: unknown): ActionError {
    return { success: false, error, message };
  },
};
