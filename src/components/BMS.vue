<template>
     <el-form ref="form" :model="BMSform" label-width="160px" :inline="true" id="BMSform" :label-position="labelPosition" >
            <el-form-item :label="$t('message.power')">
              <span v-text="BMSform.remainEle"></span>
              <!-- <el-input v-model="BMSform.remainEle"></el-input> -->
            </el-form-item>
             <el-form-item :label="$t('message.fpower')">
              <span v-text="BMSform.power"></span>
            </el-form-item>

             <el-form-item :label="$t('message.fa')">
              <span v-text="BMSform.current"></span>
            </el-form-item>
            <el-form-item :label="$t('message.ftotlev')">
              <span v-text="BMSform.tVoltage"></span>
            </el-form-item>


            <el-form-item :label="$t('message.highcellv')">
              <span v-text="BMSform.hVoltage"></span>
            </el-form-item>
            <el-form-item :label="$t('message.lowcellv')">
              <span v-text="BMSform.lVoltage"></span>
            </el-form-item>
           
            <el-form-item :label="$t('message.fhighcelltemp')">
              <span v-text="BMSform.hTemper"></span>
            </el-form-item>
            <el-form-item :label="$t('message.flowcelltemp')">
              <span v-text="BMSform.lTemper"></span>
            </el-form-item>
            
           
            <el-form-item :label="$t('message.fchargingcontrol')">
              <span v-text="BMSform.cControl"></span>
            </el-form-item>
            <el-form-item :label="$t('message.fdchargingcontrol')">
              <span v-text="BMSform.dControl"></span>
            </el-form-item>
           
            <el-form-item :label="$t('message.fhighBICtemp')">
              <span v-text="BMSform.hBICTemper"></span>
            </el-form-item>
             <el-form-item :label="$t('message.fBMCtemp')">
              <span v-text="BMSform.BMCTemper"></span>
            </el-form-item>
             <el-form-item :label="$t('message.fBICComQualt')" style="float: left;margin-left: 34px;" label-width="200px">
              <span v-text="BMSform.BICCommun"></span>
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
     BMSform:{
          remainEle:window.vm.$t('message.unread'),
          hVoltage:window.vm.$t('message.unread'),
          lVoltage:window.vm.$t('message.unread'),
          power:window.vm.$t('message.unread'),
          current:window.vm.$t('message.unread'),
          tVoltage:window.vm.$t('message.unread'),
          cControl:window.vm.$t('message.unread'),
          dControl:window.vm.$t('message.unread'),
          hTemper:window.vm.$t('message.unread'),
          lTemper:window.vm.$t('message.unread'),
          hBICTemper:window.vm.$t('message.unread'),
          BMCTemper:window.vm.$t('message.unread'),
          BICCommun:window.vm.$t('message.unread'),
        },
        labelPosition:'right',
        lunxun:'',
        limitparam:''
    };
  },
  created(){
    console.log("created")
    this.lunxun = setInterval(this.read,1000)
    this.$emit('addlunxun',this.lunxun)
     this.$axios.get('/getbmssetparam?userId='+this.userid) .then(response=>{
       this.limitparam = response.data.data;
     })
  },

  beforeDestroy(){
    console.log("Destroy")
    clearInterval(this.lunxun)
  },
  
  methods: {
    read() {
      console.log("submit1!");
      this.$axios.get('/getbmsstate?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.BMSform=response.data.data;
         console.log(response.data.data)
        
         console.log(response.data.data.hVoltage.slice(0,5)*1000)
         var notice=''
         this.$emit('getnotice',notice)
         if(response.data.data.hVoltage.slice(0,5)*1000 > this.limitparam.chargLimV){
           this.$emit('getnotice',notice+"最高单体电压，超过充电限制电压！The max cell voltage exceeds the max limit voltage <br>")
         }
         if(response.data.data.lVoltage.slice(0,5)*1000 < this.limitparam.DchargLimV){
           this.$emit('getnotice',notice+"最低单体电压，低于放电限制电压！The min cell voltage below the min limit voltage！<br>")
         }
        if(response.data.data.hTemper.slice(0,5)*1000 > this.limitparam.hTemper){
          this.$emit('getnotice',notice+"最高单体温度，超过高温保护值！The max temp exceeds the max temp limit！<br>")
        }
        if(response.data.data.lTemper.slice(0,5)*1000 < this.limitparam.lTemper){
          this.$emit('getnotice',notice+"最低单体温度，低于低温保护值！The min temp  below the min temp limit ！<br>")
        }
        if(response.data.data.BICCommun == 'FAIL'){
          this.$emit('getnotice',notice+"通信质量为故障！（一般和良好不需要提示）Communication failure！")
        }
        //  if(response.data.data.hTemper == '未配置传感器'){}
      })
      

    },
    set() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="less">
#BMSform{
  /deep/ span{
    display:block; 
    width: 88px;
    text-align: left;
  }
}
</style>