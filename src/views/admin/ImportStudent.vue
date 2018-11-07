<template>
  <div>
    <b-field class="file">
      <b-upload v-model="file" :accept="fileAccept.join(',')">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="file">
        {{ file.name }}
      </span>
    </b-field>
    <button class="button" @click="parse(file)">view data</button>
    <!-- <b-table v-if="student" :data="student" :columns="columns"></b-table> -->
    <table class="table" v-if="student">
      <tr :key="ir" v-for="(row, ir) in student">
        <td :key="ic" v-for="(column, ic) in row">{{column}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
      columns: null
    }
  },
  methods: {
    async parse (file) {
      const res = await this.loadBinaryFile(file)
      const wb = XLSX.read(res, {type: 'binary'})
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws, {header: 1})
      const allLength = data.map(val => val.length)
      const max = Math.max(...allLength)
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
    },
    loadBinaryFile (file) {
      return new Promise(function (resolve, reject) {
        reader.addEventListener('load', function () {
          resolve(this.result)
        }, false)
        reader.readAsBinaryString(file)
      })
    }
  }
}
</script>
