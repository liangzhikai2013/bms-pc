<template>
<div>
 <el-form ref="form" :model="BICSetform" label-width="160px"  id="BICSetform" :label-position="labelPosition">
            <el-form-item :label="$t('message.collectorparam')">
                <span style="display: block;width: 200px;">{{$t('message.newset')}}</span>
                <span>{{$t('message.currentvalue')}}</span>
            </el-form-item>

            <el-form-item :label="$t('message.slaveaddress')">
                <el-input size="small" v-model="BICSetform.address"></el-input>
                <span v-text="BICNow.address"></span>
               
            </el-form-item>
            <el-form-item :label="$t('message.unitcellnum')">
                <el-input  size="small" v-model="BICSetform.xinnum"></el-input>
                <span v-text="BICNow.xinnum"></span>
            </el-form-item>
            <el-form-item :label="$t('message.tempsensornum')">
                <el-input size="small"  v-model="BICSetform.tempnum"></el-input>
              <span v-text="BICNow.tempnum"></span>
            </el-form-item>
          
          </el-form>
          <div style="margin-top:20px">
            <el-button type="warning" size="small" @click="read">{{$t('message.readparam')}}</el-button>
            <el-button type="danger" size="small"  @click="set" style="margin-left:50px">{{$t('message.setparam')}}</el-button>
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
  created(){
    console.log(window.vm.$t('message.unread'))
    // this.BICSetform.address = window.vm.$t('message.unread')
    //  this.BICSetform.xinnum = this.$i18n.message.unread
    //   this.BICSetform.tempnum = this.$i18n.message.unread
  },
  data() {
    return {
        BICNow:{
          address:window.vm.$t('message.unread'),
          xinnum:window.vm.$t('message.unread'),
          tempnum:window.vm.$t('message.unread'),
        },
        BICSetform:{
          address:'',
          xinnum:'',
          tempnum:'',
        },
        labelPosition:'left',
    };
  },
  methods: {
    read() {
      this.$axios.get('/getbicparam?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
        this.BICSetform = response.data.data
        this.BICSetform.address = response.data.data.address *1
        // this.BICSetform.address =  this.BICSetform.address 
        this.BICNow.address = response.data.data.address+"#"
        this.BICNow.xinnum = response.data.data.xinnum+" "
        this.BICNow.tempnum = response.data.data.tempnum+" "
      })
       .catch(error=>{
        console.log(error);
       this.$message("设备离线");
      })
      
    },
    set() {
      var address=''
      if(this.BICSetform.address<10)  address = '0'+this.BICSetform.address
      else address = this.BICSetform.address
      var data = {
        userId: this.userid,
        address:address,
        xinnum: this.BICSetform.xinnum,
        tempnum:this.BICSetform.tempnum,
      }
      data = JSON.stringify(data)
      this.$axios.post('/setbicparam',data)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
       this.$message(response.data.msg);
      })
       .catch(error=>{
        console.log(error);
       this.$message("设备离线");
      })
      console.log("submit!");
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
#BICSetform{
    height: 330px;
    overflow: hidden;
   padding: 0 40px;
   overflow-y:auto;
}

</style>