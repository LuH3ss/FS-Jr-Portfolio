import { Request, Response } from "express";
export declare const deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const postPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPosts: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPostById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUsers: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMe: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const improvePost: (req: any, res: any) => Promise<any>;
//# sourceMappingURL=controllers.d.ts.map