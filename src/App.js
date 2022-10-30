import { Fragment, useState } from "react";
import Login from "./component/home/Login";
import Home from "./component/home/Home";
import Layout from "./component/layout/Layout";
import Quiz from "./component/quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import Backdrop from "./component/backdrop/Backdrop";
import ModalDetailClassSubject from "./component/modal/ModalDetailClassSubject";
import "./App.css";
import ClassSubject from "./component/class-subject/classSubject";
import ModalQuiz from "./component/modal/ModalQuiz";
import QuizHistory from "./component/quiz/QuizHistory";

function App() {
  const [isDetailClassSubject, setDetailClassSubject] = useState(false);
  const [isModalQuiz, setModalQuiz] = useState(false);
  const [isBackdrop, setBackdrop] = useState(false);

  const onBackdropHandler = () => {
    setBackdrop(false);
    setDetailClassSubject(false);
    setModalQuiz(false);
  };

  const onActiveModalQuiz = () => {
    setBackdrop(true);
    setModalQuiz(true);
  };

  const onExitModalQuiz = () => {
    setModalQuiz(false);
    setBackdrop(false);
  };

  const onActiveDetailClassSubject = () => {
    setBackdrop(true);
    setDetailClassSubject(true);
  };

  const onExitDetailClassSubject = () => {
    setDetailClassSubject(false);
    setBackdrop(false);
  };

  return (
    <Fragment>
      {isBackdrop && <Backdrop onBackdrop={onBackdropHandler} />}
      {isDetailClassSubject && (
        <ModalDetailClassSubject
          onExitDetailClassSubject={onExitDetailClassSubject}
        />
      )}
      {isModalQuiz && <ModalQuiz onExitModalQuiz={onExitModalQuiz} />}
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/class-subject"
            element={
              <ClassSubject
                onActiveDetailClassSubject={onActiveDetailClassSubject}
              />
            }
          />
          <Route
            path="/quiz"
            element={<Quiz onActiveModalQuiz={onActiveModalQuiz} />}
          />

          <Route
            path="/quiz-history"
            element={<QuizHistory/>}
          />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
