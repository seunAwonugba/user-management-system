import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      message: exception.response.message,
      statusCode: status,
      //   timestamp: new Date().toISOString(),
      //   path: request.url,
    });
  }
}

// {
//     "message": "Email already exist",
//     "error": "Conflict",
//     "statusCode": 409
// }
