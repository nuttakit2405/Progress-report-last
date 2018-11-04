<template>
  <div class="card layoutcalendar">
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
      {{data}}
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
    <p class="card-footer-item" style="cursor: pointer;" @click="$router.push({name: 'ScoreBoard'})">
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
    data: {
      type: Object
    }
  }
}
</script>

<style>
.layoutcalendar{
  margin-top:50px;
  margin-left: auto;
  margin-right: auto;
  width:450px;
}
</style>
