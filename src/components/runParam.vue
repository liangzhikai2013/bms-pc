<template>
    <div style="margin:0 30px">
       
        <el-table
            :data="tableData"
            
            style="width: 620px"
            height=350px>
            <el-table-column
            prop="paramName"
            :label="$t('message.bmsparams')"
            width= '310'>
            </el-table-column>
            <el-table-column
            prop="nowNumber"
            :label="$t('message.currentvalue')"
            width= '310'>
            </el-table-column>
        </el-table>
     
    </div>
</template>
<script>
export default {
  name: 'runParam',
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
         tableData: [
            //  {
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },{
            // paramName:'canshu1',
            // nowNumber: '10'
            // },
            ]
			
	}
 
},
created(){
    this.init()

},
methods:{
    init() {
        console.log(this.$i18n.locale)
        this.$axios.get('/getbmsparam?userId='+this.userid+'&language='+this.$i18n.locale)
       //then获取成功；response成功后的返回值（对象）
      .then(response=>{
         console.log(response);
         this.tableData=response.data.data;
      })
       //获取失败
      .catch(error=>{
        console.log(error);
        // this.$message("设备离线");
        this.$message("设备离线");
      })


    }
        
    
}


}

</script>