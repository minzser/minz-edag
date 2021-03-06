import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }

  private baseUrl = "https://cataas.com/api/tags";
  private baseUrlMsg = "https://meowfacts.herokuapp.com";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  getCats(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCatText(): Observable<any> {
    return this.http
      .get<any>(this.baseUrlMsg, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
