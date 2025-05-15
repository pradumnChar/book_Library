import { useEffect, useState } from 'react';
import styled from 'styled-components';

//styleddd componet


const Container = styled.div`

  max-width: 800px;
  margin: 50px auto;
  padding: 30px 40px;
  background: #e5eaf5;


  border-radius: 30px;
  
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
`;


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;

  input {
    flex: 1 1 45%;
    min-width: 120px;
    padding: 12px 15px;
    font-size: 16px;
    border-radius: 6px;
    border: 1.5px solid #e5eaf5;
 
    &:focus {
      
      outline: none;
    }
  }

  button {
    flex: 1 1 100%;
    padding: 12px 25px;
     background: lightBlue;
    color: white;
    font-weight: 800;
    border: none;
    border-radius: 6px;
    cursor: pointer;
 
    &:hover {
      opacity: 0.5;
    }
  }
`;

const SearchInput = styled.input`
  width: 35%;
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #e5eaf5;
  margin-bottom: 25px;
  &:focus {
   
    outline: none;
  }
`;


const BookItem = styled.li`
  background: white;
  padding: 15px 20px;
  margin-bottom: 12px;
  border-radius: 6px;
  color: #212529;
  font-size: 18px;
`;

const NoBooks = styled.li`
  text-align: center;
  color:lightBlue;
 
  margin-top: 20px;
`;

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '' });
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:5000/api/books', {
      headers: { Authorization: token },
    });
    const data = await res.json();
    //setBooks(data);
        setBooks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

   const handleChange = (e) =>
  {
     const name = e.target.name;
     const value = e.target.value;
    setForm({ ...form, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setForm({ 
        title: '', 
        author: '' 
      });
      fetchBooks();
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>

      <Title>Book Library</Title>

      <SearchInput
        type="text"
        placeholder="Search Book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search.trim() === '' && (
        <Form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={form.title}
            required
          />
          <input
            name="author"
            placeholder="Author"
            onChange={handleChange}
            value={form.author}
            required
          />
          <button type="submit">Add Book</button>
        </Form>
      )}

     <div style={{
  listStyleType: 'none',
  paddingLeft: 0
}}>
        {filteredBooks.length > 0 ? (

      filteredBooks.map((book,id) => (

            <BookItem key={id}>
              📖 {book.title}: 
              {book.author}


            </BookItem>
          ))
        ) : (
          <NoBooks>No books found 😂....</NoBooks>
        )}
      </div>

    </Container>
  );
}

export default Dashboard;
