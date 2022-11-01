import React from "react";
import CameraDetection from "../AI/CameraDetection";
import classes from "./doQuiz.module.css";
import InformationQuiz from "./InformationQuiz";

const DoQuiz = (props) => {
  var foo = [];

  for (var i = 1; i <= 40; i++) {
    foo.push(i);
  }
  return (
    <div className={classes.container}>
      <div className={classes.containerQuiz}>
        <div className={classes.answerCheck}>
          {foo &&
            foo.map((number) => (
              <button className={classes.checkAnswer}>{number}</button>
            ))}
          {/* <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div>
          <div className={classes.checkAnswer}>1</div> */}
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classes.quiz}>
          <div className={classes.itemNo}>Câu 1:</div>
          <div className={classes.mainRow}>
            <div className={classes.wrapperQuestion}>
              <p className={classes.question}>
                Which of the following is/are White box technique?
              </p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
          <div class="row datext-an-dung">
            <div className={classes.dapAn}>
              <input
                type="radio"
                className={classes.tickBox}
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">
                <b>A. </b> I have a bike
              </label>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.informationCamera}>
        <div className={classes.informationQuiz}>
          <InformationQuiz />
        </div>
        <div className={classes.camera}>
          <CameraDetection />
        </div>
      </div>
    </div>
  );
};

export default DoQuiz;
