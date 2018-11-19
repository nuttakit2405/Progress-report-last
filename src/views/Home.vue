<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="column box" v-if="profile">
            <section>
              <div v-if="profile.userType ==  'teacher'">
                <div class="block level" >
                  <div class="level-left">
                    <b-switch v-model="showBooks">
                      <p v-if="showBooks == true">อ.ที่ปรึกษา</p>
                      <p v-else>อ.ประจำวิชา </p>
                    </b-switch>
                  </div>
                  {{profile.userType}}
                  <div class="level-right">
                    <button v-if="showBooks !== true" class="button is-danger" @click="$router.push({name: 'AddProject'})">+</button>
                  </div>
                </div>
                <div class="column">
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
              <div  v-if="profile.userType == 'student'">
                <div class="block">
                  Status: {{profile.userType}}
                </div>
                <div class="column">
                  <div class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" v-if="checkOwnerProject(project) && !project.deleted" >
                      <group @remove="removeProject" @edit="editProject" :data="project" :projectId="key" role="อ.ประจำวิชา"/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <b-loading v-else :active="true"></b-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/database'
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
      profile: 'user/profile',
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      getProjects: 'projects/getProjects'
    }),
    checkOwnerProject (data) {
      return data.teams.map(member => {
        return member.id + '@fitm.kmutnb.ac.th' === this.user.email
      }).some(val => val === true)
    },
    async removeProject (projectId) {
      const { value } = await this.$swal({
        type: 'error',
        title: 'ลบโปรเจคนี้',
        showCancelButton: true
      })
      if (value) {
        db.database.ref(`projects/${projectId}`).update({deleted: true})
      }
    },
    async editProject (projectId) {
      const { value } = await this.$swal({
        title: 'แก้ไขโปรเจค',
        showCancelButton: true
      })
      if (value) {
        this.$router.push({name: 'EditProject', params: {projectId: projectId}})
      }
    }
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
