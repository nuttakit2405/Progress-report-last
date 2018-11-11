<template>
<section>

<b-table :data="isEmpty ? [] : data">

  <template slot-scope="props">

      <b-table-column field="FileName" label="ชื่อไฟล์" centered>
          <!-- {{ props.row.FileName }} -->
          {{FileName}}
      </b-table-column>

       <b-table-column field="OwnerFile" label="เจ้าของ"  centered>
          <!-- {{ props.row.first_name }} -->
          {{OwnerFile}}
      </b-table-column>

      <b-table-column field="date" label="วันที่อัพโหลดไฟล์" centered>
          <span class="tag is-success">
              {{ new Date(props.row.date).toLocaleDateString() }}
          </span>
      </b-table-column>

      <b-table-column label="ดาวน์โหลด"  centered>
        <button class="button" @click="DownloadFile()">
          <b-icon
                icon="download"
                 size="is-medium" >
            </b-icon>
          <!-- {{ props.row.gender }} -->
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
export default {
  data () {
    const data = [
      { 'id': 1, 'FileName': 'Jesse', 'OwnerFile': 'Simmons', 'date': '2016/10/15 13:43:27', 'download': 'Male' },
      { 'id': 2, 'FileName': 'Jesse', 'OwnerFile': 'Simmons', 'date': '2016/10/15 13:43:27', 'download': 'Male' }
    ]

    return {
      data,
      FileName: 'การทดลองที่ 1',
      OwnerFile: 'กัญญารัก',
      date: '',
      download: ''

    }
  },
  methods: {
    async DownloadFile () {
      var pathReference = st.storage.ref('-LQm-4I28BMCSHq85wD1/0/test.txt')
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
        link.setAttribute('download', 'test.txt')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
