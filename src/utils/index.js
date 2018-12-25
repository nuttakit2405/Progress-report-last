'use strict'

import db from '../database'

export const checkFITMemail = function (mail) {
  const regex = /@fitm.kmutnb.ac.th$/g
  if (regex.test(mail)) {
    const stdReg = /^(\d{13})/g
    const sidReg = /^(\d{13})@fitm.kmutnb.ac.th/g
    let userType = 'teacher'
    let sid = ''
    if (stdReg.test(mail)) {
      userType = 'student'
      const data = sidReg.exec(mail)
      sid = data[1]
    }
    return {
      isFITM: true,
      userType,
      sid
    }
  }
  return {
    isFITM: false
  }
}

export const checkStudentEmail = function (sid) {
  return new Promise((resolve) => {
    db.database.ref(`students/${sid}`).once('value', snap => {
      if (snap.val()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

export const checkTeacherEmail = function (mail) {
  return new Promise((resolve) => {
    db.database.ref('teachers').orderByChild('email').equalTo(mail).once('value', snap => {
      if (snap.val()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

export const checkHaveEmail = async function (mail) {
  let have = false
  const fitm = checkFITMemail(mail)
  if (fitm.isFITM && fitm.userType === 'student') {
    have = await checkStudentEmail(fitm.sid)
  } else {
    have = await checkTeacherEmail(mail)
  }
  console.log('checkHave', have)
  return have
}
