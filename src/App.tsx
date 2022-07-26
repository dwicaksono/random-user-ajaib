import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
const ExamplePage = React.lazy(
  () => import(/* webpackChunkName: example-page */ "./Pages/ExamplePage")
);

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ExamplePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
