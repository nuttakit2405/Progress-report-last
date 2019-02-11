<template>
  <div class="container">
    <div class="column mg-t-75px-mobile">
      <!-- <div class="columns">
        <div class="column"></div>
        <div class="column"></div> -->
        <div>
          <div class="column box" v-if="profile">
            <section>
              <div v-if="profile.userType ==  'teacher'">
                <div class="block level " >
                  <div class="level-left" v-if="profile && profile.teacherGroup.length > 1">
                    อ.ประจำวิชา &nbsp;
                     <b-switch v-model="teacherSubject">
                     </b-switch>
                    อ.ที่ปรึกษา
                  </div>
                  <div class="block is-capitalized">
                    <!-- ประเภทผู้ใช้: {{profile.userType}} -->
                  </div>
                  <div class="level-right">
                    <button v-if="teacherSubject !== true" class="button is-white" @click="$router.push({name: 'AddProject'})"
                      style="font-family: 'Kanit', sans-serif">
                        <b-icon icon="plus" size="is-small"></b-icon>&nbsp;เพิ่มโครงงาน</button>
                  </div>
                </div>
                <!-- Tab term -->
                <b-tabs v-model="activeTab" type="is-boxed">
                  <b-tab-item label="1/2561">
                    1/2561
                  </b-tab-item>
                  <b-tab-item label="2/2561">
                    2/2561
                  </b-tab-item>
                  <b-tab-item label="3/2561">
                    3/2561
                  </b-tab-item>
                  <b-tab-item label="1/2562">
                    1/2562
                  </b-tab-item>
                  <b-tab-item label="2/2562">
                    2/2562
                  </b-tab-item>
                  <b-tab-item label="3/2562">
                    3/2561
                  </b-tab-item>
                </b-tabs>
                <!-- Tab term -->
              <div class="column">
                <div class="columns is-multiline">
                  <div class="column is-one-third" :key="key" v-for="(project, key) in projectsTeacher">
                    <group @remove="removeProject" @edit="editProject" :data="project" :projectId="key" :role="teacherSubject ? 'mentor' : 'subject'"/>
                  </div>
                </div>
              </div>
              </div>
              <div  v-if="profile.userType == 'student'">
                <div class="column">
                  <div class="columns is-multiline">
                    <div class="column is-one-third" :key="key" v-for="(project, key) in projectsStudent">
                      <group @remove="removeProject" @edit="editProject" :data="project" :projectId="key" role="student"/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <b-loading v-else :active="true"></b-loading>
        </div>
      <!-- </div> -->
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
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'viewMode',
      projects: 'projects/projects',
      profile: 'user/profile',
      user: 'user/user'
    }),
    projectsStudent () {
      if (this.projects) {
        return Object.keys(this.projects).filter((key) => {
          const project = this.projects[key]
          return this.checkOwnerProject(project) && !project.deleted
        }).map(key => {
          const project = this.projects[key]
          project['key'] = key
          return project
        }).reduce((p, c) => {
          p[c.key] = c
          return p
        }, {})
      }
      return {}
    },
    projectsTeacher () {
      if (this.projects) {
        return Object.keys(this.projects).filter((key) => {
          const project = this.projects[key]
          return this.checkMentor(project.mentor, this.user.email) && !project.deleted
        }).map(key => {
          const project = this.projects[key]
          project['key'] = key
          return project
        }).reduce((p, c) => {
          p[c.key] = c
          return p
        }, {})
      }
      return {}
    },
    teacherSubject: {
      get () {
        return this.viewMode === 'mentor'
      },
      set (val) {
        if (val) {
          this.setViewMode('mentor')
        } else {
          this.setViewMode('subject')
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getProjects: 'projects/getProjects',
      setViewMode: 'setViewMode'
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
        type: 'question',
        title: 'ต้องการลบโครงงานนี้',
        showCancelButton: true,
        confirmButtonColor: 'hsl(141, 71%, 48%)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      })
      if (value) {
        db.database.ref(`projects/${projectId}`).update({deleted: true})
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'ลบโครงงานเรียบร้อยแล้ว'
        })
      }
    },
    async editProject (projectId) {
      const { value } = await this.$swal({
        title: 'ต้องการที่จะแก้ไขข้อมูลโครงงานนี้',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: 'hsl(141, 71%, 48%)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
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
.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {
    background-color: #ffffff;
    border-color: #a9a8a8;
    color: black;
}
</style>
