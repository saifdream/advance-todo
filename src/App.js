import React from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="container mx-auto pt-10">
        <div className="grid place-items-center pb-2 px-6 font-sans mt-14">
          <Navbar />
          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
            <Header />

            <hr className="mt-4" />

            <TodoList />

            <hr className="mt-4" />

            <Footer />
          </div>
        </div>
      </div>
  );
}

export default App;
