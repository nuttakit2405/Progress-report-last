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
          <b-icon
                icon="download"
                 size="is-medium">
            </b-icon>
          <!-- {{ props.row.gender }} -->
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
  }
}
</script>
