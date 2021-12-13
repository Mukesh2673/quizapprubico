<template>
  <div class="container">
    <div class="row" :style="{ display: bar }">
      <div class="progress">
        <div
          class="progress-bar bg-danger"
          role="progressbar"
          :style="{ width: [width1] }"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          value="100"
        ></div>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-5">
      <div class="card cardcss" :style="{ display: marksbody }">
        <div class="card-body">
          <h5 class="card-title">Quiz Result</h5>
          <div class="card-text center">{{ count }} marks</div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div
        class="card"
        style="width: 38rem; box-shadow: 5px 5px 10px 10px grey"
        v-show="questionsbody"
      >
        <div class="card-body">
          <h5 class="card-title">Simple Quiz Application</h5>
          <div class="card-text center" v-for="(i, k) in questions1" :Key="k">
            {{ i }}
          </div>
          <div class="d-flex flex-column">
            <div
              class="bg-primary text-light btn btn-primary mt-1"
              v-for="(i, k) in answers1"
              :Key="k"
              v-on:Click="test"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  Name: "AddQuestion",
  data() {
    return {
      questions: [],
      answers: [],
      correctAnswers: [],
      count: 0,
      qn: 0,
      t: 1,
      marksbody: "none",
      questionsbody: true,
      width: 100,
      progressbardisplay: "none",
      countDown: 30,
      timer: null,
      bar: "block",
    };
  },
  methods: {
    /*  make a counter for progress bar */
    countDownTimer() {
      if (this.countDown >= 0) {
        this.timer = setTimeout(() => {
          
          if (this.countDown == 1) {
            this.width = "0%";
          } else {
            this.width = this.countDown * 3.33 + "%";
          }

          this.countDown -= 1;
          this.countDownTimer();
          if (this.countDown == 0) {
            this.countDown = 30; //set count value to 30
            this.t++;
          }
        }, 1000);
      }
    },

    async getQuestions(t) {
      let res = await fetch(`http://localhost:3000/${t}`);
      if (res.status == 200) {
        let data = await res.json();
        this.questions.push(data[this.qn].question);
        this.answers.push(data[this.qn].options),
          this.correctAnswers.push(data[this.qn].answers);
        this.answers = this.answers[this.qn];
      } else {
        this.countDown = 0;
        this.marksbody = "block";
        this.bar = "none";
        this.questionsbody = !this.questionsbody;
      }
    },
    //fuction onclick to question
    test(e) {
      clearTimeout(this.timer);
      this.countDown = 30;
      this.countDownTimer();

      this.counterflag = 1;
      let t = e.target.innerText; //clicked Answers
      let c = this.correctAnswers[0][0]; //coreect Answers
      if (t === c) {
        this.count++;
      }
      this.correctAnswers = [];
      this.t++; //increase variable value so that watch can be run to get new array elements;
    },
  },
  /* method fininesh */
  watch: {
    t() {
      let q = "q" + this.t;
      this.questions = [];
      this.answers = [];
      this.getQuestions(q);
    },
  },
  computed: {
    questions1() {
      return this.questions;
    },
    answers1() {
      return this.answers;
    },
    width1() {
      return this.width;
    },
  },
  beforeMount() {
    let t = "q" + 1;
    this.getQuestions(t);
    this.countDownTimer();
    //console.log(this.questions)
  },
};
</script>
<style scoped>
.cardcss {
  width: 18rem;
  box-shadow: 5px 5px 10px 10px grey;
}
.progress {
  padding-left: 0px;
  padding-right: 0px;
}
</style>