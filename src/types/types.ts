export interface CustomError extends Error {
    statusCode: number
}

export interface todo {
    id: number;
    title: string;
    description: string;
    user_id: number | null;
    done: boolean;
  }
  