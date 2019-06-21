<template>
  <div id="app">
    <el-dialog title="新增" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="始-终-日期">
          <el-input v-model="form.place_name_date" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.Serial_number" maxlength="8" style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\w]+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间">
          <el-date-picker v-model="form.Date_str" type="datetime" style="width:calc(100% - 10px)" placeholder="选择搜索时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="列车型号">
          <el-input v-model="form.fo_number" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')"
            maxlength="15"></el-input>
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
        <el-form-item label="耗时">
          <el-input v-model="form.Spend_time.Spend_time" maxlength="7" style="width:calc(100% - 10px)">
          </el-input>
        </el-form-item>
        <el-form-item label="座/价">
          <el-input v-model="form.Sert_price"  style="width:calc(100% - 10px)" placeholder="请以/与,分开，例（一等座/4444.00,二等座/2222.00）"
            >
          </el-input>
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
          place_name_date: '',
          Date_str: '',
          Serial_number: '',
          fo_number: '',
          Spend_time: {
            on: '',
            on_place: '',
            end: '',
            end_place: '',
            Spend_time: ''
          }
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      value (val) {
        delete this.form.Seat;
        this.form.Spend_time.end=this.form.Spend_time.end_place=this.form.Spend_time.on=this.form.Spend_time.on_place=this.form.Spend_time.Spend_time=''
        Object.keys(this.form).filter((x)=>{
          if(x=='Spend_time'){
            return ;
          }
          this.form[x]=''
        })
        this.dialogFormVisible = true;
      },
      sub () {
        let is_null=true;
        Object.keys(this.form).filter((x)=>{
          console.log(this.form[x],x)
          if(this.form[x]==''){
              is_null=false;
          }
        })
        if(!is_null){ return this.$message({type:"warning",message: '请将信息填全!'});}
        
        let Date_strDate = new Date(this.form.Date_str)
        let endDate = new Date(this.form.Spend_time.end)
        let onDate = new Date(this.form.Spend_time.on)
        this.form.Spend_time.end = endDate.getHours().toString().padStart(2,'0') + ":" + endDate.getMinutes().toString().padStart(2,'0');
        this.form.Spend_time.on = onDate.getHours().toString().padStart(2,'0') + ":" + onDate.getMinutes().toString().padStart(2,'0');
        this.form.Date_str = Date_strDate.toLocaleDateString().replace(/\//g, '-') + " " + Date_strDate.getHours() +
          ':' + Date_strDate.getMinutes() + ":" + Date_strDate.getSeconds();
        let sert_ary=[];
        let Sert_price_ary=this.form.Sert_price.split(',')

        for(let i in Sert_price_ary){
          sert_ary.push({
            Seat_name:Sert_price_ary[i].split('/')[0],
            Seat_price:Sert_price_ary[i].split('/')[1],
          })
        }
        this.form['Seat']=sert_ary;
        delete this.form.Sert_price;
        this.dialogFormVisible = false;
        this.$emit('loadding', true)
        axios_get("api_Train_Insert", this.form, (result) => {
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
