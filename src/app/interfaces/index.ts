export interface Librarian {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Book {
  id: number;
  title: string;
  authors: string;
  isbn: string;
  publisher: string;
  release_date: string;
  about: string;
  edition: string;
  imageUrl: string;
  count: number;
}

export interface BorrowedBook {
  id: number;
  book_id: number;
  reader_id: number;
  date_issued: string;
  return_date: string;
  librarian_id: number;
}

export interface Reader {
  id: number;
  name: string;
  email: string;
  id_no: number;
  id_type: string;
  phone_number: string;
  borrowed_books: number
}

export interface Report {
  id: number;
  book_id: number;
  type: string;
  status: string;
  notes: string;
}

export interface UserObject {
  token: string,
  user: Librarian
}
