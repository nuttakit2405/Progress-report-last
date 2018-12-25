<template>
    <div class="container" style="padding-top: 100px;">
        <div class="columns is-centered" style="width: 100%;">
            <div class="column has-text-centered">
                <span class="title is-2">
                    ไม่มีอีเมล์นี้อยู่ในระบบ จึงไม่สามารถใช้งานได้<br>
                    กรุณาติดต่อ... หรือ เข้าสู่ระบบด้วยอีเมล์อื่น
                </span>
            </div>
        </div>
        <div class="columns" style="width: 100%;">
            <div class="column has-text-centered">
                <button class="button is-large is-primary" @click="$router.push({name: 'Login'})">กลับไปหน้า เข้าสู่ระบบ</button>
            </div>
        </div>
    </div>
</template>
