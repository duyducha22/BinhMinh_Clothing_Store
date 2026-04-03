import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#fff' }}> 
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;