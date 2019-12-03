import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const librarians = [
      { id: 1, name: "josh", email: "me@me.com", password: "pass123" },
      { id: 2, name: "lugada", email: "me@email.com", password: "pass123" }
    ];
    const books = [
      {
        id: 1,
        title: "how to",
        authors: "joshua lugada",
        ISBN: "12-po43",
        publisher: "MK books",
        release_date: "12-09-2019",
        about: "somethings",
        edition: "3rd"
      },
      {
        id: 2,
        title: "angular 2",
        authors: "andrew payne",
        ISBN: "143-8998-0990",
        publisher: "MK books",
        release_date: "12-09-2019",
        about: "somethings about the book",
        edition: "1st"
      }
    ];
    const borrower_books = [
      {
        id: 1,
        book_id: 1,
        reader_id: 1,
        date_issued: "12-09-1998",
        return_date: "18-09-19",
        librarian_id: 1
      }
    ];
    const readers = [
      {
        id: 1,
        name: "dan",
        email: "dan@email.com",
        id_no: 12431,
        id_type: "work",
        phone_number: "070877263"
      }
    ];
    const reports = [
      {
        id: 1,
        book_id: 1,
        type: "damage",
        status: "under repair",
        notes: "updated"
      }
    ];

    return { librarians, books, borrower_books, readers, reports };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === "login") {
      return this.authenticate(reqInfo);
    } else if (reqInfo.collectionName === "forgot-password") {
      return this.sendEmail(reqInfo);
    } else {
      return undefined;
    }
  }

  put(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === "reset-password") {
      return this.reset(reqInfo);
    }
    return undefined;
  }

  private reset(reqInfo: RequestInfo) {
    const users = this.createDb()["librarians"];
    const { req } = reqInfo;
    const { confirmPassword } = req["body"];
    const user = users.find(user => user.password === confirmPassword);

    return reqInfo.utils.createResponse$(() => {
      if (user) {
        return {
          status:200,
          body: { message: "Password has been reset" }
        };
      }
      return {
        error: { body: "User does not exist" }
      };
    });
  }

  private sendEmail(reqInfo: RequestInfo) {
    const allUsers = this.createDb()["librarians"];
    const { req, headers, url } = reqInfo;
    const { email } = req["body"];
    const response = { status: 200, message: "Email sent successfully" };
    const user = allUsers.find(user => user.email === email);
    const err = {
      status: 400,
      statusText: "Bad Request",
      error: { body: "User does not exist" }
    };

    return reqInfo.utils.createResponse$(() => {
      if (user) {
        return {
          status: 200,
          headers,
          url,
          body: {
            response
          }
        };
      } else {
        return err;
      }
    });
  }

  private authenticate(reqInfo: RequestInfo) {
    const { headers, url, req } = reqInfo;
    const { email, password } = req["body"];
    const allLibrarians = this.createDb()["librarians"];
    const loggedInUser = allLibrarians.find(
      user => user.email === email && user.password === password
    );

    return reqInfo.utils.createResponse$(() => {
      if (loggedInUser) {
        return {
          status: 200,
          headers,
          url,
          body: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            user: loggedInUser
          }
        };
      }
      return {
        status: 401,
        headers,
        url,
        error: { body: "Incorrect email or password" }
      };
    });
  }
}
