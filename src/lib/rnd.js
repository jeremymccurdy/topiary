export default function rnd() {
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += (function alpha() {
      return String.fromCharCode(Math.random() * (122 - 48) + 48).replace(
        // eslint-disable-next-line
        /[\;\:\<\>\?\@\\\`\_\]\[\^\`\=]/,
        () => alpha()
      )
    })()
  }
  return result
}
