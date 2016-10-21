export default function (items, size) {
  let itemsCopy = items.slice()
  let newArray = []

  while (itemsCopy.length) {
    newArray.push(itemsCopy.splice(0, size))
  }
  return newArray
}
