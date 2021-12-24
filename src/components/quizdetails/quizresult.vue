<template>
  <div>
    <div style="margin-left: 140px" v-if="kk">
      <h1 style="text-align: center">Quiz Result</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">s.no</th>
            <th scope="col">UserName</th>
            <th scope="col">Total Question</th>
            <th scope="col">Attempted</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, k) in users" :key="k">
            <th scope="row">{{ k + 1 }}</th>
            <td>{{ user.Username }}</td>
            <td>{{ Question.length }}</td>
            <td>{{ Object.keys(user.Answers[0]).length }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                v-on:Click="test(user._id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--------------------------------------------display user marks------------------------------------------------------------------------------>

    <div style="margin-left: 140px" v-if="kb">
    <p style="text-align: center">Student Name : {{studentName}}</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">s.no</th>
            <th scope="col">Questions</th>
            <th scope="col">Answers</th>
            <th scope="col">CorrectAnswers</th>
            <th scope="col">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ans, k) in Answers" :key="k">
            <th scope="row">{{ k + 1 }}</th>
            <td>{{ Question[k].question }}</td>
            <td>{{ ans }}</td>
            <td>{{ correctAnswer[k].answers[0] }}</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        class="btn btn-primary btn-md"
        :onclick="
          () => {
            (kb = !kb), (seeresult = true);
          }
        "
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      bod: "fdkljldsajf",
      Answers: [],
      correctAnswer: [],
      Question: [],
      seeresult: true,
      kb: false,
      studentName:'',
      required:''
 

    };
  },
  methods: {
    async getQuestions() {
      let res = await axios.get("http://localhost:1100/submited/userdetails");
      this.users = res.data;
    },
    async test(t) {
      let res = await axios.post(
        "http://localhost:1100/submited/userAnswerdetails",
        { t }
      );
      let b = res.data.Answers[0];
      this.studentName=res.data.Username;
      this.Answers = Object.values(b);
      this.seeresult = false;
      this.kb = true;
    },
    async allquestions() {
      let res = await axios.get("http://localhost:1100/submited/quizdetails");
      this.Question = res.data.q1;
      this.correctAnswer = res.data.q1;
    },
  },
  computed: {
    kk() {
      return this.seeresult;
    },
  },
  beforeMount() {
    this.getQuestions();
    this.allquestions();

    //this.countDownTimer();
    //console.log(this.questions)
  },
};
</script>
