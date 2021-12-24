<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-5">
      <div class="card cardcss" :style="{ display: marksbody }">
        <div class="card-body">
          <h5 class="card-title">Quiz Result</h5>
          <div class="card-text center">{{ marks }} marks</div>
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
          <h5 class="card-title text-center">
            Simple Quiz Application<span style="margin-left: 40px">{{
              this.username
            }}</span>
          </h5>
          <button class="btn btn-primary" @click="newpage">gonew page</button>
          <div class="question pt-2">
            <div v-for="(name, j) in questions[0]" :Key="j" class="mt-2">
              <b v-if="!name.descriptive">{{ j + 1 }} {{ name.question }}</b>
              <div v-if="name.descriptive">
                <question @answer="answer" :question1="name" :j="j" />
              </div>
              <div
                class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3 mt-2"
                id="options"
                v-for="(i, k) in name.options"
                :Key="k"
                v-else
              >
                <input
                  type="radio"
                  :name="name.question"
                  v-on:Click="
                    (e) => test(e, name.question, i, name.answers[0], name.id)
                  "
                  :value="i"
                />
                <span class="checkmark"></span>
                <label class="options ml-3">{{ i }}</label>
              </div>
            </div>
          </div>

          <div class="text-center">
            <button
              type="button align-middle"
              class="btn btn-primary mt-2"
              @click="result"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "vue-toast-notification/dist/theme-sugar.css";
import question from "../../components/question.vue";
export default {
  components: { question },
  Name: "quiz",
  component: { question },
  data() {
    return {
      questions: [],
      answers: [],

      marksbody: "none",
      questionsbody: true,
      width: 100,
      marksbody: "none",
      progressbardisplay: "none",
      countDown: 300, //minutes in seconds
      timer: null,
      bar: "block",
      userInput: {},
      marks: 0,
      danswer: "", //set marks initial to 0
      username: "", //get logged in user details.
      require: false,
    };
  },
  methods: {
    answer(e) {
      this.danswer = e;
      this.require = e.require;
      this.userInput = { ...this.userInput, ...this.danswer };
      //console.log(this.userInput);
    },
   async newpage(){
     console.log('gettoken called');
      let res = await axios.get("http://localhost:1100/submited/userdetails");
    },
    open() {
      this.$toast.open({
        message: "Test answers required",
        type: "warning",
        duration: 5000,
        dismissible: true,
      });
    },

    async getQuestions() {
      let res = await axios.get("http://localhost:1100/submited/quizdetails");
      if (res.status == 200) {
        let data = await res.data.q1;
        this.questions.push(data);
      } else {
        this.countDown = 0;
        this.bar = "none";
        this.questionsbody = !this.questionsbody;
      }
    },

    //fuction onclick to question
    test(e, question, answer, cquestion, id) {
      this.userInput = { ...this.userInput, ["answer" + id]: answer };
      console.log(this.userInput);
      //console.log(this.userInput); //use object Destructuring to store common value;
    },
    //function on button submit
    async result() {
      if (this.require == false) {
        this.open();
      } else {
        this.marks = Object.keys(this.userInput).length;
        this.userInput = { ...this.userInput };
        let userdetails = { username: this.username };
        //var t=this.userInput
        let userInput = this.userInput;
        await axios
          .post("http://localhost:1100/submited/test", {
            userInput,
            userdetails,
          })
          .then((response) => console.log(response));
      }
    },
  },
  /* method fininesh */
  computed: {
    question() {
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
    this.getQuestions();
    this.username = localStorage.getItem("username");

    //this.countDownTimer();
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
#options {
  margin-left: 10px;
}
</style>


