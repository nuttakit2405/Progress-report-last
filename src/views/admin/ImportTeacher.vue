<template>
  <div>
    <div class="column"></div>

     <center>
        <p style="color: #FF0000; font-size: 20pt;"> <b>**หมายเหตุ**  </b></p>
        <p>1. เพื่อประสิทธิภาพในการใช้งาน ระบบนี้รองรับไฟล์ Excel นามสกุล .xlsx, .xls และ .csv เท่านั้น</p>
        <p>2. เพื่อประสิทธิภาพในการใช้งาน การเพิ่มไฟล์ข้อมูลอาจารย์ ควรใช้ไฟล์ต้นแบบของระบบนี้เท่านั้น</p><br>

        <I><U> <a href="/static/file_import/ตัวอย่างไฟล์เพิ่มข้อมูลอาจารย์.xlsx" target="_blank">ดาวน์โหลดไฟล์ต้นแบบได้ที่นี่</a></U></I>
    </center><br>

    <div class="columns column is-centered">
      <b-field class="file">
        <b-upload v-model="file" :accept="fileAccept.join(',')" @input="parse(file)">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>เลือกไฟล์</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
      </b-field>
    </div>
    <!-- <button class="button" @click="parse(file)">view data</button> -->
    <!-- <b-table v-if="student" :data="student" :columns="columns"></b-table> -->
    <center>
    <table class="table" v-if="teacher">
      <tr>
        <td>
         <div>
            <b-checkbox @input="selectAll(checkAll)" v-model="checkAll">เลือกทั้งหมด</b-checkbox>
          </div>
        </td>
        <td :key="ic" v-for="(column, ic) in maxColumn">
          <b-field>
            {{columnName[columnSelected[ic]]}}
            <!-- <b-select v-model="columnSelected[ic]" @input="selectedField($event, ic)" placeholder="Select a field">
              <option
                  v-for="(option, key) in selectOptions"
                  :value="option.value"
                  :key="key"
                  :disabled="option.seletcted && option.seletcted !== ic"
                  :class="{'is-disabled': option.seletcted && option.seletcted !== ic}">
                  {{ option.title }}
              </option>
            </b-select> -->
          </b-field>
        </td>
      </tr>
      <tr :key="ir" v-for="(row, ir) in teacher">
        <td class="has-text-centered"><b-checkbox :native-value="ir" v-model="rowSelected"></b-checkbox></td>
        <td :key="ic" v-for="(column, ic) in row">{{column}}</td>
      </tr>
    </table>
    </center><br>

    <div v-if="teacher" class="columns column is-centered">
      <button class="button" @click="saveToDB">บันทึกข้อมูล</button>
    </div>
  </div>
</template>

<script>
import db from '@/database'
import XLSX from 'xlsx'
var reader = new FileReader()
export default {
  data () {
    return {
      fileAccept: [
        '.xlsx',
        '.xls',
        '.csv'
      ],
      file: null,
      teacher: null,
      columns: null,
      maxColumn: 0,
      selectOptions: [
        {title: '(ยังไม่ได้เลือก)', value: 'disabled', seletcted: null},
        {title: 'ชื่อ', value: 'name', seletcted: null},
        {title: 'นามสกุล', value: 'lastname', seletcted: null},
        {title: 'ตำแหน่ง', value: 'position', seletcted: null},
        {title: 'อีเมล', value: 'email', seletcted: null},
        {title: 'ชื่อย่อ', value: 'initials', seletcted: null}
      ],
      rowSelected: [],
      columnName: {
        name: 'ชื่อ',
        lastname: 'นามสกุล',
        position: 'ตำแหน่ง',
        email: 'อีเมล',
        initials: 'ชื่อย่อ'
      },
      columnSelected: ['name', 'lastname', 'position', 'email', 'initials'],
      checkAll: false
    }
  },
  methods: {
    selectedField (e, column) {
      const oldIndex = this.selectOptions.findIndex(v => v.seletcted === column)
      if (oldIndex !== -1) {
        this.selectOptions[oldIndex].seletcted = null
      }
      if (e === 'disabled') {
        return
      }
      const index = this.selectOptions.findIndex(v => v.value === e)
      if (index !== -1) {
        this.selectOptions[index].seletcted = column
      }
    },
    selectAll (flag) {
      if (flag) {
        this.rowSelected = new Array(this.teacher.length).fill(0).map((v, i) => i)
      } else {
        this.rowSelected = []
      }
    },
    async parse (file) {
      const res = await this.loadBinaryFile(file)
      const wb = XLSX.read(res, {type: 'binary'})
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws, {header: 1})
      const allLength = data.map(val => val.length)
      const max = Math.max(...allLength)
      this.maxColumn = max
      this.columns = new Array(max).fill(1).map((val, i) => {
        return {
          field: i,
          label: i + 1
        }
      })
      this.teacher = data.map(val => {
        const inner = val.reduce((prev, curr, index) => {
          prev[index] = curr
          return prev
        }, {})
        return inner
      })
      // this.columnSelected = new Array(max).fill(0).map((v) => 'disabled')
    },
    loadBinaryFile (file) {
      return new Promise(function (resolve, reject) {
        reader.addEventListener('load', function () {
          resolve(this.result)
        }, false)
        reader.readAsBinaryString(file)
      })
    },
    async saveToDB () {
      const nameColumn = this.columnSelected.findIndex(v => v === 'name')
      const lastnameColumn = this.columnSelected.findIndex(v => v === 'lastname')
      const positionColumn = this.columnSelected.findIndex(v => v === 'position')
      const emailColumn = this.columnSelected.findIndex(v => v === 'email')
      const initialsColumn = this.columnSelected.findIndex(v => v === 'initials')

      const data = this.rowSelected.map(row => {
        return {
          name: this.teacher[row][nameColumn].replace(/-/g, ''),
          lastname: this.teacher[row][lastnameColumn],
          position: this.teacher[row][positionColumn],
          email: this.teacher[row][emailColumn],
          initials: this.teacher[row][initialsColumn]

        }
      }).reduce((prev, curr) => {
        prev[curr.initials] = curr
        return prev
      }, {})
      await db.database.ref('teachers').update(data)
      await this.$swal({type: 'success', text: 'เพิ่มข้อมูลเสร็จสิ้น'}).then(() => {
        this.resetData()
      })
    },
    resetData () {
      this.file = null
      this.teacher = null
      this.columns = null
      this.maxColumn = 0
      this.rowSelected = []
      this.checkAll = false
    }
  }
}
</script>

<style scoped>
.is-disabled {
  color: lightgray;
}
</style>
