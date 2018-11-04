<template>
  <div class="card layoutcalendar">
    <header class="card-header">
    <p class="card-header-title iconcalendar" @click="$router.push({name: 'Calendar'})">
        {{role}}
        <b-icon
            icon="calendar-alt"
            size="is-large">
        </b-icon>
    </p>
    </header>
    <div class="card-content">
    <p class="title">
        “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
    </p>
    <p class="subtitle">
        Jeff Atwood
    </p>
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
    <p class="card-footer-item" @click="$router.push({name: 'ScoreBoard'})">
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
