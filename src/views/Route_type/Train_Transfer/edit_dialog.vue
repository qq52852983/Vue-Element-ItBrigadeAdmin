<template>
  <div id="app">
    <el-dialog title="编辑" width="30%" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition"  label-width="120px" :model="form">
        <el-form-item label="始-终-日期">
          <el-input v-model="form.place_name_date" disabled maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-input v-model="form.Serial_number" disabled maxlength="8" style="width:calc(100% - 10px)"
            onkeyup="value=value.replace(/[^\w]+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="搜索时间">
          <el-date-picker v-model="form.Date_str" disabled type="datetime" style="width:calc(100% - 10px)" placeholder="选择搜索时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出发列车型号">
          <el-input v-model="form.fo_number" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')"
            maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="出发时间">
          <el-time-picker v-model="form.fo_date" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="出发站">
          <el-input v-model="form.fo_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="到达中转站时间">
          <el-time-picker v-model="form.fo_to_pass_date" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="到达中转站耗时">
          <el-input v-model="form.fo_to_pass_time_consumin" style="width:calc(100% - 10px)" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="座/价">
          <el-input v-model="form.fo_to_pass_seat_str" style="width:calc(100% - 10px)"
            placeholder="请以/与,分开，例（一等座/4444.00,二等座/2222.00）">
          </el-input>
        </el-form-item>
        <el-form-item label="中转列车型号">
          <el-input v-model="form.pass_to_number" style="width:calc(100% - 10px)" onkeyup="value=value.replace(/ /g,'')"
            maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="中转站出发时间">
          <el-time-picker v-model="form.pass_to_date" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="中转站点">
          <el-input v-model="form.pass_to_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="座/价">
          <el-input v-model="form.pass_seat_str" style="width:calc(100% - 10px)"
            placeholder="请以/与,分开，例（一等座/4444.00,二等座/2222.00）">
          </el-input>
        </el-form-item>
        <el-form-item label="到达终点站时间">
          <el-time-picker v-model="form.pass_to_pass_date" style="width:calc(100% - 10px)" placeholder="选择到达时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="到达终点站耗时">
          <el-input v-model="form.pass_to_time_consumin" style="width:calc(100% - 10px)" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="终点站">
          <el-input v-model="form.to_place" maxlength="20" style="width:calc(100% - 10px)"></el-input>
        </el-form-item>
        <el-form-item label="概括">
          <el-input v-model="form.transfer_overview" maxlength="10" style="width:calc(100% - 10px)">
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
import {axios_get} from "@/common/axios";
  export default {
    data() {
      return {
        labelPosition:'left',
        dialogFormVisible: false,
        form: {
          place_name_date: '',
          Date_str: '',
          Serial_number: '',
          fo_number: '',
          pass_to_number: '',
          fo_date: '',
          fo_to_pass_date: '',
          pass_to_date: '',
          pass_to_pass_date: '',
          fo_place: '',
          pass_to_place: '',
          to_place: '',
          fo_to_pass_time_consumin: '',
          pass_to_time_consumin: '',
          transfer_overview: '',
          fo_to_pass_seat_str:'',
          pass_seat_str:''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      value (val) {
        //其实可以用this.form=val来代替以下的傻瓜式赋值……可是这样会有神之BUG
        this.form.Date_str=new Date(val.Date_str)
        this.form.fo_date=new Date('2000 '+val.fo_date)
        this.form.fo_to_pass_date=new Date('2000 '+val.fo_to_pass_date)
        this.form.pass_to_date=new Date('2000 '+val.pass_to_date)
        this.form.pass_to_pass_date=new Date('2000 '+val.pass_to_pass_date)

        this.form.Serial_number=val.Serial_number
        this.form.place_name_date=val.place_name_date
        this.form.fo_number=val.fo_number
        this.form.pass_to_number=val.pass_to_number
        this.form.fo_place=val.fo_place
        this.form.pass_to_place=val.pass_to_place
        this.form.to_place=val.to_place
        this.form.fo_to_pass_time_consumin=val.fo_to_pass_time_consumin
        this.form.pass_to_time_consumin=val.pass_to_time_consumin
        this.form.transfer_overview=val.transfer_overview
        this.form.fo_to_pass_seat_str=val.fo_to_pass_seat_str
        this.form.pass_seat_str=val.pass_seat_str
        this.form._id=val._id
        this.dialogFormVisible = true;
      },
      sub(){
        let is_null = true;
        Object.keys(this.form).filter((x) => {
          if (this.form[x] == '') {
            is_null = false;
          }
        })
        if (!is_null) {
          return this.$message({
            type: "warning",
            message: '请将信息填全!'
          });
        }

        let Date_strDate = new Date(this.form.Date_str)
        let foDate = new Date(this.form.fo_date)
        let fo_to_pass_Date = new Date(this.form.fo_to_pass_date)
        let pass_to_Date = new Date(this.form.pass_to_date)
        let pass_to_pass_Date = new Date(this.form.pass_to_pass_date)
        this.form.fo_date = foDate.getHours().toString().padStart(2, '0') + ":" + foDate.getMinutes()
        .toString().padStart(2, '0');
        this.form.fo_to_pass_date = fo_to_pass_Date.getHours().toString().padStart(2, '0') + ":" + fo_to_pass_Date.getMinutes().toString()
          .padStart(2, '0');
        this.form.pass_to_date = pass_to_Date.getHours().toString().padStart(2, '0') + ":" + pass_to_Date.getMinutes().toString()
          .padStart(2, '0');
        this.form.pass_to_pass_date = pass_to_pass_Date.getHours().toString().padStart(2, '0') + ":" + pass_to_pass_Date.getMinutes().toString()
          .padStart(2, '0');
        this.form.Date_str = Date_strDate.toLocaleDateString().replace(/\//g, '-') + " " + Date_strDate.getHours() +
          ':' + Date_strDate.getMinutes() + ":" + Date_strDate.getSeconds();
        let fo_to_pass_seat_ary = this.form.fo_to_pass_seat_str.split(',')
        let pass_seat_ary = this.form.pass_seat_str.split(',')
        let fo_to_pass_seat=[],pass_seat=[]
        for (let i in fo_to_pass_seat_ary) {
          fo_to_pass_seat.push({
            sert_name: fo_to_pass_seat_ary[i].split('/')[0],
            sert_price: fo_to_pass_seat_ary[i].split('/')[1],
          })
        }
        for (let i in pass_seat_ary) {
          pass_seat.push({
            sert_name: pass_seat_ary[i].split('/')[0],
            sert_price: pass_seat_ary[i].split('/')[1],
          })
        }
        this.form['pass_seat']=pass_seat
        this.form['fo_to_pass_seat']=fo_to_pass_seat
        
        for(let ary=['fo_to_pass_seat_str','pass_seat_str'],i=0;i<ary.length;i++){
            delete this.form[ary[i]];
        }
        this.dialogFormVisible = false;
        this.$emit('loadding',true)
        axios_get("api_Train_Transfer_Updata", this.form, (result) => {
          console.log(result)
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
    mounted: function () {}
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
