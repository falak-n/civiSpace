
import React, { useState, useEffect } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const subjects = [
  'Choose a subject',
  'Structural Engineering',
  'Geotechnical Engineering',
  'Transportation Engineering',
  'Surveying',
  'Environmental Engineering',
  'Construction Planning'
];

function TopSellers() {
  const [selectedSubject, setSelectedSubject] = useState('Choose a subject');
  const [selectedNoteSubject, setSelectedNoteSubject] = useState('Choose a subject');
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { data: books = [] } = useFetchAllBooksQuery();

  useEffect(() => {
    fetch('/notes.json')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Failed to fetch notes:', err));
  }, []);

  useEffect(() => {
    if (selectedNoteSubject === 'Choose a subject') {
      setFilteredNotes([]);
    } else {
      const matched = notes.filter(note => note.category === selectedNoteSubject);
      setFilteredNotes(matched);
    }
  }, [selectedNoteSubject, notes]);

  const filteredBooks =
    selectedSubject === 'Choose a subject'
      ? books
      : books.filter(
          (book) =>
            book.category.toLowerCase() === selectedSubject.toLowerCase()
        );

  return (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Top Sellers & Notes</h2>

    {/* Books Filter Dropdown */}
    <div className="mb-6">
      <label className="block mb-1 text-sm font-medium">📚 Filter Books by Subject</label>
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className=" border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
      >
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>

    {/* Books Section */}
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">Top Seller Books</h3>
      <Swiper
        slidesPerView={1}
         spaceBetween={30}
         navigation={true}
         breakpoints={{
           640: { slidesPerView: 1, spaceBetween: 20 },
           768: { slidesPerView: 2, spaceBetween: 40 },
           1024: { slidesPerView: 2, spaceBetween: 50 },
           1180: { slidesPerView: 3, spaceBetween: 50 }
         }}
         modules={[Pagination, Navigation]}
         className="mySwiper"
       >
         {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
             <SwiperSlide key={index}>
               <BookCard book={book} />
             </SwiperSlide>
          ))}
       </Swiper>
    </div>

    {/* Notes Filter Dropdown */}
    <div className="mb-6">
      <label className="block mb-1 text-sm font-medium">📝 View Notes by Subject</label>
      <select
        value={selectedNoteSubject}
        onChange={(e) => setSelectedNoteSubject(e.target.value)}
        className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
      >
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>


    {/* Notes Section */}
<div>
  <h3 className="text-xl font-semibold mb-4">Subject Notes</h3>

  {filteredNotes.length > 0 ? (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {filteredNotes.map((note, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 border rounded shadow-sm bg-white h-full">
            <h4 className="font-semibold text-lg">{note.title}</h4>
            <p className="text-sm text-gray-600 mb-2">Subject: {note.category}</p>
            <a
              href={note.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2"
            >
              <button
                  className="px-4 py-2 text-black font-bold rounded hover:bg-yellow-500 transition"
                  style={{ backgroundColor: '#FFCE1A',fontSize: '16px' }}
                >
                  View PDF
                </button>

            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : selectedNoteSubject !== 'Choose a subject' ? (
    <p className="text-gray-500">No notes found for {selectedNoteSubject}.</p>
  ) : null}
</div>

   

  </div>
);

}

export default TopSellers;
