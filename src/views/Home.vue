<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="column box">
            <section>
              <div class="block">
                <b-switch v-model="showBooks">
                  <p v-if="showBooks == true">อ.ประจำวิชา</p>
                  <p v-else>อ.ที่ปรึกษา </p>
                </b-switch>
              </div>
              <div class="level">
                <div v-if="showBooks == true">
                  <group role="อ.ที่ปรึกษา"/>
                </div>
                <div v-else >
                  <group role="อ.ประจำวิชา"/>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Group from '@/components/Group'
export default {
  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  },
  components: {
    Group
  }
}
</script>
<style scooped>
.iconcalendar{
  justify-content: space-between;
  display: flex;
}
</style>
