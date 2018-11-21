<template>
  <div>
    <div>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title iconcalendar">
            <span class="dotdotdot">{{data.thaiProjectName}}</span>
            <button class="button" @click="$router.push({name: 'Calendar'})">
              <b-icon
                  icon="calendar-alt"
                  size="is-large">
              </b-icon>
            </button>
            <b-dropdown v-if="role === 'subject'" hoverable>
              <button class="button" slot="trigger">
                  <i class="fas fa-ellipsis-v"></i>
              </button>

              <b-dropdown-item @click="$emit('edit', projectId)">
                <b-icon icon="edit"></b-icon>แก้ไขโปรเจค
              </b-dropdown-item>
              <b-dropdown-item @click="$emit('remove', projectId)">
                <b-icon icon="trash-alt"></b-icon>ลบโปรเจค
              </b-dropdown-item>
          </b-dropdown>
          </p>
        </header>
        <div class="card-content">
          <div class="columns" style="align-items: center">
            <div class="column is-paddingless"><progress class="progress is-info" :value="data.progress ? data.progress : 0" max="100"></progress></div>
            <span class="column is-paddingless" style="flex: none;width: fit-content;">&nbsp;{{data.progress ? data.progress : 0}}%</span>
          </div>
          <!-- {{data}} -->
          <div>
            วันทำงานตั้งแต่
            {{$dayjs(data.startProject).format('DD-MMM-YYYY')}}
            ถึง
            {{$dayjs(data.deadlineProject).format('DD-MMM-YYYY')}}
          </div>
           {{data.mentor.position}} {{data.mentor.name}} {{data.mentor.lastname}} <br>
          <span :key="member.id" v-for="member in data.teams">
            {{member.id}} {{member.name}} {{member.lastname}} <br>
          </span>
          <span>
          </span>
          <!-- {{data.teams[0].id}}<br/>{{data.teams[1].id}} -->
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
              <span>
              <b-icon
                  icon="video"
                  size="is-meduim">
              </b-icon>
              </span>
          </p>
          <p class="card-footer-item">
              <span>
              <b-icon
                  icon="comments"
                  size="is-meduim">
              </b-icon>
              </span>
          </p>
          <p class="card-footer-item" style="cursor: pointer;" @click="$router.push({name: 'ProjectScoreBoard', params: {projectId: projectId}})">
              <span>
              <b-icon
                  icon="file-alt"
                  size="is-meduim">
              </b-icon>
              </span>
          </p>
          <p class="card-footer-item"  style="cursor: pointer;" @click="$router.push({name: 'ProjectFolder', params: {projectId: projectId}})">
            <span>
              <b-icon
                  icon="folder"
                  size="is-meduim">
              </b-icon>
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
/* .layoutcalendar{
  margin-top:50px;
  margin-left: auto;
  margin-right: auto;
  width:450px;
} */
.sizeCard {
  background: #eee;
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
}

.dotdotdot {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 75%;
  white-space: nowrap;
}
</style>
