<template>
  <div>
    <div class="column"></div>
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
    <table class="table" style="overflow: scroll" v-if="student">
      <tr>
        <td>
          <div>
            <b-checkbox @input="selectAll(checkAll)" v-model="checkAll">เลือกทั้งหมด</b-checkbox>
          </div>
        </td>
        <td :key="ic" v-for="(column, ic) in maxColumn">
          <b-field>
            <b-select v-model="columnSelected[ic]" @input="selectedField($event, ic)" placeholder="Select a field">
              <option
                  v-for="(option, key) in selectOptions"
                  :value="option.value"
                  :key="key"
                  :disabled="option.seletcted && option.seletcted !== ic"
                  :class="{'is-disabled': option.seletcted && option.seletcted !== ic}">
                  {{ option.title }}
              </option>
            </b-select>
          </b-field>
        </td>
      </tr>
      <tr :key="ir" v-for="(row, ir) in student">
        <td class="has-text-centered"><b-checkbox :native-value="ir" v-model="rowSelected"></b-checkbox></td>
        <td :key="ic" v-for="(column, ic) in row">{{column}}</td>
      </tr>
    </table>
    <div v-if="student" class="columns column is-centered">
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
      student: null,
      columns: null,
      maxColumn: 0,
      selectOptions: [
        {title: '(ยังไม่ได้เลือก)', value: 'disabled', seletcted: null},
        {title: 'รหัสนักศึกษา', value: 'id', seletcted: null},
        {title: 'ชื่อ', value: 'name', seletcted: null},
        {title: 'นามสกุล', value: 'lastname', seletcted: null},
        {title: 'สาขา', value: 'branch', seletcted: null}
      ],
      rowSelected: [],
      columnSelected: [],
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
        this.rowSelected = new Array(this.student.length).fill(0).map((v, i) => i)
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
      this.student = data.map(val => {
        const inner = val.reduce((prev, curr, index) => {
          prev[index] = curr
          return prev
        }, {})
        return inner
      })
      this.columnSelected = new Array(max).fill(0).map((v) => 'disabled')
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
      const idColumn = this.columnSelected.findIndex(v => v === 'id')
      const nameColumn = this.columnSelected.findIndex(v => v === 'name')
      const lastnameColumn = this.columnSelected.findIndex(v => v === 'lastname')
      const branchColumn = this.columnSelected.findIndex(v => v === 'branch')

      const data = this.rowSelected.map(row => {
        return {
          id: this.student[row][idColumn].replace(/-/g, ''),
          name: this.student[row][nameColumn],
          lastname: this.student[row][lastnameColumn],
          branch: this.student[row][branchColumn]
        }
      }).reduce((prev, curr) => {
        prev[curr.id] = curr
        return prev
      }, {})
      const res = await db.database.ref('students').update(data)
      console.log(res)
    }
  }
}
</script>

<style scoped>
.is-disabled {
  color: lightgray;
}
</style>
