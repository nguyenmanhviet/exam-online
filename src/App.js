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
import ModalAddClassSubject from "./component/modal/ModalAddClassSubject";
import ModalEditClassSubject from "./component/modal/ModalEditClassSubject";
import ModalListStudent from "./component/modal/ModalListStudent";
import ModalAddStudent from "./component/modal/ModalAddStudent";
import QuestionPool from "./component/questionPool/QuestionPool";
import ModalAddQuestion from "./component/modal/ModalAddQuestion";
import ModalEditQuestion from "./component/modal/ModalEditQuestion";
import Exam from "./component/exam/Exam";
import ModalAddExam from "./component/modal/ModalAddExam";
import ModalClassSubjectExam from "./component/modal/ModalClassSubjectExam";
import ModalAddClassSubjectExam from "./component/modal/ModalAddClassSubjectExam";
import ModalEditExam from "./component/modal/ModalEditExam";
import TeacherManager from "./component/teacher/TeacherManager";
import ModalAddTeacher from "./component/modal/ModalAddTeacher";
import ModalEditTeacher from "./component/modal/ModalEditTeacher";
import StudentManager from "./component/student/StudentManager";
import ModalAddStudentManagement from "./component/modal/ModalAddStudentManagement";
import ModalEditStudentManagement from "./component/modal/ModalEditStudentManagement";
import ClassSubjectTeacherManagement from "./component/subject/classSubjectTeacherManagement";
import QuestionPoolTeacher from "./component/questionPool/QuestionPoolTeacher";
import ExamTeacher from "./component/exam/ExamTeacher";
import StudentTeacherManager from "./component/student/StudentTeacherManagement";
import Account from "./component/account/Account";
import Result from "./component/result/Result";
import ResultTeacher from "./component/result/ResultTeacher";
import FaceData from "./component/AI/FaceData";
import FaceDataInSchool from "./component/AI/FaceDataInSchool";

function App() {
  const [isDetailClassSubject, setDetailClassSubject] = useState(false);
  const [isModalQuiz, setModalQuiz] = useState(false);
  const [isModalAddSubject, setModalAddSubject] = useState(false);
  const [isModalAddClassSubject, setModalAddClassSubject] = useState(false);
  const [isModalEditSubject, setModalEditSubject] = useState(false);
  const [isModalEditClassSubject, setModalEditClassSubject] = useState(false);
  const [isModalListStudent, setModalListStudent] = useState(false);
  const [isModalAddStudent, setModalAddStudent] = useState(false);
  const [isModalAddQuestion, setModalAddQuestion] = useState(false);
  const [isModalEditQuestion, setModalEditQuestion] = useState(false);
  const [isModalAddExam, setModalAddExam] = useState(false);
  const [isModalClassSubjectExam, setModalClassSubjectExam] = useState(false);
  const [isModalAddClassSubjectExam, setModalAddClassSubjectExam] =
    useState(false);
  const [isModalEditExam, setModalEditExam] = useState(false);
  const [isModalAddTeacher, setModalAddTeacher] = useState(false);
  const [isModalEditTeacher, setModalEditTeacher] = useState(false);
  const [isModalAddStudentManagement, setModalAddStudentManagement] =
    useState(false);
  const [isModalEditStudentManagement, setModalEditStudentManagement] =
    useState(false);
  const [isBackdrop, setBackdrop] = useState(false);
  const [password, setPassword] = useState("");
  const [kyThi, setkyThi] = useState("");
  const [ketQua, setKetQua] = useState({});
  const [subject, setSubject] = useState({});
  const [classSubject, setClassSubject] = useState({});
  const [question, setQuestion] = useState({});
  const [exam, setExam] = useState({});
  const [teacher, setTeacher] = useState({});
  const [student, setStudent] = useState({});

  const onBackdropHandler = () => {
    setBackdrop(false);
    setDetailClassSubject(false);
    setModalQuiz(false);
    setModalAddSubject(false);
    setModalEditSubject(false);
    setModalAddClassSubject(false);
    setModalEditClassSubject(false);
    setModalListStudent(false);
    setModalAddStudent(false);
    setModalAddQuestion(false);
    setModalEditQuestion(false);
    setModalAddExam(false);
    setModalEditExam(false);
    setModalClassSubjectExam(false);
  };

  const onActiveModalEditStudentManagement = (student) => {
    setStudent(student);
    setBackdrop(true);
    setModalEditStudentManagement(true);
  };

  const onExitModalEditStudentManagement = () => {
    setModalEditStudentManagement(false);
    setBackdrop(false);
  };

  const onActiveModalAddStudentManagement = () => {
    setBackdrop(true);
    setModalAddStudentManagement(true);
  };

  const onExitModalAddStudentManagement = () => {
    setModalAddStudentManagement(false);
    setBackdrop(false);
  };

  const onActiveModalEditTeacher = (teacher) => {
    setTeacher(teacher);
    setBackdrop(true);
    setModalEditTeacher(true);
  };

  const onExitModalEditTeacher = () => {
    setModalEditTeacher(false);
    setBackdrop(false);
  };

  const onActiveModalAddTeacher = () => {
    setBackdrop(true);
    setModalAddTeacher(true);
  };

  const onExitModalAddTeacher = () => {
    setModalAddTeacher(false);
    setBackdrop(false);
  };

  const onActiveModalAddClassSubjectExam = () => {
    setBackdrop(true);
    setModalAddClassSubjectExam(true);
    setModalClassSubjectExam(false);
  };

  const onExitModalAddClassSubjectExam = () => {
    setModalAddClassSubjectExam(false);
    setBackdrop(false);
  };

  const onActiveModalClassSubjectExam = (exam) => {
    setExam(exam);
    setBackdrop(true);
    setModalClassSubjectExam(true);
  };

  const onExitModalClassSubjectExam = () => {
    setModalClassSubjectExam(false);
    setBackdrop(false);
  };

  const onActiveModalEditExam = (exam) => {
    setExam(exam);
    setBackdrop(true);
    setModalEditExam(true);
  };

  const onExitModalEditExam = () => {
    setModalEditExam(false);
    setBackdrop(false);
  };

  const onActiveModalAddExam = () => {
    setBackdrop(true);
    setModalAddExam(true);
  };

  const onExitModalAddExam = () => {
    setModalAddExam(false);
    setBackdrop(false);
  };

  const onActiveModalEditQuestion = (question) => {
    setQuestion(question);
    setBackdrop(true);
    setModalEditQuestion(true);
  };

  const onExitModalEditQuestion = () => {
    setModalEditQuestion(false);
    setBackdrop(false);
  };

  const onActiveModalAddQuestion = () => {
    setBackdrop(true);
    setModalAddQuestion(true);
    setModalListStudent(false);
  };

  const onExitModalAddQuestion = () => {
    setModalAddQuestion(false);
    setBackdrop(false);
  };

  const onActiveModalAddStudent = () => {
    setBackdrop(true);
    setModalAddStudent(true);
    setModalListStudent(false);
  };

  const onExitModalAddStudent = () => {
    setModalAddStudent(false);
    setBackdrop(false);
  };

  const onActiveModalListStudent = (classSubject) => {
    setClassSubject(classSubject);
    setBackdrop(true);
    setModalListStudent(true);
  };

  const onExitModalListStudent = () => {
    setModalListStudent(false);
    setBackdrop(false);
  };

  const onActiveModalEditClassSubject = (classSubject) => {
    setClassSubject(classSubject);
    setBackdrop(true);
    setModalEditClassSubject(true);
  };

  const onExitModalEditClassSubject = () => {
    setModalEditClassSubject(false);
    setBackdrop(false);
  };

  const onActiveModalAddClassSubject = () => {
    setBackdrop(true);
    setModalAddClassSubject(true);
  };

  const onExitModalAddClassSubject = () => {
    setModalAddClassSubject(false);
    setBackdrop(false);
  };

  const onActiveModalEditSubject = (subject) => {
    setSubject(subject);
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

  const onActiveModalQuiz = (password, kyThi) => {
    setBackdrop(true);
    setkyThi(kyThi);
    setPassword(password);
    setModalQuiz(true);
  };

  const onExitModalQuiz = () => {
    setModalQuiz(false);
    setBackdrop(false);
  };

  const onActiveDetailClassSubject = (classSubject) => {
    setClassSubject(classSubject);
    setBackdrop(true);
    setDetailClassSubject(true);
  };

  const onExitDetailClassSubject = () => {
    setDetailClassSubject(false);
    setBackdrop(false);
  };

  const setKetQuaLamBai = (ketQua) => {
    setKetQua(ketQua);
  };

  return (
    <Fragment>
      {isBackdrop && <Backdrop onBackdrop={onBackdropHandler} />}
      {isDetailClassSubject && (
        <ModalDetailClassSubject
          onExitDetailClassSubject={onExitDetailClassSubject}
          classSubject={classSubject}
        />
      )}
      {isModalQuiz && (
        <ModalQuiz onExitModalQuiz={onExitModalQuiz} password={password} />
      )}
      {isModalAddSubject && (
        <ModalAddSubject onExitModalAddSubject={onExitModalAddSubject} />
      )}
      {isModalEditSubject && (
        <ModalEditSubject
          onExitModalEditSubject={onExitModalEditSubject}
          subject={subject}
        />
      )}
      {isModalAddClassSubject && (
        <ModalAddClassSubject
          onExitModalAddClassSubject={onExitModalAddClassSubject}
        />
      )}
      {isModalEditClassSubject && (
        <ModalEditClassSubject
          onExitModalEditClassSubject={onExitModalEditClassSubject}
          classSubject={classSubject}
        />
      )}
      {isModalListStudent && (
        <ModalListStudent
          onExitModalListStudent={onExitModalListStudent}
          onActiveModalAddStudent={onActiveModalAddStudent}
          classSubject={classSubject}
        />
      )}
      {isModalAddStudent && (
        <ModalAddStudent
          onExitModalAddStudent={onExitModalAddStudent}
          classSubject={classSubject}
        />
      )}
      {isModalAddQuestion && (
        <ModalAddQuestion onExitModalAddQuestion={onExitModalAddQuestion} />
      )}
      {isModalEditQuestion && (
        <ModalEditQuestion
          onExitModalEditQuestion={onExitModalEditQuestion}
          question={question}
        />
      )}
      {isModalAddExam && (
        <ModalAddExam onExitModalAddExam={onExitModalAddExam} />
      )}
      {isModalClassSubjectExam && (
        <ModalClassSubjectExam
          onExitModalClassSubjectExam={onExitModalClassSubjectExam}
          onActiveModalAddClassSubjectExam={onActiveModalAddClassSubjectExam}
          exam={exam}
        />
      )}

      {isModalEditExam && (
        <ModalEditExam onExitModalEditExam={onExitModalEditExam} exam={exam} />
      )}

      {isModalAddClassSubjectExam && (
        <ModalAddClassSubjectExam
          onExitModalAddClassSubjectExam={onExitModalAddClassSubjectExam}
          exam={exam}
        />
      )}
      {isModalAddTeacher && (
        <ModalAddTeacher onExitModalAddTeacher={onExitModalAddTeacher} />
      )}

      {isModalEditTeacher && (
        <ModalEditTeacher
          onExitModalEditTeacher={onExitModalEditTeacher}
          teacher={teacher}
        />
      )}
      {isModalAddStudentManagement && (
        <ModalAddStudentManagement
          onExitModalAddStudentManagement={onExitModalAddStudentManagement}
        />
      )}
      {isModalEditStudentManagement && (
        <ModalEditStudentManagement
          onExitModalEditStudentManagement={onExitModalEditStudentManagement}
          student={student}
        />
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
          <Route path="/get-face-data" element={<FaceData />} />
          <Route path="/face-data" element={<FaceDataInSchool />} />
          <Route
            path="/do-quiz"
            element={<DoQuiz kyThi={kyThi} setKetQua={setKetQuaLamBai} />}
          />
          <Route path="/done-quiz" element={<DoneQuiz ketQua={ketQua} />} />

          <Route
            path="/subject-management"
            element={
              <Subject
                onActiveModalAddSubject={onActiveModalAddSubject}
                onActiveModalEditSubject={onActiveModalEditSubject}
              />
            }
          />
          <Route
            path="/class-subject-management"
            element={
              <ClassSubjectManagement
                onActiveModalAddClassSubject={onActiveModalAddClassSubject}
                onActiveModalEditClassSubject={onActiveModalEditClassSubject}
                onActiveModalListStudent={onActiveModalListStudent}
              />
            }
          />

          <Route
            path="/class-subject-teacher-management"
            element={
              <ClassSubjectTeacherManagement
                onActiveModalAddClassSubject={onActiveModalAddClassSubject}
                onActiveModalEditClassSubject={onActiveModalEditClassSubject}
                onActiveModalListStudent={onActiveModalListStudent}
              />
            }
          />

          <Route
            path="/question-pool"
            element={
              <QuestionPool
                onActiveModalAddQuestion={onActiveModalAddQuestion}
                onActiveModalEditQuestion={onActiveModalEditQuestion}
              />
            }
          />

          <Route
            path="/question-pool-teacher"
            element={
              <QuestionPoolTeacher
                onActiveModalAddQuestion={onActiveModalAddQuestion}
                onActiveModalEditQuestion={onActiveModalEditQuestion}
              />
            }
          />

          <Route
            path="/exam-management"
            element={
              <Exam
                onActiveModalAddExam={onActiveModalAddExam}
                onActiveModalEditExam={onActiveModalEditExam}
                onActiveModalClassSubjectExam={onActiveModalClassSubjectExam}
              />
            }
          />

          <Route
            path="/exam-management-teacher"
            element={
              <ExamTeacher
                onActiveModalAddExam={onActiveModalAddExam}
                onActiveModalEditExam={onActiveModalEditExam}
                onActiveModalClassSubjectExam={onActiveModalClassSubjectExam}
              />
            }
          />

          <Route
            path="/teacher-management"
            element={
              <TeacherManager
                onActiveModalAddTeacher={onActiveModalAddTeacher}
                onActiveModalEditTeacher={onActiveModalEditTeacher}
              />
            }
          />

          <Route
            path="/student-management"
            element={
              <StudentManager
                onActiveModalAddStudentManagement={
                  onActiveModalAddStudentManagement
                }
                onActiveModalEditStudentManagement={
                  onActiveModalEditStudentManagement
                }
              />
            }
          />

          <Route
            path="/result-management"
            element={
              <Result
              // onActiveModalAddStudentManagement={
              //   onActiveModalAddStudentManagement
              // }
              // onActiveModalEditStudentManagement={
              //   onActiveModalEditStudentManagement
              // }
              />
            }
          />

          <Route
            path="/result-management-teacher"
            element={
              <ResultTeacher
              // onActiveModalAddStudentManagement={
              //   onActiveModalAddStudentManagement
              // }
              // onActiveModalEditStudentManagement={
              //   onActiveModalEditStudentManagement
              // }
              />
            }
          />

          <Route path="/account-management" element={<Account />} />

          <Route
            path="/student-management-teacher"
            element={
              <StudentTeacherManager
                onActiveModalAddStudentManagement={
                  onActiveModalAddStudentManagement
                }
                onActiveModalEditStudentManagement={
                  onActiveModalEditStudentManagement
                }
              />
            }
          />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
