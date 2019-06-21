<template>
  <div id="app">
    <el-dialog title="新增" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="始-终-日期">
          <el-input v-model="form.place_name_date" maxlength="20"  style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.Serial_number" maxlength="8"  style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\w]+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间">
          <el-date-picker v-model="form.Date_str" type="datetime"  style="width:calc(100% - 10px)" placeholder="选择搜索时间" default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巴车类型">
          <el-input v-model="form.Vehicle_type" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-time-picker v-model="form.to" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="出发点">
          <el-input v-model="form.to_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="到达点">
          <el-input v-model="form.fo_place" style="width:calc(100% - 10px)" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" maxlength="7" style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\d.]/g,'').replace(/(\.\.\.\.\.)|(\.\.\.\.)|(\.\.\.)|(\.\.)+/g,'.')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    axios_get
  } from "@/common/axios";
  export default {
    data() {
      return {
        labelPosition: 'left',
        dialogFormVisible: false,
        form: {
          Serial_number: '',
          Date_str: '',
          Vehicle_type:'',
          to:'',
          to_place:'',
          fo_place:'',
          price: '',
          place_name_date: ""
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      value (val) {
        Object.keys(this.form).filter((x)=>{
          this.form[x]=''
        })
        this.dialogFormVisible = true;
      },
      sub () {
        let is_null=true;
        Object.keys(this.form).filter((x)=>{
          if(this.form[x]==''){
              is_null=false;
          }
        })
        if(!is_null){ return this.$message({type:"warning",message: '请将信息填全!'});}
        
        let Date_strDate = new Date(this.form.Date_str)
        let toDate=new Date(this.form.to)
        this.form.to=toDate.getHours().toString().padStart(2,'0')+":"+toDate.getMinutes().toString().padStart(2,'0');
        this.form.Date_str = Date_strDate.toLocaleDateString().replace(/\//g,'-') + " " + Date_strDate.getHours() + ':' + Date_strDate.getMinutes() + ":" + Date_strDate.getSeconds();
        this.form.price=parseInt(this.form.price).toFixed(2)
        this.dialogFormVisible = false;
        this.$emit('loadding', true)
        axios_get("api_Automobile_Insert", this.form, (result) => {
          console.log(result)
          if (result.data.data.result.n > 0) {
            this.$parent.Read_data();
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        })
      }
    },
    mounted () {}
  }

</script>

<style scoped>
  .test_1 {
    width: 500px;
    position: absolute;
    height: 500px;
    top: 50px;
    left: 50%;
    background: pink
  }

  .el-form-item {
    margin-bottom: 7px
  }

</style>
