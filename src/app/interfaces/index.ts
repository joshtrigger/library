export interface Librarian {
  id: Number;
  name: String;
  email: String;
  password: String;
}

export interface Book {
  id: Number;
  title: String;
  authors: String;
  isbn: String;
  publisher: String;
  release_date: String;
  about: String;
  edition: String;
  imageUrl: String;
  count: Number;
}

export interface BorrowedBook {
  id: Number;
  book_id: Number;
  reader_id: Number;
  date_issued: String;
  return_date: String;
  librarian_id: Number;
}

export interface Reader {
  id: Number;
  name: String;
  email: String;
  id_no: Number;
  id_type: String;
  phone_number: String;
}

export interface Report {
  id: Number;
  book_id: Number;
  type: String;
  status: String;
  notes: String;
}
