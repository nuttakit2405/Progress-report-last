<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div class="column box">
            <section>
              <div class="block">
                <b-switch v-model="showBooks">
                  <p v-if="showBooks == true">อ.ประจำวิชา</p>
                  <p v-else>อ.ที่ปรึกษา </p>
                </b-switch>
              </div>
              <div class="level">
                <div v-if="showBooks == true">
                  <div class="">
                    <div class="card">
                      <header class="card-header">
                        <p class="card-header-title iconcalendar" @click="$router.push({name: 'Calendar'})">
                          อ.ประจำวิชา
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
                  </div>
                </div>
                <div v-else >
                  <div class="level-item has-text-centered" >
                    <div>
                    </div>
                    <div class="card">
                      <header class="card-header">
                        <p class="card-header-title iconcalendar" @click="$router.push({name: 'Calendar'})">
                          อ.ที่ปรึกษา
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

export default {
  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  }
}
</script>
<style scooped>
.layoutcalendar{
  margin-top:50px;
  margin-left: auto;
  margin-right: auto;
  width:450px;
}
.iconcalendar{
  justify-content: space-between;
  display: flex;
}
</style>
