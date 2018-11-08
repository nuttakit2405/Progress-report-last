<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="column box">
            <section>
              <div v-if="profile.userType == 'teacher'">
                <div class="block" >
                  <b-switch v-model="showBooks">
                    <p v-if="showBooks == true">อ.ที่ปรึกษา</p>
                    <p v-else>อ.ประจำวิชา </p>
                  </b-switch>
                  Status: {{profile.userType}}
                </div>
                <div class="level">
                  <div v-if="showBooks == true" class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" >
                      <group :data="project" :projectId="key" role="อ.ที่ปรึกษา"/>
                    </div>
                  </div>
                  <div v-else class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" >
                      <group :data="project" :projectId="key" role="อ.ประจำวิชา"/>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="block">
                  Statu: {{profile.userType}}
                </div>
                <div class="columns is-multiline" v-if="profile.userType == 'student'">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" >
                      <group :data="project" :projectId="key" role="อ.ประจำวิชา"/>
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
      projects: 'projects/projects',
      profile: 'user/profile'
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
