<template>
<div class="HelloWorld">
    <div class="column"></div>
    <div class="container">
        <div class="columns is-mobile">
            <div class="column is-4 is-offset-4 hero is-light">
                <div class="column">
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <strong>Username :</strong>
                        </p>
                    </div>
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <input type="text" class="input">
                        </p>
                    </div>
                </div><br>
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <strong>Password :</strong>
                        </p>
                    </div>
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <input type="text" class="input" placeholder="********">
                        </p>
                    </div>
                </div><br>
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <strong>ประเภทผู้ใช้ :</strong>
                        </p>
                    </div>
                    <div class="level-item">
                        <p class="subtitle is-5">
                            <select name="" id="" class="input">
                                <option value="">นักศึกษา</option>
                                <option value="">อาจารย์ที่ปรึกษา</option>
                                <option value="">อาจารย์ประจำวิชา</option>
                            </select>
                        </p>
                    </div>
                </div><br>
                <div class="level-left">
                    <div class="level-item">
                        <button class="button is-primary">Login</button>
                    </div>
                    <div class="level-item">
                        <router-link to="/Register">
                            <button class="button is-primary">Register</button>
                        </router-link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
