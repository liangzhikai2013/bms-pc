<template>
  <div>
    <img alt="Vue logo" src="../assets/background.png" class="background" />
    <!-- <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
                中英文切换
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cn">中文</el-dropdown-item>
            <el-dropdown-item command="en">英文</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <div class="language">
      <el-radio v-model="langs" label="cn">中文</el-radio>
      <el-radio v-model="langs" label="en">English</el-radio>
    </div>
      <div style="width: 90px;height: 25px;font-size: 12px;top: 10px;
    position: absolute;
    left: 10px;">
        TX:<span class="layui-badge-dot " style="margin-top: 9px;margin-left: 9px;" id="TX"></span>
      </div>
      <div  style="width: 90px;height: 25px;font-size: 12px;position: absolute;
    top: 10px;
    left: 70px;">
        RX:<span class="layui-badge-dot layui-bg-green"  style="margin-top: 9px;margin-left: 9px;" id="RX"></span>
    </div>

     <div  style="width: 150px;height: 25px;font-size: 12px;position: absolute;
    top: 10px;
    left: 130px;">
        当前连接:{{userid}}
    </div>

     <div  style="width: 600px;height: 25px;font-size: 12px;position: absolute;color: red;
    font-weight: 900;
    top: 10px;
    left: 230px;" v-html="notice">
        提示:
    </div>
    


    <div class="content">
      <div v-if="paramcheck">
        <h2>{{ $t("message.parmacheck") }}</h2>
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          style="height: 400px;"
        >
          <el-tab-pane :label="$t('message.bmshost')" name="bms">
            <bms v-if="activeName == 'bms'" v-bind:userid="userid" @getnotice="getnotice"></bms>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.bmsslave')" name="bic">
            <bic v-if="activeName == 'bic'" v-bind:userid="userid"></bic>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.runparam')" name="runparam">
            <runparam
              v-if="activeName == 'runparam'"
              v-bind:userid="userid"
            ></runparam>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.capacityset')" name="rlset">
            <rlset v-if="activeName == 'rlset'" v-bind:userid="userid"></rlset>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="paramset">
        <h2>{{ $t("message.parmaset") }}</h2>
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          style="height: 400px;"
        >
          <el-tab-pane :label="$t('message.bmshost')" name="bmsset">
            <bmsset v-if="activeName == 'bmsset'" v-bind:userid="userid"></bmsset>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.bmsslave')" name="bicset">
            <bicset v-if="activeName == 'bicset'" v-bind:userid="userid"></bicset>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.totleVE')" name="totelav">
            <totelav v-if="activeName == 'totelav'" v-bind:userid="userid"></totelav>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.networkparam')" name="network">
            <network v-if="activeName == 'network'" v-bind:userid="userid"></network>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="connect">
      <div style="margin:20px">
        <!-- <el-input v-model="input" placeholder="请输入IP"></el-input> -->
        <el-button type="primary" @click="clickLinkDevice">{{
          $t("message.linkdevice")
        }}</el-button>
        <el-button type="warning" @click="clickdebug">{{ $t("message.debugmode") }}</el-button>
        <!-- <el-button type="danger">{{$t('message.settings')}}</el-button> -->
        <!-- <el-button type="primary">参数查看</el-button>
      <el-button type="success">参数设定</el-button> -->

        <el-checkbox v-model="checked" class="checkbox-div">
          <span  @click="introdebugdialogVisible = true">
            {{ $t("message.readinstructions") }}</span
          >
        </el-checkbox>
      </div>
    </div>
    <div class="notice">
      <h4>{{ $t("message.messagecenter") }}</h4>
      <div class="notice-content">
        <span>{{message}}</span>
         <el-button type="primary" icon="el-icon-refresh" circle  size="mini" style="position: absolute;
    top: 20px;
    right: 20px;" @click="refresh"></el-button>
        <iframe id="notify" scrolling=auto src="http://www.iddzz.com/message/BMS_software_message.htm" style="background: white;width: 100%;
    height: 100%;"></iframe>
        <!-- <span>● 少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        <span>● 少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        <span>● 少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        <span>● 少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span> -->
      </div>
    </div>

    <el-dialog
      :title="$t('message.linkdevice')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="form"
        :model="networkDialog"
        size="mini"
        label-width="100px"
      >
        <el-form-item :label="$t('message.deviceIP')">
         
             <el-select size="small" v-model="userid" :placeholder="$t('message.seledevice')" class="devicelist">
               <template v-for = "item in device" >
                 <el-option
                  v-if="(item.time/60)<5"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id"
                  >
                  <span style="float: left">{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 50px;">{{ (item.time/60).toFixed(2) }}分钟前</span>
                </el-option>
              </template>
                
              </el-select>
        
        </el-form-item>
        <!-- <el-form-item :label="$t('message.devicePort')">
                <el-input  size="small" v-model="networkDialog.port"  style="width:100px" >
                </el-input>
            </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">{{
          $t("message.cancel")
        }}</el-button> -->
        <el-button type="primary" @click="paramCheck">{{
          $t("message.parmacheck")
        }}</el-button>
        <el-button type="danger" @click="paramSet">{{
          $t("message.parmaset")
        }}</el-button>
      </span>
    </el-dialog>


     <el-dialog
      :title="$t('message.debugmode')"
      :visible.sync="debugdialogVisible"
      width="80%"
      style="padding: 10px 20px;"
    >
      <el-form
        ref="form"
        :model="networkDialog"
        size="mini"
        label-width="40px"
      >
       <el-form-item label="ID:" >
         <el-select size="small" v-model="userid" :placeholder="$t('message.seledevice')" style="width:830px"  class="devicelist">
                <template v-for = "item in device" >
                 <el-option
                  v-if="(item.time/60)<5"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id"
                  >
                  <span style="float: left">{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 50px;">{{ (item.time/60).toFixed(2) }}分钟前</span>
                </el-option>
              </template>
              </el-select>
        </el-form-item>

        <el-form-item label="Cmd:">
          <el-input v-model="cmd"  style="width:830px;text-align: left;" class="cmd">
          </el-input>
          
        </el-form-item>
         <el-form-item label="Res:">
           <el-input v-model="res"  type="textarea" style="width:830px;"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('message.devicePort')">
                <el-input  size="small" v-model="networkDialog.port"  style="width:100px" >
                </el-input>
            </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="debugdialogVisible = false">{{
          $t("message.cancel")
        }}</el-button> -->

        <el-button @click="res = ''">{{
          $t("message.clearres")
        }}</el-button>

        <el-button type="primary" @click="debugsend">{{
          $t("message.send")
        }}</el-button>
       
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('message.usersnotice')"
      :visible.sync="introdebugdialogVisible"
      width="80%"
      
    >
     <!-- <iframe id="show-iframe" scrolling=auto src="http://www.iddzz.com/xieyi/yunfuwuxieyi.htm" style="background: white;width: 100%;
    height: 300px;"></iframe> -->
    <div style="    height: 150px;
    font-size: 14px;
    line-height: 30px;">{{
          $t("message.xieyi")
        }}</div>
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="introdebugdialogVisible = false">{{
          $t("message.cancel")
        }}</el-button>
       
      </span> -->
    </el-dialog>
    
  </div>
</template>

<script>
// import BIC from '@/components/BIC'
// import BMS from '@/components/BMS'
// import BMSSet from '@/components/BMSSet'
// import runParam from '@/components/runParam'
// import rlset from '@/components/rlset'
// import BICSet from '@/components/BICSet'
// import totelAV from '@/components/totelAV'
// import network from '@/components/network'
import $ from 'jquery';
export default {
  components: {
    // BIC,
    // runParam,
    // rlset,
    // BMS,
    // BMSSet,
    // BICSet,
    // totelAV,
    // network,
  },
  name: "HelloWorld",
  data() {
    return {
      input: "",
      checked: "",
      tabPosition: "left",
      paramcheck: false,
      paramset: false,
      dialogVisible: false,
      debugdialogVisible:false,
      networkDialog: {},
      langs: "cn",
      userid: "",
      activeName: "bms",
      cmd:'',
      res:'',
      message:'',
      device:[],
      introdebugdialogVisible:false,
      deviceID:'',
      notice:'',
      lunxun:[]
    };
  },
  props: {
    msg: String,
  },
  created(){
    var that = this
    //获取设备
    
    this.gerDevices()
    // this.userid = window.localStorage.getItem('userid')
    this.$axios.interceptors.request.use(function(config){
       $("#TX").fadeOut(100).fadeIn(100); 
      return config
    }
        
      )
    this.$axios.interceptors.response.use(
        function(res){
             $("#RX").fadeOut(100).fadeIn(100); 
            return res
        }
      )
    
      $.ajax({
                type: 'get',
                dataType: "jsonp",//支持跨域
                jsonp: "callback",
                jsonpCallback: "flightHandler",
                url: 'http://www.iddzz.com/message/BMS_software_message.htm',
                // async: true,
                success: function (data) {
                  console.log(data)
                 that.message = data
                }
             });                
//     this.$axios
//         .get("http://www.iddzz.com/message/BMS_software_message.htm", {
  
//   headers: {'Access-Control-Allow-Origin':'*','Referer':'www.iddzz.com','Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'}//设置header信息
// })
//         //then获取成功；response成功后的返回值（对象）
//         .then((response) => {
//           console.log(response);
//           this.message = response
//         })
//         //获取失败
//         .catch((error) => {
//           console.log(error);
//           // this.$message("设备离线");
//           this.$message("error");
//         });
  },
  methods: {
    // this.$emit('addlunxun',this.lunxun)
    addlunxun(data){
      this.lunxun.push(data);
    },
    getnotice(data){
      this.notice = data
      //  this.notice = "注意：最高单体电压，超过充电限制电压！The max cell voltage exceeds the max limit voltage<br>&emsp;&emsp;&emsp;最高单体电压，超过充电限制电压！The max cell voltage exceeds the max limit voltage"
    },
    refresh(){
      document.getElementById('notify').src='http://www.iddzz.com/message/BMS_software_message.htm';
    },
    clickdebug(){
      if(!this.checked){
        this.$message("请您同意本系统使用协议");
        return
      }
      this.debugdialogVisible = true
    },
    clickLinkDevice(){
      if(!this.checked){
        this.$message("请您同意本系统使用协议");
        return
      }
      this.dialogVisible = true;
      this.gerDevices()
    },
    gerDevices(){
       this.$axios
        .get("/getdevice")
        //then获取成功；response成功后的返回值（对象）
        .then((response) => {
          console.log(response);
          this.device = response.data.data
          // this.device = [ {id: "B64088", time: 8.672}, {id: "B64088", time: 8.672}]
        })
        //获取失败
        .catch((error) => {
          console.log(error);
          // this.$message("设备离线");
          this.$message("error");
        });
    },
    debugsend(){
      
       this.$axios
        .get("/debug?userId=" + this.userid +'&cmd='+this.cmd)
        //then获取成功；response成功后的返回值（对象）
        .then((response) => {
          console.log(response);
          this.res = this.res + '' +response.data.data.res
        })
        //获取失败
        .catch((error) => {
          console.log(error);
          // this.$message("设备离线");
          this.$message("error");
        });

    },
    async paramCheck() {
      // this.paramcheck = true;
      // this.paramset = false;
      console.log(this.userid)
      if(this.userid==''){
        this.$message("请选择设备");
        return
      }
      window.localStorage.setItem('userid',this.userid)
      if(!this.checked){
        this.$message("请您同意本系统使用协议");
        return
      }
       for (var i = this.lunxun.length - 1; i >= 0; i--) {
            // if (typeof array[i] !== 'undefined') {
                clearInterval(this.lunxun[i]);
            // };
        }
      //test
        // this.paramcheck = true;
        //     this.paramset = false;
        //     this.dialogVisible = false;
      //test

      //  this.$message("正在获取数据");
      this.$axios
        .get("/getbmsstate?userId=" + this.userid)
        //then获取成功；response成功后的返回值（对象）
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {

            this.paramcheck = true;
            this.paramset = false;
            this.dialogVisible = false;
          } else {
            this.$message("未能读取参数");
          }
        })
        //获取失败
        .catch((error) => {
          console.log(error);
          // this.$message("设备离线");
          this.$message("未能读取参数");
        });
    },
    paramSet() {
      if(this.userid==''){
        this.$message("请选择设备");
        return
      }
      window.localStorage.setItem('userid',this.userid)
      if(!this.checked){
        this.$message("请您同意本系统使用协议");
        return
      }
      this.$message("正在获取数据");
       for (var i = this.lunxun.length - 1; i >= 0; i--) {
            // if (typeof array[i] !== 'undefined') {
                clearInterval(this.lunxun[i])
            // };
        }
      this.$axios
        .get("/getcanset?userId=" + this.userid)
        //then获取成功；response成功后的返回值（对象）
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.paramcheck = false;
            this.paramset = true;
            this.dialogVisible = false;
            this.activeName="bmsset"
          } else {
            this.$message("未能读取参数");
          }
        })
        //获取失败
        .catch((error) => {
          console.log(error);
          // this.$message("设备离线");
          this.$message("未能读取参数");
        });
    },
  },
  watch: {
    langs(newVal) {
      this.$i18n.locale = this.langs;
      this.$emit("change", newVal);
    },
    userid(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.background {
  width: 1140px;
  height: 571px;
}
.content {
  position: absolute;
  left: 40px;
  top: 40px;
  width: 773px;
  height: 493px;
  background-color: rgba(0, 0, 0, 0.6);
}
.connect {
  position: absolute;
  left: 850px;
  top: 40px;
  width: 250px;
  height: 202px;
  background-color: rgba(0, 0, 0, 0.6);
}
.notice {
  position: absolute;
  left: 850px;
  top: 280px;
  width: 250px;
  height: 254px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
}

.checkbox-div {
  margin-top: 20px;
  /deep/ .el-checkbox__label {
    word-break: normal;
    width: auto;
    display: inline-grid;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    line-height: 14px;
    width: 80%;
    text-align: left;
  }
}
.connect {
  /deep/ input {
    width: 100%;
    margin: 10px 0;
    margin-top: 0;
  }
}
.connect button {
  width: 100%;
  margin: 5px 5px;
  //  margin-top: 5px;
}
.notice-content {
  margin: 15px;
  font-size: 10px;
  text-align: left;
  overflow: hidden;
  height: 160px;
  overflow-y: auto;
}
.notice-content span {
  display: inline-block;
  margin-bottom: 5px;
}
.language {
  position: absolute;
  left: 850px;
  top: 10px;
  width: 200px;
}
.layui-badge-dot {
  display: block;
    background: #f00;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    top: -4px;
    right: 22px;
    position: absolute;
}

</style>
<style >
textarea{
  min-height: 270px;
}
.el-dialog{
  margin-top: 5vh !important;
}
.el-icon-close:before {
    content: "\e60f";
    color: white;
}
.el-dialog__body {
    padding: 0px 20px;
}
.el-dialog__footer {
    padding: 10px;
    padding-top: 0px;
}
.el-form-item--mini.el-form-item {
    margin-bottom: 5px;
}
.cmd input{
  text-align: left;
}
.el-select-dropdown__item {
    display: block!important;
    margin: 0 10px;
}
</style>