<template>
<section>

<b-table :data="fileData">

  <template slot-scope="props">

      <b-table-column field="FileName" label="ชื่อไฟล์" centered>
          {{ props.row.FileName }}
      </b-table-column>

       <b-table-column field="OwnerFile" label="เจ้าของ"  centered>
          {{ props.row.OwnerFile }}
      </b-table-column>

      <b-table-column field="date" label="วันที่อัพโหลดไฟล์" centered>
          <span class="tag is-success">
              {{ props.row.Date }}
          </span>
      </b-table-column>

      <b-table-column label="ดาวน์โหลด"  centered>
        <button class="button" @click="DownloadFile(props.row.FileName, props.row.Ref)">
          <b-icon
                icon="download"
                 size="is-medium" >
            </b-icon>
        </button>
      </b-table-column>
  </template>

  <template slot="empty">
      <section class="section">
          <div class="content has-text-grey has-text-centered">
              <p>
                  <b-icon
                      icon="emoticon-sad"
                      size="is-large">
                  </b-icon>
              </p>
              <p>Nothing here.</p>
          </div>
      </section>
  </template>
</b-table>
</section>
</template>

<script>
import st from '@/storage'
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
export default {
  props: {
    projectId: {
      type: String
    }
  },
  data () {
    return {
      data: [
        { 'id': 1, 'FileName': 'Jesse', 'OwnerFile': 'Simmons', 'date': '2016/10/15 13:43:27', 'download': 'Male' },
        { 'id': 2, 'FileName': 'Jesse', 'OwnerFile': 'Simmons', 'date': '2016/10/15 13:43:27', 'download': 'Male' }
      ],
      FileName: 'การทดลองที่ 1',
      OwnerFile: 'กัญญารัก',
      date: '',
      download: ''
    }
  },
  computed: {
    ...mapGetters({
      projectSelected: 'projects/projectSelected'
    }),
    fileData () {
      if (this.projectSelected && this.projectSelected.scoreboard) {
        const data = this.projectSelected.scoreboard.map(week => {
          return week.files
        }).filter(v => v).reduce((prev, curr) => {
          Object.values(curr).forEach(file => {
            prev.push(file)
          })
          return prev
        }, []).map(file => {
          return {
            FileName: file.filename,
            OwnerFile: file.username.fullName,
            Date: this.$dayjs(file.time).format('DD/MM/YYYY'),
            Ref: file.ref
          }
        })
        console.log(data)
        return data
      }
      return []
    }
  },
  methods: {
    ...mapActions({
      selectProject: 'projects/selectProject'
    }),
    async DownloadFile (filename, ref) {
      var pathReference = st.storage.ref(ref)
      const url = await pathReference.getDownloadURL()
      console.log(url)

      axios({
        url: url,
        method: 'GET',
        responseType: 'blob' // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.style = 'display: none'
        document.body.appendChild(link)
        link.click()
      })
    }
  },
  created () {
    if (this.projectId) {
      this.selectProject(this.projectId)
    }
  }
}
</script>
