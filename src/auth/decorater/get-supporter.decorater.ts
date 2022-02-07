import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSupporter = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request;
});
