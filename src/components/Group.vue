<template>
  <div>
    <div>
      <div class="card">
        <header class="card-header" style="position: relative; width: 100%; padding: 10px;">
          <p class="card-header-title" style="padding-left: 5px;">
            <span @click="$router.push({name: 'ProjectScoreBoard', params: {projectId: projectId}})"
              class="dotdotdot project-name"
              :title="data.thaiProjectName">{{data.thaiProjectName}}</span>
          </p>
          <div style="display: flex; flex-direction: row;">
            <button class="button" @click="$router.push({name: 'CalendarProject', params: {projectId: projectId}})">
              <b-icon
                  icon="calendar-alt"
                  size="is-large">
              </b-icon>
            </button>
            &nbsp;
            <b-dropdown v-if="role === 'subject'" hoverable>
              <button class="button" slot="trigger">
                  <i class="fas fa-ellipsis-v"></i>
              </button>
              <b-dropdown-item v-if="data.approveSpecialProject !== true"  @click="$emit('edit', projectId)">
                <i class="fas fa-edit"></i>&nbsp;<span>แก้ไขโปรเจค</span>
              </b-dropdown-item>
              <b-dropdown-item @click="$emit('remove', projectId)">
                <i class="fas fa-trash-alt"></i>&nbsp;<span>ลบโปรเจค</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </header>
        <div class="card-content">
          <div class="columns" style="align-items: center">
            <div class="column is-paddingless"><progress class="progress" :class="[ data.approveSpecialProject ? 'is-success' : data.approveSpecialProject === false ? 'is-danger' : 'is-info']" :value="data.progress ? data.progress : 0" max="100"></progress></div>
            <span class="column is-paddingless" style="flex: none;width: fit-content;">&nbsp;{{data.progress ? data.progress : 0}}%</span>
          </div>
          <!-- {{data}} -->
          <div>
            <b>วันทำงานตั้งแต่</b><br>
            {{$dayjs(data.startProject).format('DD-MMM-YYYY')}}
            <b>ถึง</b>
            {{$dayjs(data.deadlineProject).format('DD-MMM-YYYY')}}
          </div>
            <b>อาจารย์ที่ปรึกษา</b><br>
           {{data.mentor.position}}{{data.mentor.name | removeTitle}} {{data.mentor.lastname}} <br>
           <b>สมาชิก</b><br>
          <span :key="member.id" v-for="member in data.teams">
            {{member.id}} {{member.name}} {{member.lastname}} <br>
          </span>
          <span>
          </span>
          <!-- {{data.teams[0].id}}<br/>{{data.teams[1].id}} -->
        </div>
        <footer class="card-footer">
          <p class="card-footer-item" @click="$router.push({name: 'Conference', params: {projectId: projectId}})">
              <span class="icon fa-lg icon-hover" >
                <i class="fa fa-video"></i>
              </span>
          </p>
          <p class="card-footer-item" @click="$router.push({name: 'Chat', params: {projectId: projectId}})">
              <span class="icon fa-lg icon-hover" >
                <i class="fa fa-comments"></i>
              </span>
          </p>
          <p class="card-footer-item" style="cursor: pointer;" @click="$router.push({name: 'ProjectScoreBoard', params: {projectId: projectId}})">
              <span class="icon fa-lg icon-hover" >
                <i class="fa fa-file-alt"></i>
              </span>
          </p>
          <p class="card-footer-item"  style="cursor: pointer;" @click="$router.push({name: 'ProjectFolder', params: {projectId: projectId}})">
              <span class="icon fa-lg icon-hover" >
                <i class="fas fa-folder-open"></i>
              </span>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    role: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(
      {
        user: 'user/user',
        isLogged: 'user/isLogged',
        profile: 'user/profile'
      }
    )
  }
}
</script>
<style scooped>
.project-name:hover {
  cursor: pointer;
  color: hsl(204, 86%, 53%);
}

.icon-hover:hover {
  cursor: pointer;
  color: hsl(204, 86%, 53%);
}
.sizeCard {
  background: #eee;
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
}

.dotdotdot {
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  width: calc(100% - 105px);
  white-space: nowrap;
}
</style>
