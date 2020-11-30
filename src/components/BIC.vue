<template>
    <div style="margin:0 30px">
        <el-form ref="form" :model="BICform" :inline="true" label-width="135px">
            <el-form-item :label="$t('message.checkBICcontent')">
                <el-switch v-model="BICform.switch" @change="BICswitch"></el-switch>
            </el-form-item>
             <el-form-item :label="$t('message.seleBICnum')">
                <el-select v-model="BICform.BICNum" :clearable="true"  
                :disabled="BICform.switch==false?true:false"  
                :placeholder="$t('message.placehBICnum')"
                @change="loaddata">
                    <el-option v-for="item in BICList"  :label="item.name" :value="item.val" :key="item.id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
               <div>{{BICtemp}}</div>
            </el-form-item>
           

        </el-form>

        <template>
        <el-table
            v-if="BICform.switch"
            :data="tableData"
            stripe
            style="width: 620px"
            height=350px>
            <el-table-column
            prop="id"
            :label="$t('message.id')"
            width= '120'>
            </el-table-column>
            <el-table-column
            prop="voltage"
            :label="$t('message.v')"
            width= '120'>
            </el-table-column>
            <el-table-column
            prop="balanc"
            :label="$t('message.equilibrium')"
            width= '120'>
            </el-table-column>
             <el-table-column
            prop="tempSenID"
            :label="$t('message.tempsensorno')"
            width= '120'>
            </el-table-column>
             <el-table-column
            prop="temperature"
            :label="$t('message.temperature')"
            >
            </el-table-column>
        </el-table>
        </template>
        
    </div>
</template>
<script>
export default {
  name: 'BIC',
  
  created(){
    console.log("init")
    this.init()
  },
   props: {
			userid: {
        type: String,
				required: true,
			},
    },
  data() {
	return {
        input:'',
        checked:'',
        tabPosition: 'left',
        labelPosition:'left',
        BICform:{
            switch:false,
            BICNum:''
        },
        BICtemp:'',
        BICList:[
            {id:1,
            name:'name1',
            val:'val1'
            },
            {id:2,
            name:'name2',
            val:'val2'
            }
        ],
         tableData: [],
         lunxun:''
			
	}
 
},
  methods: {
    BICswitch(){
      if(this.BICform.switch==false){
        clearInterval(this.lunxun)
      }else{
        if(this.BICform.BICNum != '')this.loaddata()
      }
    },
    init(){
        //获取下拉列表
        this.$axios.get('/getbicnum?userId='+this.userid)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.BICList=response.data.data.number;
      })
       //获取失败
      .catch(error=>{
        console.log(error);
        this.$message("正在获取参数");
      })

    },
    loaddata(){
      
      var that = this
      this.lunxun = setInterval( function(){
         that.$axios.get('/getbicdetail?userId='+that.userid+ "&bicNum=0" + that.BICform.BICNum)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         that.tableData=response.data.data.returnList;
         that.BICtemp = that.$t('message.nowBICtemp')+response.data.data.BICtemp+'℃';
      })
       //获取失败
      .catch(error=>{
        console.log(error);
        that.$message("正在获取参数");
      })
      },1000)
      this.$emit('addlunxun',this.lunxun)
      //获取表格数据
     

    }

  },

  beforeDestroy(){
    console.log("Destroy")
    clearInterval(this.lunxun)
  },

  watch:{
			switch(newVal) {
          this.$i18n.locale = this.langs;  
          this.$emit('change', newVal)    
      },
  }
}

</script>