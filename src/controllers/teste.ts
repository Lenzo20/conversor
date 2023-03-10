import { Request, Response } from "express";

export function test(req: Request, res: Response) {
  console.log(req.body);

  const array = [
    { "req.headers": req.headers },
    { "req.body": req.body || null }
  ];

  return res.json(array);
}
