import { RequestHandler } from "express";

export default function asyncMiddleware(
  handler: (req: any, res: any) => Promise<RequestHandler>
): RequestHandler {
  const trycatch: RequestHandler<any> = async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
  return trycatch;
}
