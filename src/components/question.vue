<template>
<div class="mb-3">
    <b>{{j+1}}&nbsp;{{question1}}</b>
  <textarea class="form-control" id="descriptive" rows="3" :placeholder="placeholdertext1" value=""
@blur="handleBlur" :style="[this.addcss1 ?  {'box-shadow': '0px 2px 3px 2px red'} : 'none' ]">


  </textarea>
</div>
</template>
<script>
export default{
data(){
    return{
        answer:'',
        descriptive_data:{},
        answers:'',
        addcss:false,
        placeholdertext:''
        }
},
//get props from backend
props:{
        question1:Object,
        j:Number
    },
  methods: {
    handleBlur(e)
    {
     console.log
     
         this.answer=e.target.value;
     
     if(this.question1.isrequired && this.answer.length<1)
     {
        this.placeholdertext='Answer is required'
        this.addcss=true;
     }
     else{
             
              this.addcss=false;
     }


    this.descriptive_data={[this.question1.question]:this.answer}
    this.$emit("answer",this.descriptive_data)  //send data to parent component within object

    },

    //   handleBlur(e) {
    //   console.log('blur', e.target.value)
    // }
},
computed:{
    addcss1(){
        return this.addcss
    },
    placeholdertext1(){
        return this.placeholdertext;//add dynamic css
    }

}

    
}

</script>
<style scoped>
#descriptive{
    
}
textarea::placeholder{
  color: red;
}


</style>

