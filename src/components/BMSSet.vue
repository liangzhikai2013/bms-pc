<template>
<div>
 <el-form ref="form" :model="BMSform" label-width="100px"  id="BMSSetform" :label-position="labelPosition">
            <el-form-item :label="$t('message.bmsparams')">
                <span style="display: block;width: 200px;">{{$t('message.setvalue')}}</span>
                <span>{{$t('message.currentvalue')}}</span>
            </el-form-item>

            <el-form-item :label="$t('message.chargLimV')">
                <el-input size="small" v-model="BMSform.chargLimV"></el-input>
                <span v-text="BMSNow.chargLimV"></span>
               
            </el-form-item>
            <el-form-item :label="$t('message.equaOpenV')">
                <el-input  size="small" v-model="BMSform.equaOpenV"></el-input>
                <span v-text="BMSNow.equaOpenV"></span>
            </el-form-item>
            <el-form-item :label="$t('message.openChargV')">
                <el-input size="small"  v-model="BMSform.openChargV"></el-input>
              <span v-text="BMSNow.openChargV"></span>
            </el-form-item>
            <el-form-item :label="$t('message.openDChargV')">
                <el-input size="small" v-model="BMSform.openDChargV"></el-input>
              <span v-text="BMSNow.openDChargV"></span>
            </el-form-item>
            <el-form-item :label="$t('message.DchargLimV')">
                <el-input size="small" v-model="BMSform.DchargLimV"></el-input>
              <span v-text="BMSNow.DchargLimV"></span>
            </el-form-item>
            <el-form-item :label="$t('message.hTemper')">
                <el-input size="small" v-model="BMSform.hTemper"></el-input>
              <span v-text="BMSNow.hTemper"></span>
            </el-form-item>
            <el-form-item :label="$t('message.lTemper')">
                <el-input size="small" v-model="BMSform.lTemper"></el-input>
              <span v-text="BMSNow.lTemper"></span>
            </el-form-item>
            <el-form-item :label="$t('message.SOC')">
                <el-input size="small" v-model="BMSform.SOC"></el-input>
              <span v-text="BMSNow.SOC"></span>
            </el-form-item>
            <el-form-item :label="$t('message.BICNum')">
                <el-input size="small" v-model="BMSform.BICNum"></el-input>
              <span v-text="BMSNow.BICNum"></span>
            </el-form-item>
            <el-form-item :label="$t('message.commun')">
                <el-input size="small" v-model="BMSform.commun"></el-input>
              <span v-text="BMSNow.commun"></span>
            </el-form-item>
           
          </el-form>
          <div style="margin-top:20px">
            <el-button type="warning" size="small"  @click="read">{{$t('message.readparam')}}</el-button>
            <el-button type="danger" size="small" style="margin-left:50px"  @click="set">{{$t('message.setparam')}}</el-button>
          </div>
           
</div>
    
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
     
     BMSNow:{
          chargLimV:window.vm.$t('message.unread'),
          equaOpenV:window.vm.$t('message.unread'),
          openChargV:window.vm.$t('message.unread'),
          openDChargV:window.vm.$t('message.unread'),
          DchargLimV:window.vm.$t('message.unread'),
          hTemper:window.vm.$t('message.unread'),
          lTemper:window.vm.$t('message.unread'),
          SOC:window.vm.$t('message.unread'),
          BICNum:window.vm.$t('message.unread'),
          commun:window.vm.$t('message.unread'),
        },
        BMSform:{
          chargLimV:"",
          equaOpenV:"",
          openChargV:"",
          openDChargV:"",
          DchargLimV:"",
          hTemper:"",
          lTemper:"",
          SOC:"",
          BICNum:"",
          commun:"",
        },
        labelPosition:'left',
    };
  },
  methods: {
    read() {
      console.log("submit!");
       this.$axios.get('/getbmsparam?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.BMSNow.chargLimV=response.data.data[0].nowNumber;
         this.BMSform.chargLimV=response.data.data[0].nowNumber.replace("mV", "");

         this.BMSNow.equaOpenV=response.data.data[1].nowNumber;
         this.BMSform.equaOpenV=response.data.data[1].nowNumber.replace("mV", "");

         this.BMSNow.openChargV=response.data.data[2].nowNumber;
         this.BMSform.openChargV=response.data.data[2].nowNumber.replace("mV", "");

         this.BMSNow.openDChargV=response.data.data[3].nowNumber;
         this.BMSform.openDChargV=response.data.data[3].nowNumber.replace("mV", "");

         this.BMSNow.DchargLimV=response.data.data[4].nowNumber;
         this.BMSform.DchargLimV=response.data.data[4].nowNumber.replace("mV", "");

         this.BMSNow.hTemper=response.data.data[5].nowNumber;
         this.BMSform.hTemper=response.data.data[5].nowNumber.replace("℃", "");

         this.BMSNow.lTemper=response.data.data[6].nowNumber;
         this.BMSform.lTemper=response.data.data[6].nowNumber.replace("℃", "");

         this.BMSNow.SOC=response.data.data[7].nowNumber;
         this.BMSform.SOC=response.data.data[7].nowNumber;
         if (response.data.data[7].nowNumber == "是"){
           this.BMSNow.SOC = response.data.data[7].nowNumber
           this.BMSform.SOC = 1
          }
          else{
            this.BMSNow.SOC = response.data.data[7].nowNumber
            this.BMSform.SOC = 0
          }
         this.BMSNow.BICNum=response.data.data[8].nowNumber;
         this.BMSform.BICNum=response.data.data[8].nowNumber.replace("个", "");

         this.BMSNow.commun=response.data.data[9].nowNumber;
         this.BMSform.commun=response.data.data[9].nowNumber.replace("秒", "");
      })
       //获取失败
      .catch(error=>{
        console.log(error);
       this.$message("设备离线");
      })
    },
    set() {
      console.log("submit!");
       var data = {
        userId: this.userid,
        chargLimV: this.BMSform.chargLimV,
        equaOpenV:this.BMSform.equaOpenV,
        openChargV: this.BMSform.openChargV,
        openDChargV: this.BMSform.openDChargV,
        DchargLimV: this.BMSform.DchargLimV,
        hTemper: this.BMSform.hTemper,
        lTemper: this.BMSform.lTemper,
        SOC: this.BMSform.SOC,
        BICNum: this.BMSform.BICNum,
        commun: this.BMSform.commun,
      }
      data = JSON.stringify(data)
       this.$axios.post('/setbmsparam',data)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
        this.$message(response.data.msg);
      })
       .catch(error=>{
        console.log(error);
        this.$message("设备离线");
      })

    },
  },
};
</script>
<style lang="less">
// #BMSform{
//   /deep/ span{
//     display:block; 
//     width: 178px;
//     text-align: left;
//   }
// }
.el-form-item__content{
    display: flex;
    justify-content: space-between;;
}
.el-form-item__content span{
   display: block;
   width: 42px;
}
.el-input--small{
    width: 200px !important;
}
#BMSSetform{
    height: 330px;
    overflow: hidden;
   padding: 0 40px;
   overflow-y:auto;
}

</style>