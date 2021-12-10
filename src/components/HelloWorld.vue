<template>
  <div>
    <h1>hello</h1>
    <div id="barHolder">
      <div id="bar" :style="{ width: width }">{{ width1 }}</div>
    </div>
    <div type="button" id="by10" @click="move">{{ width1 }}</div>
  </div>
</template>

<script>
export default {
  Name: "HelloWorld",
  data() {
    return {
      width: 0,
      width1: 0,
    };
  },
  watch: {
   width1:{
      immediate:true,
      handler(){
        console.log("here")
        this.counterFun()
      }
   }
  },

  methods: {
    test() {
      let t = 7;
      console.log(t);
    },
    async counterFun(){
        let t = 10;

        for (let i = 0; i < 9; i++) {
          setTimeout(function () {
            this.width = i * t + "%";
            this.width = this.width.toString();
          }, i * 1000);
          
        }
    }
  },

  beforeMount() {
    //console.log('hello');
  },
};
</script>







<style scoped>
#barHolder {
  background-color: rgb(250, 248, 248);
  width: 100%;
  height: 80px;
}
#bar {
  background-color: red;
  width: 0%;
  height: 80px;
}
#by10 {
  background-color: grey;
  height: 40px;
  width: 100px;
  border-radius: 5px;
  margin-top: 10px;
  padding-top: 10px;
  text-align: center;
  cursor: pointer;
}
</style>
