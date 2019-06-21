<template>
  <div id="app">
    <el-dialog title="编辑" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="始-终-日期">
          <el-input v-model="form.place_name_date" maxlength="20" disabled style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.Serial_number" maxlength="8" disabled style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\w]+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间">
          <el-date-picker v-model="form.Date_str" type="datetime" disabled style="width:calc(100% - 10px)" placeholder="选择搜索时间" default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="航班型号">
          <el-input v-model="form.Aircraft_number" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-time-picker v-model="form.Spend_time.on" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="出发点">
          <el-input v-model="form.Spend_time.on_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="到达时间">
          <el-time-picker v-model="form.Spend_time.end" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="到达点">
          <el-input v-model="form.Spend_time.end_place" style="width:calc(100% - 10px)" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.Seat_price" maxlength="7" style="width:calc(100% - 10px)"
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
import {axios_get} from "@/common/axios";
  export default {
    data() {
      return {
        labelPosition:'left',
        dialogFormVisible: false,
        form: {
          Aircraft_number: '',
          Date_str: '',
          Seat_price: '',
          Serial_number: '',
          Spend_time: {
            end: "",
            end_place: "",
            on: "",
            on_place: "",
          },
          place_name_date: "",
          _id: ""
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      value (val) {
        //其实可以用this.form=val来代替以下的傻瓜式赋值……可是这样会有神之BUG
        this.form.Aircraft_number=val.Aircraft_number
        this.form.Date_str=new Date(val.Date_str)
        this.form.Seat_price=val.Seat_price
        this.form.Serial_number=val.Serial_number
        this.form.Spend_time.end=new Date('2000 '+val.Spend_time.end)
        this.form.Spend_time.end_place=val.Spend_time.end_place
        this.form.Spend_time.on=new Date('2000 '+val.Spend_time.on)
        this.form.Spend_time.on_place=val.Spend_time.on_place
        this.form.place_name_date=val.place_name_date
        this.form._id=val._id
        this.dialogFormVisible = true;
      },
      sub(){
        let is_null=true;
        Object.keys(this.form).filter((x)=>{
          if(this.form[x]==''){
              is_null=false;
          }
        })
        if(!is_null){ return this.$message({type:"warning",message: '请将信息填全!'});}
        
        let Date_strDate = new Date(this.form.Date_str)
        let endDate=new Date(this.form.Spend_time.end)
        let onDate=new Date(this.form.Spend_time.on)
        this.form.Date_str = Date_strDate.toLocaleDateString().replace(/\//g,'-') + " " + Date_strDate.getHours() + ':' + Date_strDate.getMinutes() + ":" + Date_strDate.getSeconds();
        this.form.Spend_time.end=endDate.getHours().toString().padStart(2,'0')+":"+endDate.getMinutes().toString().padStart(2,'0');
        this.form.Spend_time.on=onDate.getHours().toString().padStart(2,'0')+":"+onDate.getMinutes().toString().padStart(2,'0');
        this.form.Seat_price=parseInt(this.form.Seat_price).toFixed(2)
        this.dialogFormVisible = false;
        this.$emit('loadding',true)
        axios_get("api_Aircraft_Updata", this.form, (result) => {
            if(result.data.data.n>0){
              this.$parent.Read_data();
              this.$message({
                type: 'success',
                message: '修改成功!'
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
  .el-form-item{
    margin-bottom: 7px
  }
</style>
