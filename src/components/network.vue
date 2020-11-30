<template>
    <div style=" margin: 0 130px;">
         <el-form ref="form" :model="network"  size="mini" >
            <el-form-item label="连接WIFI的名称">
                 <el-input  size="small" v-model="network.wifiname"  style="width:100px" >
                </el-input>
            </el-form-item>
            <el-form-item label="连接WIFI的密码">
                <el-input  size="small" v-model="network.wifipwd"  style="width:100px" >
                </el-input>
            </el-form-item>
          </el-form>
           <el-button type="primary" size="small" @click="set">保存网络</el-button>
           <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <span>这里用于修改当前BMS发射的SSID(WIFI名称)和连接密码，防止第三方利用默认密码恶意登陆BMS。<br>This is used to modify the SSID (WiFi name) and connection password of the current BMS, so as to prevent the third party from using the default password to login the BMS maliciously.
            <br><br> <b>注意:</b>在WIFI直连模式下连接的本软件，允许在这里调整。如果是网络模式下连接的本应用软件，请不要在这里更改设定，必须用专门的方式调整。<br>The software connected in WiFi direct connection mode is allowed to be adjusted here. If the application software is connected in network mode, please do not change the setting here, it must be adjusted in a special way.</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
     network:{
          wifiname:'',
          wifipwd:'',
          
        },
      dialogVisible:true  
    };
  },
  methods: {
    read() {
      console.log("submit!");
    },
    set() {
       var data = {
        userId: this.userid,
        wifiname: this.network.wifiname,
        wifipwd:this.network.wifipwd,
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
.el-dialog__body{
  text-align: left;
}


</style>