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
import CameraFaceRecognition from "./component/AI/CameraFaceRecognition";
import DoQuiz from "./component/quiz/doQuiz";
import DoneQuiz from "./component/quiz/DoneQuiz";
import Subject from "./component/subject/subject";
import ModalAddSubject from "./component/modal/ModalAddSubject";
import ModalEditSubject from "./component/modal/ModalEditSubject";
import ClassSubjectManagement from "./component/subject/ClassSubjectManagement";

function App() {
  const [isDetailClassSubject, setDetailClassSubject] = useState(false);
  const [isModalQuiz, setModalQuiz] = useState(false);
  const [isModalAddSubject, setModalAddSubject] = useState(false);
  const [isModalEditSubject, setModalEditSubject] = useState(false);
  const [isBackdrop, setBackdrop] = useState(false);

  const onBackdropHandler = () => {
    setBackdrop(false);
    setDetailClassSubject(false);
    setModalQuiz(false);
    setModalAddSubject(false);
    setModalEditSubject(false)
  };

  const onActiveModalEditSubject = () => {
    setBackdrop(true);
    setModalEditSubject(true);
  };

  const onExitModalEditSubject = () => {
    setModalEditSubject(false);
    setBackdrop(false);
  };

  const onActiveModalAddSubject = () => {
    setBackdrop(true);
    setModalAddSubject(true);
  };

  const onExitModalAddSubject = () => {
    setModalAddSubject(false);
    setBackdrop(false);
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
      {isModalAddSubject && (
        <ModalAddSubject onExitModalAddSubject={onExitModalAddSubject} />
      )}
      {isModalEditSubject && (
        <ModalEditSubject onExitModalEditSubject={onExitModalEditSubject} />
      )}
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

          <Route path="/quiz-history" element={<QuizHistory />} />
          <Route
            path="/camera-recognition"
            element={<CameraFaceRecognition />}
          />
          <Route path="/do-quiz" element={<DoQuiz />} />
          <Route path="/done-quiz" element={<DoneQuiz />} />

          <Route
            path="/subject-management"
            element={
              <Subject onActiveModalAddSubject={onActiveModalAddSubject} onActiveModalEditSubject={onActiveModalEditSubject} />
            }
          />
          <Route path="/class-subject-management" element={<ClassSubjectManagement />}/>
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
