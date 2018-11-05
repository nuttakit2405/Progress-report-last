<template>
  <div class="card">
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
      {{data.teams}}
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
</template>

<script>
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
  }
}
</script>
