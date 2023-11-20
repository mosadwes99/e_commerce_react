import React from 'react'
import Cookies from 'universal-cookie'
export default function Dashboard() {
  let cookie = new Cookies();
  let currentUser = cookie.get("currentUser");
  return (
    <div>{currentUser.role}</div>
  )
}
