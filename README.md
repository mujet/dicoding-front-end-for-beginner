# dicoding-front-end-for-beginner

Final project submission for dicoding course 'Front-End Web untuk Pemula', Creating a data management application using DOM and Web Storage.

## Here are the submission criteria:

Create a web application that can insert book data into shelves, move book data between shelves, and remove book data from shelves.

For more details, there are 5 main criteria on the Bookshelf Apps that you must create.

1. Able to add book data. The stored book data is a JavaScript object with the following structure:

   `{
 id: string | number,
 title: string,
 author: string,
 year: number,
 isComplete: boolean,
 }`

   The book id for each saved book must be unique.

2. Have two bookshelves. Bookshelf Apps must have 2 bookshelves. Namely, "Not finished reading" and "Finished reading". The "Not finished reading" bookshelf only stores books if the isComplete property is false. The "Finished read" bookshelf only stores books if the isComplete property is true.

3. Can move books between shelves. Books displayed on the shelves, be it "Not finished reading" or "Finished reading" should be able to be moved between the two.

4. Can delete book data. Books displayed on the shelves, be it "Not finished reading" or "Finished reading" should be able to be deleted.

5. Utilize localStorage in storing book data. The book data displayed on the shelf, be it "Not finished reading" or "Finished reading" must be able to survive even if the web page is closed. That way, you should store the book data on localStorage.
