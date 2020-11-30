<template>
<div>
    <div style="display:flex; flex-direction: row">
        <el-card class="box-card" style="width:300px;height:200px;text-align: left;">
         <el-form ref="form" :model="AVform"  size="mini" :label-position="labelPosition">
            <el-form-item :label="$t('message.cubatte')">
                 <span v-text="AVform.battrl" style="display:block; width: 200px;">{{$t('message.power')}}</span>
                 <el-button type="primary" icon="el-icon-search" circle size="small" @click="getbattrl"></el-button>
            </el-form-item>
            <el-form-item :label="$t('message.setbattecapct')">
                <el-input  size="small" v-model="AVform.inputbattrl"  style="width:100px" >
                    <template slot="append">mAH</template>
                </el-input>
                <el-button type="primary" icon="el-icon-edit" circle size="small" @click="setbattrl"></el-button>
            </el-form-item>
          </el-form>
    </el-card>

     <el-card class="box-card" style="width:300px;height:200px;text-align: left;float:left">
         <el-form ref="form" :model="AVform"  size="mini" :label-position="labelPosition">
            
            <el-form-item :label="$t('message.matchcurrent')">
                <el-input  size="small" v-model="AVform.inputa"  style="width:100px" :min="0" :max="55000000" >
                    <template slot="append">mA</template>
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('message.currentcurrent')">
                 <span v-text="AVform.a" style="display:block; width: 200px;"></span>
                 <el-button type="primary"  size="small" @click="seta"> {{$t('message.match')}}</el-button>
            </el-form-item>
          </el-form>
    </el-card>
    </div>

     <div style="display:flex; flex-direction: row">
        <el-card class="box-card" style="width:300px;height:200px;text-align: left;">
         <el-form ref="form" :model="AVform"  size="mini">
            <el-form-item :label="$t('message.detcttotalV')">
                <el-switch v-model="AVform.switch"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('message.matchV')">
                <el-input :disabled="AVform.switch==false?true:false"   size="small" v-model="AVform.inputv"  style="width:100px" >
                    <template slot="append">mV</template>
                </el-input>
            </el-form-item>
             <el-form-item :label="$t('message.currentV')">
                 <span v-text="AVform.v" style="display:block; width: 200px;"></span>
                 <el-button type="primary"  size="small" @click="setv"> {{$t('message.match')}}</el-button>
            </el-form-item>
          </el-form>
    </el-card>

     <el-card class="box-card" style="width:300px;height:200px;text-align: left;float:left">
         <el-form ref="form" :model="AVform"  size="mini" >
            <el-form-item :label="$t('message.currentVrange')">
                 <span v-text="AVform.vrange" style="display:block; width: 200px;"></span>
            </el-form-item>
            <el-form-item :label="$t('message.currentArange')">
               <span v-text="AVform.arange" style="display:block; width: 200px;"></span>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" size="small" @click="getrange">{{$t('message.readrange')}}</el-button>
            </el-form-item>
          </el-form>
    </el-card>
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
    watch:{
			// Vswitch(newVal) {
      //     this.$i18n.locale = this.langs;  
      //     this.$emit('change', newVal)    
      // },
		},
  data() {
    return {
     AVform:{
          battrl:'未读取',
          xinnum:'未读取',
          tempnum:'未读取',
          inputbattrl:'',
          switch:true,
          a:'',
          v:'',
          vrange:'',
          arange:''
        },
        labelPosition:'top',
        // Vswitch:''
    };
  },
  beforeDestroy(){
    console.log("Destroy")
    clearInterval(this.lunxun)
  },
  created(){
    this.lunxun = setInterval(this.getav,1000)
    this.$emit('addlunxun',this.lunxun)
  },
  methods: {
   
    getav(){
       this.$axios.get('/getav?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.AVform.a=response.data.data.a;
         this.AVform.v=response.data.data.v;
         if(response.data.data.v  == "0V"){
           if(this.$i18n.locale == 'cn')
            this.AVform.v = "不检测总电压"
          else
            this.AVform.v = "NO DETET"
         }
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })

      
    },
    read() {
      console.log("submit!");
    },
    set() {
      console.log("submit!");
    },
    getbattrl(){
        this.$axios.get('/getbattrl?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.AVform.battrl=response.data.data.rongliang;
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })
    },
    getrange(){
        this.$axios.get('/getbattlc?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
        
         this.AVform.arange=response.data.data.arange;
        if(response.data.data.vrange == "0V") {
          if(this.$i18n.locale == 'cn')
            this.AVform.vrange = "不检测总电压"
          else
            this.AVform.vrange = "NO DETET"
        }else{
            this.AVform.vrange=response.data.data.vrange;
        }
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })
    },
    setbattrl(){
       if(this.AVform.inputbattrl*1 >1100000 || this.AVform.inputbattrl*1 < 0){
          this.$message("参数范围为0-1100000");
          return
        }
      var data = {
        userId: this.userid,
        rongliang: this.AVform.inputbattrl
      }
      data = JSON.stringify(data)
       this.$axios.post('/setbattrl',data)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.$message(response.data.msg);
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })
    },
    seta(){
       if(this.AVform.inputa*1 >55000000 || this.AVform.inputa*1 < 0){
          this.$message("参数范围为0-55000000");
          return
        }
      var data = {
        userId: this.userid,
        a: this.AVform.inputa,
      }
      data = JSON.stringify(data)
       this.$axios.post('/seta',data)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.$message(response.data.msg);
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })
    },
    setv(){
      
      if(this.AVform.switch == false)
        this.AVform.inputv=0
      if(this.AVform.inputv*1 >65000000 || this.AVform.inputv*1 < 0){
          this.$message("参数范围为0-65000000");
          return
        }
      var data = {
        userId: this.userid,
        v: this.AVform.inputv,
      }
      data = JSON.stringify(data)
       this.$axios.post('/setv',data)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.$message(response.data.msg);
      })
       //获取失败
      .catch(error=>{
        console.log(error);
         this.$message("设备离线");
      })
    }

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
.box-card{
    margin-right: 10px;
    margin-bottom: 10px;
}


</style>