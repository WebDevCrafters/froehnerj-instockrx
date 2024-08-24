import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BASE_URL } from '../../../../env';
import RestCalls from '../rest/RestCalls';
import Payment from '../../product/_shared/interfaces/Payment';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  PAYMENT_URL: string = '/payment';

  constructor(private userService: UserService) {}

  getCurrentPayment(): Observable<Payment> {

    // do it by yourself, create custom error and return the error code, compoent will handle it, handle some here return rest
    const accessToken = this.userService.getAccessToken();
    const url = `${BASE_URL}${this.PAYMENT_URL}`;
    const headers: Record<string, string> = {
      authorization: accessToken,
    };
    return from(RestCalls.get<Payment>(url)).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 0) {
          errorMessage = 'Network error: Unable to reach the server.';
        } else if (error.status >= 400 && error.status < 500) {
          switch (error.status) {
            case 400:
              errorMessage =
                'Bad Request: The request was invalid or cannot be served.';
              break;
            case 401:
              errorMessage =
                'Unauthorized: Access token is missing or invalid.';
              break;
            case 403:
              errorMessage =
                'Forbidden: You do not have permission to access this resource.';
              break;
            case 404:
              errorMessage =
                'Not Found: The requested resource could not be found.';
              break;
            default:
              errorMessage = `Client Error (${error.status}): ${error.message}`;
              break;
          }
        } else if (error.status >= 500) {
          errorMessage = `Server Error (${error.status}): ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
