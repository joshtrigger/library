import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const librarians = [
      { id: 1, name: 'josh', email: 'me@me.com', password: 'pass123' },
      { id: 2, name: 'lugada', email: 'me@email.com', password: 'pass123' }
    ];
    const books = [
      {
        id: 1,
        title: 'how to',
        authors: 'joshua lugada',
        ISBN: '12-po43',
        publisher: 'MK books',
        release_date: '12-09-2019',
        about: 'somethings',
        edition: '3rd'
      },
      {
        id: 2,
        title: 'angular 2',
        authors: 'andrew payne',
        ISBN: '143-8998-0990',
        publisher: 'MK books',
        release_date: '12-09-2019',
        about: 'somethings about the book',
        edition: '1st'
      }
    ];
    const borrower_books = [
      {
        id: 1,
        book_id: 1,
        reader_id: 1,
        date_issued: '12-09-1998',
        return_date: '18-09-19',
        librarian_id: 1
      }
    ];
    const readers = [
      {
        id: 1,
        name: 'dan',
        email: 'dan@email.com',
        id_no: 12431,
        id_type: 'work',
        phone_number: '070877263'
      }
    ];
    const reports = [
      {
        id: 1,
        book_id: 1,
        type: 'damage',
        status: 'under repair',
        notes: 'updated'
      }
    ];

    return { librarians, books, borrower_books, readers, reports };
  }
}
