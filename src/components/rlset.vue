<template>
  <el-form :inline="true" :model="rlform" class="demo-form-inline">
    <el-form-item :label="$t('message.capacityinfo')">
      <span  v-text="rlform.testinfo" id="rlspan"></span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="read">{{$t('message.read')}}</el-button>
    </el-form-item>

     <el-form-item :label="$t('message.setinit')">
      <el-input v-model="rlform.set" placeholder="">
           <template slot="append">mAH </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="set">{{$t('message.set')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
   props: {
			userid: {
        type: String,
				required: true,
			},
    },
  data() {
    return {
      rlform: {
        testinfo: "20",
        region: "",
      },
    };
  },
  methods: {
    PrefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    },
    read() {
      console.log("submit!");
      this.$axios.get('/getrongliang?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.rlform.testinfo=response.data.data.rongliang;
      })
       //获取失败
      .catch(error=>{
        console.log(error);
        this.$message("设备离线");
      })

    },
    set() {
      console.log("submit!");
      var rongliang = this.PrefixInteger(this.rlform.set, 7);
       this.$axios.get('/setrongliang?userId='+this.userid+ '&rongliang=' + rongliang)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
        //  this.rlform.testinfo=response.data.data;
      })
       //获取失败
      .catch(error=>{
        console.log(error);
        this.$message("设备离线");
      })
    },
  },
};
</script>
<style lang="less">
#rlspan{
    display:block; 
    width: 235px;
    text-align: left;
  }
</style>
