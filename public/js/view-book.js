let allBooks = []; // Store all books globally

function viewBook() {
  var request = new XMLHttpRequest();
  request.open('GET', '/view-book', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    
    // Adjust: your JSON structure is { books: [...] }, not a raw array
    allBooks = response.books || [];

    populateGenreFilter(allBooks);
    renderBooks(allBooks); // Initially show all
  };
  request.send();
}

function populateGenreFilter(books) {
  const genres = new Set();
  books.forEach(book => {
    if (book.genre) genres.add(book.genre);
  });

  const select = document.getElementById('genreFilter');
  // Keep "All Genres" and clear others
  select.innerHTML = '<option value="all">All Genres</option>';
  
  Array.from(genres).sort().forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

function renderBooks(booksToShow) {
  let html = '';
  for (let i = 0; i < booksToShow.length; i++) {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${booksToShow[i].title}</td>
        <td>${booksToShow[i].author}</td>
        <td>${booksToShow[i].genre}</td>
        <td>${booksToShow[i].status}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteBook('${booksToShow[i].bookId}')">
            Delete
          </button>
        </td>
      </tr>`;
  }
  document.getElementById('tableContent').innerHTML = html;
}

function filterByGenre() {
  const selectedGenre = document.getElementById('genreFilter').value;
  let filteredBooks;

  if (selectedGenre === 'all') {
    filteredBooks = allBooks;
  } else {
    filteredBooks = allBooks.filter(book => book.genre === selectedGenre);
  }

  renderBooks(filteredBooks);
}