<template>
  <div class="container">

      <div class="row" :style="{ display: bar }">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped  bg-danger"
          role="progressbar"
          :style="{ width: [width1],height:'5px'}"
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
          <h5 class="card-title text-center">Simple Quiz Application</h5>
      
          <div class="question  pt-2">
        <div v-for="(name,j) in questions[0]" :Key="j" class="mt-2" ><b>{{j+1}}  {{name.question}}</b>
        <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3 mt-2" id="options"   v-for="(i, k) in name.options" :Key="k"> 
         
          <input type="radio" :name="name.question" v-on:Click="(e)=>test(e,name.question,i,name.answers[0])" :value="i"> <span class="checkmark"></span> <label class="options ml-3">{{i}}</label> 

           </div>
          </div>
      </div>
      <div class="mb-3">

  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" @blur="handleBlur"></textarea>
</div>
      <div class="text-center">
      <button type="button align-middle" class="btn btn-primary mt-2" @click="result">Submit</button>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  Name: "AddQuestion",
  component:{
    question
  },
  data() {
    return {
      questions: [],
      answers: [],
   


marksbody: "none",
      questionsbody: true,
      width: 100,
      marksbody:"none",
      progressbardisplay: "none",
      countDown: 300,//minutes in seconds
      timer: null,
      bar: "block",
      userInput:{},
      marks:0 //set marks initial to 0
     
    };
  },
  methods: {
    /*  make a counter for progress bar */
    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          if(this.countDown==1){
          this.marks=Object.keys(this.userInput).length;
          this.marksbody = "block";
          this.bar = "none";
          this.questionsbody = !this.questionsbody;

          }
      
          if (this.countDown == 1) {
            this.width = "0%";
          } else {
            this.width = Math.floor(this.countDown/3) + "%" //use 1% or 300
          }

          this.countDown -= 1;
          this.countDownTimer();
          if (this.countDown == 0) {
            this.countDown = 30; //set count value to 30
          
          }
        }, 1000);
      }
    },

    async getQuestions() {
      let res = await fetch('http://localhost:3000/q1');
   
      if (res.status == 200){
        let data = await res.json();
          this.questions.push(data);
        } 
        else {
        this.countDown = 0
        this.bar = "none";
        this.questionsbody = !this.questionsbody;
      }
    },

//fuction onclick to question
  test(e,question,answer,cquestion){
  if(answer==cquestion)
  {
  this.userInput={...this.userInput,[question]:answer} //use object Destructuring to store common value;
  }
},
//function on button submit
result(){
          this.marks=Object.keys(this.userInput).length;
          this.marksbody = "block";
          this.bar = "none";
          this.questionsbody = !this.questionsbody;
          }
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
#options{
  margin-left:10px;
}
</style>