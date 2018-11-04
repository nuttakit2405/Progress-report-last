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
                  <div class="column is-one-third" :key="key" v-for="(project, key) in projects" >
                    <group role="อ.ที่ปรึกษา"/>
                  </div>
                </div>
                <div v-else class="columns is-multiline">
                  <div class="column is-one-third" :key="key" v-for="(project, key) in projects" >
                    <group :data="project" role="อ.ประจำวิชา"/>
                  </div>
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
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  },
  computed: {
    ...mapGetters({
      projects: 'projects/projects'
    })
  },
  methods: {
    ...mapActions({
      getProjects: 'projects/getProjects'
    })
  },
  created () {
    this.getProjects()
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
