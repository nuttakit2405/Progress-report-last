<template>
  <div class="column box">
    <section>
      <b-tabs v-model="activeTab">
          <b-tab-item :visible="showBooks" label="ยังไม่เสร็จ">
            ขอบเขตการทำงาน
              <b-field>
                <b-input name="detail" placeholder="Name" expanded></b-input>
              </b-field>
              <div class="ButtonAddWork">
                <button class="button is-primary" @click="ClickScal">เพิ่มขอบเขต</button>
              </div>
          </b-tab-item>
          <b-tab-item :visible="showBooks" label="เสร็จแล้ว">
              ขอบเขตนะจ๊ะ
          </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detail: []
    }
  },
  methods: {
    ClickScal () {

    }
  }
}

</script>
