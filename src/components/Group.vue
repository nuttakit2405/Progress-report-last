<template>
  <div class="layoutcalendar">
    <div v-if="profile.userType == 'student'">
      <div class="card" v-if="data.teams[0].id+'@fitm.kmutnb.ac.th' == user.email || data.teams[1].id+'@fitm.kmutnb.ac.th' == user.email">
        <!-- {{data.mentor}}
        {{user.email}} -->
        <header class="card-header">
          <p class="card-header-title iconcalendar">
            <span>{{data.thaiProjectName}}</span>
            <button class="button" @click="$router.push({name: 'Calendar'})">
              <b-icon
                  icon="calendar-alt"
                  size="is-large">
              </b-icon>
            </button>
          </p>
        </header>
        <div class="card-content">
          <!-- {{data}} -->
          <div>
            วันทำงานตั้งแต่
            {{$dayjs(data.startProject).format('DD-MMM-YYYY')}}
            ถึง
            {{$dayjs(data.deadlineProject).format('DD-MMM-YYYY')}}
          </div>
          {{data.teams[0].id}}<br/>{{data.teams[1].id}}
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
          <p class="card-footer-item">
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

    <div v-if="profile.userType == 'teacher'">
      <div class="card">
        {{data.mentor}}
        {{user.email}}
        <header class="card-header">
          <p class="card-header-title iconcalendar">
            <span>{{data.thaiProjectName}}</span>
            <button class="button" @click="$router.push({name: 'Calendar'})">
              <b-icon
                  icon="calendar-alt"
                  size="is-large">
              </b-icon>
            </button>
          </p>
        </header>
        <div class="card-content">
          <!-- {{data}} -->
          <div>
            วันทำงานตั้งแต่.
            {{$dayjs(data.startProject).format('DD-MMM-YYYY')}}
            ถึง
            {{$dayjs(data.deadlineProject).format('DD-MMM-YYYY')}}
          </div>
          {{data.teams[0].id}}<br/>{{data.teams[1].id}} <br/> {{data.mentor}}
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
          <p class="card-footer-item">
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
</style>
