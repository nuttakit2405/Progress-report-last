<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="column box" v-if="profile">
            <section>
              <div v-if="profile.userType ==  'teacher'">
                <div class="block level " >
                  <div class="level-left">
                    <b-switch v-model="teacherSubject">
                      <p v-if="teacherSubject == true">อ.ที่ปรึกษา</p>
                      <p v-else>อ.ประจำวิชา </p>
                    </b-switch>
                  </div>
                  <div class="block is-capitalized">
                    <!-- ประเภทผู้ใช้: {{profile.userType}} -->
                  </div>
                  <div class="level-right">
                    <button v-if="teacherSubject !== true" class="button is-danger" @click="$router.push({name: 'AddProject'})"><b-icon icon="plus"></b-icon></button>
                  </div>
                </div>
                <div class="column">
                  <div class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" v-if="checkMentor(project.mentor, user.email) && !project.deleted" >
                      <group @remove="removeProject" @edit="editProject" :data="project" :projectId="key" :role="teacherSubject ? 'mentor' : 'subject'"/>
                    </div>
                  </div>
                </div>
              </div>
              <div  v-if="profile.userType == 'student'">
                <div class="block is-capitalized">
                  ประเภทผู้ใช้: {{profile.userType}}
                </div>
                <div class="column">
                  <div class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projects" v-if="checkOwnerProject(project) && !project.deleted" >
                      <group @remove="removeProject" @edit="editProject" :data="project" :projectId="key" role="student"/>
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
      teacherSubject: false
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
    checkMentor (mentor, email) {
      if (this.teacherSubject) {
        if (mentor && mentor.email === email) {
          return true
        }
        return false
      }
      return true
    },
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
