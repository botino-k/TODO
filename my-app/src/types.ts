/* eslint-disable @typescript-eslint/no-explicit-any */
export interface todoTask {
  id?: string;
  title: string;
  description: string;
  complited: boolean;
  deadline?: Date;
  file?: any;
}
